import Button from '@/components/Button';
import LockBadge from '@/components/LockBadge';
import PostMeta from '@/components/Post/PostMeta';
import { Label } from '@/components/ui/label';
import { Post } from '@/types/type';

export default async function PostHeader({ title, path, userId, created_at, auth_cd }: Post) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tag?path=${path}`);

	if (!res.ok) throw new Error('태그 정보를 가져오는중 에러가 발생하였습니다');

	const { data } = await res.json(); // 태그이름들
	console.log(data);
	return (
		<div>
			<h1 className="text-5xl font-bold mb-8">{title}</h1>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row gap-6 items-center">
					{/* 사용자 */}
					<Label className="font-bold text-lg">{userId}</Label>
					{/* 날짜 */}
					<PostMeta className="text-lg text-neutral-500" date={created_at} />
					{/* 공개/비공개 */}
					{auth_cd === 'PRIVATE' && <LockBadge />}
				</div>
				<div className="flex flex-row gap-1 items-center">
					<Button value="팔로우" variant="outline" />
				</div>
			</div>
			{/* 태그 */}
			<div></div>
		</div>
	);
}
