'use client';

import Link from 'next/link';
import { IPost, User } from '@/types/type';
import { PropsWithChildren, ReactNode, useContext } from 'react';
import { GoComment, GoShareAndroid, GoBookmark } from 'react-icons/go';
import { FaHeart } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { PostContext } from '@/components/post/PostContextProvider';

export default function SideActionBar({ comments, path, user }: IPost & { user: User }) {
	const { isLiked, toggle, nLike, setToggle, setTrigger } = useContext(PostContext);

	const handleLike = () => {
		if (user) {
			setTrigger(true);
			setToggle(!toggle, path);
			return;
		}
		alert('어허!');
	};

	const LikeButton = isLiked ? (
		<SideActionBarItem icons={<FaHeart size={24} fill="white" />} onClick={handleLike} className="bg-[#20c997]">
			{nLike}
		</SideActionBarItem>
	) : (
		<SideActionBarItem icons={<FaHeart size={24} fill="gray" />} onClick={handleLike}>
			{nLike}
		</SideActionBarItem>
	);

	return (
		<div className="hidden lg:block sticky top-[20px] text-neutral-500">
			<div className="absolute left-[-100px]">
				<div className="flex flex-col gap-3">
					{LikeButton}
					<Link href="#comments">
						<SideActionBarItem icons={<GoComment size={24} fill="gray" />}>{comments}</SideActionBarItem>
					</Link>
					<SideActionBarItem icons={<GoBookmark size={24} fill="gray" />} />
					<SideActionBarItem icons={<GoShareAndroid size={24} fill="gray" />} />
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
				className={cn('rounded-[50%] border-1 p-3 cursor-pointer group hover:opacity-60', className)}
				onClick={onClick}
			>
				{icons}
			</div>
			<div className="text-gray-600 dark:text-neutral-50">{children}</div>
		</div>
	);
};
