'use client';

import { toggleLike } from '@/actions/actions';
import { IPost } from '@/types/type';
import Link from 'next/link';
import { useState, PropsWithChildren, ReactNode } from 'react';
import { GoComment, GoShareAndroid, GoBookmark } from 'react-icons/go';
import { FaHeart } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function SideActionBar({ comments, like, path, isLike = false }: IPost) {
	const [isLiked, setIsLiked] = useState(isLike);
	const [nLike, setLike] = useState(like);

	const handleLike = async () => {
		await toggleLike(path); // 로그인한 사람만 가능!
		setIsLiked(!isLiked);
		if (isLiked) {
			setLike(nLike - 1);
		} else {
			setLike(nLike + 1);
		}
	};

	const LikeButton = isLiked ? (
		<SideActionBarItem icons={<FaHeart size={24} fill="white" />} onClick={handleLike} className="bg-green-400">
			{nLike}
		</SideActionBarItem>
	) : (
		<SideActionBarItem icons={<FaHeart size={24} fill="gray" />} onClick={handleLike}>
			{nLike}
		</SideActionBarItem>
	);

	return (
		<div className="hidden lg:block sticky top-[20px] text-neutral-500 ">
			<div className="absolute left-[-100px]">
				<div className="flex flex-col gap-3">
					{LikeButton}
					<Link href="#comments">
						<SideActionBarItem icons={<GoComment size={24} fill="black" />}>{comments}</SideActionBarItem>
					</Link>
					<SideActionBarItem icons={<GoBookmark size={24} fill="black" />} />
					<SideActionBarItem icons={<GoShareAndroid size={24} fill="black" />} />
				</div>
			</div>
		</div>
	);
}

type SideActionBarItem = PropsWithChildren<{ icons: ReactNode; onClick?: () => void; className?: string }>;

export const SideActionBarItem = ({ children, icons, className, onClick }: SideActionBarItem) => {
	return (
		<div className="flex flex-col items-center gap-1">
			<div
				className={cn(
					'rounded-[50%] border-1 p-3 cursor-pointer group bg-neutral-100  hover:bg-neutral-200',
					className
				)}
				onClick={onClick}
			>
				{icons}
			</div>
			<div>{children}</div>
		</div>
	);
};
