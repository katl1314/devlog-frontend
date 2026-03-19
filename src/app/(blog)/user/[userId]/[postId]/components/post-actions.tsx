'use client';

import { PostContext } from '@/components/post/post-context-provider';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';

export default function PostActions() {
	const { isLiked, likeCount, commentCount, toggleLike } = useContext(PostContext);

	const handleCommentClick = () => {
		document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="flex items-center gap-2 mt-6 pt-6 border-t border-border">
			{/* 좋아요 */}
			<Button
				variant="outline"
				size="sm"
				onClick={toggleLike}
				className={cn(
					"flex items-center gap-1.5 rounded-full text-sm text-muted-foreground",
					isLiked && "border-red-300 text-red-500"
				)}
			>
				<HeartIcon filled={isLiked} />
				<span>{likeCount}</span>
			</Button>

			{/* 댓글 */}
			<Button
				variant="outline"
				size="sm"
				onClick={handleCommentClick}
				className="flex items-center gap-1.5 rounded-full text-sm text-muted-foreground"
			>
				<CommentIcon />
				<span>{commentCount}</span>
			</Button>

			{/* 공유 */}
			<Button
				variant="outline"
				size="sm"
				onClick={() => navigator.clipboard?.writeText(window.location.href)}
				className="flex items-center gap-1.5 rounded-full text-sm text-muted-foreground ml-auto"
			>
				<ShareIcon />
				<span>공유</span>
			</Button>
		</div>
	);
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
		<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
	</svg>
);

const CommentIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
	</svg>
);

const ShareIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
		<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
	</svg>
);
