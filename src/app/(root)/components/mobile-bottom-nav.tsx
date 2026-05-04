'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineAccessTime } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { BiUser, BiLogOut, BiCog, BiGroup, BiBell } from 'react-icons/bi';
import { cn } from '@/utils';
import { useSession, signOut } from 'next-auth/react';
import UserAvatar from '@/components/user-avatar';
import BottomSheetDialog from '@/components/bottom-sheet-dialog';

const navItems = [
	{
		id: 'home',
		href: '/new',
		icon: MdOutlineAccessTime,
		label: '홈',
		match: ['/', '/new']
	},
	{
		id: 'notifications',
		href: '#',
		icon: BiBell,
		label: '알림',
		match: []
	},
	{
		id: 'following',
		href: '/following',
		icon: BiGroup,
		label: '팔로잉',
		match: ['/following']
	},
	{
		id: 'write',
		href: '/write',
		icon: IoCreateOutline,
		label: '글쓰기',
		match: []
	}
];

export default function MobileBottomNav() {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const user = session?.user;
	const userId = user?.id ?? ('U' as string);

	return (
		<BottomSheetDialog>
			<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl border-t border-border">
				<div className="flex justify-around items-center h-14">
					{/* 메뉴 */}
					{navItems.map(({ href, icon: Icon, label, id, match }) => {
						const isActive = match.includes(pathname);
						return (
							<Link
								key={id}
								href={href}
								className={cn(
									'flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs transition-colors',
									isActive
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'
								)}
							>
								<Icon size={26} />
								<span className="text-[10px] font-medium">{label}</span>
							</Link>
						);
					})}

					{/* 프로필 탭 */}
					{user ? (
						<BottomSheetDialog.Trigger
							mode="longPress"
							onShortPress={() => router.push(`/@${userId}`)}
						>
							<button className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs text-muted-foreground cursor-pointer select-none">
								<UserAvatar
									src={user.image}
									userId={userId}
									className="w-7.5 h-7.5"
								/>
							</button>
						</BottomSheetDialog.Trigger>
					) : (
						<Link
							href={`/auth?callbackUrl=${encodeURIComponent(pathname)}`}
							className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs text-muted-foreground hover:text-foreground transition-colors"
						>
							<BiUser size={26} />
							<span className="text-[10px] font-medium">프로필</span>
						</Link>
					)}
				</div>
			</nav>

			<BottomSheetDialog.BackDrop />
			<BottomSheetDialog.Items
				onItemClick={id => {
					if (id === 'blog') router.push(`/@${userId}`);
					if (id === 'settings') router.push('/settings');
					if (id === 'logout') signOut({ callbackUrl: window.location.origin });
				}}
			>
				<BottomSheetDialog.Caption className="flex items-center gap-3 px-6 py-4 border-b border-border">
					<UserAvatar
						src={user?.image}
						userId={userId}
						className="w-10 h-10 shrink-0"
					/>
					<div className="flex flex-col min-w-0">
						<span className="text-sm font-semibold truncate">{user?.name}</span>
						<span className="text-xs text-muted-foreground truncate">
							@{userId}
						</span>
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
					<BottomSheetDialog.Item
						id="logout"
						icon={<BiLogOut size={20} />}
						variant="destructive"
					>
						로그아웃
					</BottomSheetDialog.Item>
				</div>
			</BottomSheetDialog.Items>
		</BottomSheetDialog>
	);
}
