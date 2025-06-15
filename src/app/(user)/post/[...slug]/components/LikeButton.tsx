'use client';

import { toggleLike } from '@/actions/actions';
import { PostContext } from '@/components/Post/PostContextProvider';
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
			{isLiked ? (
				<span
					className="max-h-[36px] flex items-center gap-2 p-2 box-border bg-[#20c997] border-1 rounded-md text-white cursor-pointer hover:opacity-70"
					onClick={handleLike}
				>
					<FaHeart size={16} fill="white" /> {nLike}
				</span>
			) : (
				<span
					className="max-h-[36px] flex items-center gap-2 p-2 box-border border-1 rounded-md cursor-pointer hover:opacity-70"
					onClick={handleLike}
				>
					<FaHeart size={16} fill="gray" /> {nLike}
				</span>
			)}
		</div>
	);
}
