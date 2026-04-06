import { TagViewer } from '@/components/tag/tag-viewer';
import { postService } from '@/services/post.service';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PostActions from './post-actions';
import Link from 'next/link';
import { getTimeDiff } from '@/utils';

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

	return (
		<section className="mb-8">
			{/* 1. 제목 */}
			<h1 className="text-4xl font-extrabold mb-6 leading-tight break-keep text-foreground">
				{title}
			</h1>

			{/* 2. 메타 정보 (작성자, 날짜, 수정/삭제) */}
			<div className="flex justify-between items-center text-base mb-4">
				<div className="flex items-center text-muted-foreground font-medium">
					<Link href={`/@${user_id}`}>
						<Label className="text-foreground font-bold cursor-pointer hover:underline">
							{user_id}
						</Label>
					</Link>
					<Label className="mx-2 text-border">·</Label>
					<Label className="text-muted-foreground">
						{getTimeDiff(created_at)}
					</Label>
				</div>
				<div>
					{/* <Button
						variant="link"
						className="px-2 text-muted-foreground hover:text-foreground transition-colors"
					>
						통계
					</Button> */}
					<Button
						variant="link"
						className="px-2 text-muted-foreground hover:text-foreground transition-colors"
					>
						수정
					</Button>
					<Button
						variant="link"
						className="px-2 text-muted-foreground hover:text-foreground transition-colors"
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
