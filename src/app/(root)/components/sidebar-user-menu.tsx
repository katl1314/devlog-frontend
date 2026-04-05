'use client';

import UserAvatar from '@/components/user-avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiUser, BiLogOut, BiCog } from 'react-icons/bi';
import type { Nullable } from '@/types/global';

interface SidebarUserMenuProps {
	name?: string;
	image?: string;
	id?: string;
}

export default function SidebarUserMenu(user: Nullable<SidebarUserMenuProps>) {
	return (
		<>{'id' in user ? <SignOnUserMenu {...user} /> : <NotSignOnUserMenu />}</>
	);
}

const SignOnUserMenu = ({
	image,
	id: userId,
	name
}: Nullable<SidebarUserMenuProps>) => (
	<div className="flex items-center justify-center xl:justify-start gap-3 p-2 rounded-full hover:bg-muted/50 transition-colors">
		<UserAvatar src={image} userId={userId ?? 'U'} className="w-10 h-10 shrink-0" />
		<div className="hidden xl:flex flex-col overflow-hidden flex-1 min-w-0">
			<span className="text-sm font-semibold truncate">{name}</span>
			<span className="text-xs text-muted-foreground truncate">@{userId}</span>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="hidden xl:flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors shrink-0 cursor-pointer">
					<BsThreeDotsVertical size={16} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side="top"
				align="end"
				className="cursor-pointer w-52 rounded-2xl border-border/50 shadow-xl p-2 gap-0.5"
			>
				<DropdownMenuItem asChild>
					<Link
						href={`/settings`}
						className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 text-sm"
					>
						<BiCog size={16} />
						환경설정
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href={`/@${userId}`}
						className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 text-sm"
					>
						<BiUser size={16} />
						블로그 가기
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator className="my-1" />
				<DropdownMenuItem
					className="flex items-center gap-2.5 focus:bg-destructive/10 cursor-pointer rounded-xl px-3 py-2.5 text-sm"
					onClick={() => signOut({ callbackUrl: '/' })}
				>
					<BiLogOut size={16} />
					로그아웃
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

const NotSignOnUserMenu = () => (
	<Link
		href="/auth"
		className="flex items-center justify-center gap-2 xl:py-3 xl:px-4 rounded-full text-sm mx-auto xl:mx-0 w-11 h-11 xl:w-auto xl:h-auto  border border-border  font-medium hover:bg-muted/50 transition-colors"
	>
		<BiUser size={18} />
		<span className="hidden xl:block">로그인</span>
	</Link>
);
