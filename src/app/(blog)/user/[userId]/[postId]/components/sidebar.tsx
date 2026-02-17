'use client';

import { GoComment, GoShareAndroid, GoBookmark, GoAlert } from 'react-icons/go';
import { PostContext } from '@/components/post/post-context-provider';
import { PropsWithChildren, ReactNode, useContext } from 'react';
import { IPost, User } from '@/types/type';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';
import Link from 'next/link';
import { cn } from '@/utils';

export default function Sidebar({ comments, path, user }: IPost & { user: User }) {
	const { isLiked, toggle, nLike, setToggle } = useContext(PostContext);
	const handleLike = () => {
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
