'use client';

import { toggleLike } from '@/actions/actions';
import { PostContext } from '@/components/Post/PostContextProvider';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function LikeButton({ path }: { path: string }) {
	const { isLiked, nLike, setIsLiked, setToggle } = useContext(PostContext);

	const handleLike = async () => {
		await toggleLike(path);
		setToggle?.('Y');
		setIsLiked?.(!isLiked);
	};

	return (
		<div className="inline-block lg:hidden">
			<span
				className={cn(
					'flex items-center gap-2 px-4 py-1 border-1 rounded-[10px] cursor-pointer hover:opacity-70',
					isLiked && 'bg-[#20c997] text-white'
				)}
				onClick={handleLike}
			>
				<FaHeart size={16} fill={isLiked ? 'white' : 'gray'} /> {nLike}
			</span>
		</div>
	);
}
