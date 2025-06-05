import LockBadge from '@/components/LockBadge';
import PostMeta from '@/components/PostMeta';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Post } from '@/types/type';

export default function PostHeader({ title, path, userId, created_at, auth_cd }: Post) {
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
				<div className="flex flex-row gap-3 items-center">
					<Button type="button" className="bg-white text-black">
						팔로우
					</Button>

					<Button type="button" className="bg-white text-black">
						좋아요
					</Button>
				</div>
			</div>
		</div>
	);
}
