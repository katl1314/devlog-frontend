'use client';

import { PostContext } from '@/components/post/PostContextProvider';
import { cn } from '@/utils';
import { User } from '@/types/type';
import { useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';
import { toast } from 'sonner';

export default function LikeButton({ path, user }: { path: string; user: User | null }) {
	const { isLiked, nLike, toggle, setToggle } = useContext(PostContext);

	const handleLike = async () => {
		if (user) {
			setToggle(!toggle, path);
			return;
		}
		toast('로그인 이용자만이 이용가능합니다.', {
			position: 'top-right',
			duration: 2000,
			icon: <GoAlert />
		});
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
