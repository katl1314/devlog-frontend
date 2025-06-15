import Button from '@/components/Button';
import LockBadge from '@/components/LockBadge';
import PostMeta from '@/components/Post/PostMeta';
import TagView from '@/components/TagView';
import { Label } from '@/components/ui/label';
import { IPost } from '@/types/type';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

export default async function PostHeader({ title, path, userId, created_at, auth_cd, isLike, like }: IPost) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tag?path=${path}`);

	if (!res.ok) throw new Error('태그 정보를 가져오는중 에러가 발생하였습니다');

	const { data } = await res.json(); // 태그이름들
	const tags = (data as { name: string }[]).map(({ name }) => name);

	const LikeButton = isLike ? (
		<span className="bg-[#20c997] flex items-center gap-2">
			<FaHeart size={16} fill="white" /> {like}
		</span>
	) : (
		<span className="flex items-center gap-2">
			<FaHeart size={16} fill="gray" /> {like}
		</span>
	);

	return (
		<div className="mb-4">
			<div className="text-5xl font-bold mb-4">{title}</div>
			<div className="flex flex-row justify-between items-center mb-4">
				<div className="flex flex-row gap-3 items-center">
					{/* 사용자 */}
					<Link href={`/@${userId}`}>
						<Label className="font-bold text-sm lg:text-base cursor-pointer hover:underline">{userId}</Label>
					</Link>
					{/* 날짜 */}
					<PostMeta className="text-neutral-500 text-sm lg:text-base" date={created_at} />
					{/* 공개/비공개 */}
					{auth_cd === 'PRIVATE' && <LockBadge />}
				</div>
				<div className="flex flex-row gap-1 items-center">
					<Button value="팔로우" variant="outline" />
					<div className="inline-block lg:hidden">{LikeButton}</div>
				</div>
			</div>
			{/* 태그 */}
			<div className="mb-4">
				<TagView tags={tags} />
			</div>
		</div>
	);
}
