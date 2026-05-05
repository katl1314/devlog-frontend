'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
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
import { useRouter } from 'next/navigation';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiUser, BiLogOut, BiCog } from 'react-icons/bi';
import BottomSheetDialog from '@/components/bottom-sheet-dialog';

interface UserMenuProps {
	image?: string | null;
	id?: string | null;
	name?: string | null;
	onAction: (_: string) => void;
}
interface SidebarUserMenuContextValue {
	isSignedIn: boolean;
}

const SidebarUserMenuContext = createContext<SidebarUserMenuContextValue>({
	isSignedIn: false
});

interface SidebarUserMenuProps {
	isSignedIn: boolean;
	children: ReactNode;
}

const SidebarUserMenu = ({ isSignedIn, children }: SidebarUserMenuProps) => {
	return <SidebarUserMenuContext.Provider value={{ isSignedIn }}>{children}</SidebarUserMenuContext.Provider>;
};

const TabletMenu = ({ image, id: userId, name, onAction }: UserMenuProps) => {
	const router = useRouter();
	return (
		<BottomSheetDialog>
			<BottomSheetDialog.Trigger mode="longPress" onShortPress={() => router.push(`/@${userId}`)}>
				<div className="xl:hidden flex items-center justify-center p-2 rounded-full hover:bg-muted/50 transition-colors cursor-pointer select-none">
					<UserAvatar src={image ?? undefined} userId={userId ?? 'U'} className="w-10 h-10 shrink-0" />
				</div>
			</BottomSheetDialog.Trigger>
			<BottomSheetDialog.BackDrop />
			<BottomSheetDialog.Items onItemClick={onAction}>
				<BottomSheetDialog.Caption className="flex items-center gap-3 px-6 py-4 border-b border-border">
					<div className="flex flex-col min-w-0">
						<span className="text-sm font-semibold truncate">{name}</span>
						<span className="text-xs text-muted-foreground truncate">@{userId}</span>
					</div>
				</BottomSheetDialog.Caption>
				<div className="flex flex-col px-3 py-2">
					<BottomSheetDialog.Item id="blog" icon={<BiUser size={20} />}>
						블로그 가기
					</BottomSheetDialog.Item>
					<BottomSheetDialog.Item id="settings" icon={<BiCog size={20} />}>
						환경설정
					</BottomSheetDialog.Item>
				</div>
				<BottomSheetDialog.Separator />
				<div className="flex flex-col px-3 py-2">
					<BottomSheetDialog.Item id="logout" icon={<BiLogOut size={20} />} variant="destructive">
						로그아웃
					</BottomSheetDialog.Item>
				</div>
			</BottomSheetDialog.Items>
		</BottomSheetDialog>
	);
};

const DesktopMenu = ({ image, id: userId, name, onAction }: UserMenuProps) => {
	return (
		<div className="hidden xl:flex items-center justify-start gap-3 p-2 rounded-full hover:bg-muted/50 transition-colors">
			<UserAvatar src={image ?? undefined} userId={userId ?? 'U'} className="w-10 h-10 shrink-0" />
			<div className="flex flex-col overflow-hidden flex-1 min-w-0">
				<span className="text-sm font-semibold truncate">{name}</span>
				<span className="text-xs text-muted-foreground truncate">@{userId}</span>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors shrink-0 cursor-pointer">
						<BsThreeDotsVertical size={16} />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side="top"
					align="end"
					className="cursor-pointer w-52 rounded-2xl border-border/50 shadow-xl p-2 gap-0.5"
				>
					<DropdownMenuItem asChild>
						<Link href="/settings" className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 text-sm">
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
						onClick={() => onAction('logout')}
					>
						<BiLogOut size={16} />
						로그아웃
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export const SignedIn = ({ children }: { children: ReactNode }) => {
	const { isSignedIn } = useContext(SidebarUserMenuContext);
	if (!isSignedIn) return null;
	return <>{children}</>;
};

export const SignedOut = ({ children }: { children: ReactNode }) => {
	const { isSignedIn } = useContext(SidebarUserMenuContext);
	if (isSignedIn) return null;
	return <>{children}</>;
};

export const SignOnUserMenu = (user: Omit<UserMenuProps, 'onAction'>) => {
	const router = useRouter();

	const handleAction = (id: string) => {
		if (id === 'blog') router.push(`/@${user.id}`);
		if (id === 'settings') router.push('/settings');
		if (id === 'logout') signOut({ callbackUrl: window.location.origin });
	};

	return (
		<>
			<TabletMenu {...user} onAction={handleAction} />
			<DesktopMenu {...user} onAction={handleAction} />
		</>
	);
};

export const NotSignOnUserMenu = () => {
	return (
		<Link
			href="/auth"
			className="flex items-center justify-center gap-2 xl:py-3 xl:px-4 rounded-full text-sm mx-auto xl:mx-0 w-11 h-11 xl:w-auto xl:h-auto border border-border font-medium hover:bg-muted/50 transition-colors"
		>
			<BiUser size={18} />
			<span className="hidden xl:block">로그인</span>
		</Link>
	);
};

SidebarUserMenu.SignedIn = SignedIn;
SidebarUserMenu.SignedOut = SignedOut;

export default SidebarUserMenu;
