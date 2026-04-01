import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PostActions from './post-actions';
import Link from 'next/link';
import { TagViewer } from '@/components/tag/tag-viewer';

// 작성자 본인 여부를 판단할 수 있는 props가 있다면 추가 (예: isOwner)
interface PostHeaderProps {
	title: string;
	path: string;
	user_id: string;
	tags?: any[];
	created_at: string | Date;
	user?: {
		user_id: string;
		user_name: string;
		avatar_url: string;
	};
}

export default function PostHeader({
	title,
	created_at,
	tags = [],
	user_id
}: PostHeaderProps) {
	tags = ['javascript', 'python', 'front']; // 태그 테스트

	const formatTimeAgo = (dateString: string | Date) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffMS = now.getTime() - date.getTime();
		const diffMin = Math.round(diffMS / (1000 * 60));
		const diffHour = Math.round(diffMS / (1000 * 60 * 60));
		const diffDay = Math.round(diffMS / (1000 * 60 * 60 * 24));

		if (diffMin < 1) return '방금 전';
		if (diffMin < 60) return `${diffMin}분 전`;
		if (diffHour < 24) return `${diffHour}시간 전`;
		if (diffDay < 7) return `${diffDay}일 전`;
		return date.toISOString().split('T')[0].replace(/-/g, '.');
	};

	return (
		<section className="mb-8">
			{/* 1. 제목 */}
			<h1 className="text-4xl font-extrabold mb-6 leading-tight break-keep text-gray-900">
				{title}
			</h1>

			{/* 2. 메타 정보 (작성자, 날짜, 수정/삭제) */}
			<div className="flex justify-between items-center text-base mb-4">
				<div className="flex items-center text-gray-600 font-medium">
					<Link href={`/@${user_id}`}>
						<Label className="text-gray-900 font-bold cursor-pointer hover:underline">
							{user_id}
						</Label>
					</Link>
					<Label className="mx-2 text-gray-300">·</Label>
					<Label className="text-gray-500">{formatTimeAgo(created_at)}</Label>
				</div>
				<div>
					<Button
						variant="link"
						className="px-2 text-gray-500 hover:text-gray-900 transition-colors"
					>
						통계
					</Button>
					<Button
						variant="link"
						className="px-2 text-gray-500 hover:text-gray-900 transition-colors"
					>
						수정
					</Button>
					<Button
						variant="link"
						className="px-2 text-gray-500 hover:text-gray-900 transition-colors"
					>
						삭제
					</Button>
				</div>
			</div>

			{/* 3. 태그 */}
			<TagViewer tags={tags} />

			{/* 4. 좋아요 / 댓글 / 공유 */}
			<PostActions />
		</section>
	);
}
