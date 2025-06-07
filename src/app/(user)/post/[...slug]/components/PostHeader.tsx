import Button from '@/components/Button';
import LockBadge from '@/components/LockBadge';
import PostMeta from '@/components/Post/PostMeta';
import TagView from '@/components/TagView';
import { Label } from '@/components/ui/label';
import { Post } from '@/types/type';
import Link from 'next/link';

export default async function PostHeader({ title, path, userId, created_at, auth_cd }: Post) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tag?path=${path}`);

	if (!res.ok) throw new Error('태그 정보를 가져오는중 에러가 발생하였습니다');

	const { data } = await res.json(); // 태그이름들
	const tags = (data as { name: string }[]).map(({ name }) => name);

	return (
		<div className="mb-6">
			<div className="text-5xl font-bold mb-4">{title}</div>
			<div className="flex flex-row justify-between items-center mb-4">
				<div className="flex flex-row gap-6 items-center">
					{/* 사용자 */}
					<Link href={`/@${userId}`}>
						<Label className="font-bold text-lg cursor-pointer hover:underline">{userId}</Label>
					</Link>
					{/* 날짜 */}
					<PostMeta className="text-neutral-500 text-lg" date={created_at} />
					{/* 공개/비공개 */}
					{auth_cd === 'PRIVATE' && <LockBadge />}
				</div>
				<div className="flex flex-row gap-1 items-center">
					<Button value="팔로우" variant="outline" />
				</div>
			</div>
			{/* 태그 */}
			<div className="mb-4">
				<TagView tags={tags} />
			</div>
		</div>
	);
}
