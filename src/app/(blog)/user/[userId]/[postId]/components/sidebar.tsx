'use client';

import { PostContext } from '@/components/post/post-context-provider';
import { useContext } from 'react';
import { cn } from '@/utils';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
	const { isLiked, likeCount, commentCount, toggleLike } = useContext(PostContext);

	const handleCommentClick = () => {
		// 특정 요소로 스크롤 이동한다.
		document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
	}

	const handleLikeIconClick = async () => {
		await toggleLike();
	}

	return (
		<aside className={cn(
			"backdrop-blur-sm xl:backdrop-blur-none fixed bottom-0 left-0 z-50 w-full py-1 flex justify-center",
			"xl:w-16 xl:absolute xl:-left-24 xl:bottom-auto xl:block xl:h-full",
		)}>
			<div className={cn(
				"flex flex-row gap-10 items-start justify-center ",
				"xl:p-2 xl:sticky xl:top-40 xl:flex-col xl:gap-6 xl:w-full",
			)}>
				<ActionItem
					icon={<HeartIcon filled={isLiked} />} // 아이콘 상태 예시
					count={likeCount}
					label="좋아요"
					onClick={handleLikeIconClick}
					active={isLiked} // 활성화 상태 전달
				/>
				<ActionItem
					icon={<CommentIcon />}
					count={commentCount}
					label="댓글"
					onClick={handleCommentClick}
				/>
				<ActionItem icon={<ShareIcon />} label="공유하기" onClick={() => {}} />
			</div>
		</aside>
	);
}

function ActionItem({ icon, count, onClick, label, active }: any) {
	return (
		<div className="flex flex-col items-center group relative">
			<Button
				onClick={onClick}
				aria-label={label}
				variant={'outline'}
				className={cn(
					"flex justify-center items-center transition-all rounded-full text-gray-500",

					// 모바일 크기
					"w-10 h-10",

					// PC 스타일 (hover 효과 포함)
					"xl:w-12 xl:h-12 xl:bg-white xl:border xl:border-gray-300",
					"xl:hover:border-gray-800 xl:hover:text-gray-900 xl:hover:-translate-y-0.5 xl:hover:shadow-md",

					// 활성화 상태 (좋아요 눌렀을 때 등)
					active && "text-red-500 xl:text-red-500 xl:border-red-200"
				)}
			>
				{icon}
			</Button>
			<span className="text-xs font-bold text-gray-500 mt-1">
				{count || 0}
			</span>
		</div>
	);
}

// 아이콘
const HeartIcon = ({ filled }: { filled: boolean; }) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "red" : "currentColor"}>
		<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
	</svg>
);

const CommentIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
	</svg>
);

const ShareIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
		<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
	</svg>
);