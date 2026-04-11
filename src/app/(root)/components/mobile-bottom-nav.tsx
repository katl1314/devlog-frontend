'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineAccessTime, MdOutlineTrendingUp } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { BiUser, BiLogOut, BiCog } from 'react-icons/bi';
import { cn } from '@/utils';
import { useSession, signOut } from 'next-auth/react';
import UserAvatar from '@/components/user-avatar';
import { BiBookmark } from 'react-icons/bi';
import { useRef, useState } from 'react';

const navItems = [
	{
		id: 'home',
		href: '/new',
		icon: MdOutlineAccessTime,
		label: '홈',
		match: ['/', '/new']
	},
	{
		id: 'trend',
		href: '/trends',
		icon: MdOutlineTrendingUp,
		label: '트랜드',
		match: ['/trends']
	},
	{
		id: 'subscribe',
		href: '/subscribe',
		icon: BiBookmark,
		label: '보관함',
		match: []
	},
	{
		id: 'write',
		href: '/write',
		icon: IoCreateOutline,
		label: '글쓰기',
		match: []
	}
];

const LONG_PRESS_MS = 500;

export default function MobileBottomNav() {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session } = useSession();
	const user = session?.user;
	const userId = user?.id ?? ('U' as string);

	const [menuOpen, setMenuOpen] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const longPressedRef = useRef(false);

	const handlePressStart = () => {
		longPressedRef.current = false;
		timerRef.current = setTimeout(() => {
			longPressedRef.current = true;
			setMenuOpen(true);
		}, LONG_PRESS_MS);
	};

	const handlePressEnd = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		if (!longPressedRef.current) {
			router.push(`/@${userId}`);
		}
	};

	const handlePressCancel = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
	};

	return (
		<>
			<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl border-t border-border">
				<div className="flex justify-around items-center h-14">
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
						<button
							className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs text-muted-foreground cursor-pointer select-none"
							onTouchStart={handlePressStart}
							onTouchEnd={handlePressEnd}
							onTouchCancel={handlePressCancel}
							onMouseDown={handlePressStart}
							onMouseUp={handlePressEnd}
							onMouseLeave={handlePressCancel}
						>
							<UserAvatar src={user.image} userId={userId} className="w-7.5 h-7.5" />
						</button>
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

			{/* 바텀 시트 backdrop */}
			{menuOpen && (
				<div
					className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
					onClick={() => setMenuOpen(false)}
				/>
			)}

			{/* 바텀 시트 */}
			<div
				className={cn(
					'md:hidden fixed bottom-0 left-0 w-full z-50 bg-background rounded-t-3xl shadow-2xl transition-transform duration-300',
					menuOpen ? 'translate-y-0' : 'translate-y-full'
				)}
			>
				{/* 핸들 */}
				<div className="flex justify-center pt-3 pb-1">
					<div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
				</div>

				{/* 유저 정보 */}
				<div className="flex items-center gap-3 px-6 py-4 border-b border-border">
					<UserAvatar src={user?.image} userId={userId} className="w-10 h-10 shrink-0" />
					<div className="flex flex-col min-w-0">
						<span className="text-sm font-semibold truncate">{user?.name}</span>
						<span className="text-xs text-muted-foreground truncate">@{userId}</span>
					</div>
				</div>

				{/* 메뉴 항목 */}
				<div className="flex flex-col px-3 py-2">
					<button
						className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium hover:bg-muted transition-colors cursor-pointer text-left"
						onClick={() => { setMenuOpen(false); router.push(`/@${userId}`); }}
					>
						<BiUser size={20} />
						블로그 가기
					</button>
					<button
						className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium hover:bg-muted transition-colors cursor-pointer text-left"
						onClick={() => { setMenuOpen(false); router.push('/settings'); }}
					>
						<BiCog size={20} />
						환경설정
					</button>
				</div>

				<div className="mx-3 border-t border-border" />

				<div className="flex flex-col px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+56px)]">
					<button
						className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer text-left"
						onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }); }}
					>
						<BiLogOut size={20} />
						로그아웃
					</button>
				</div>
			</div>
		</>
	);
}
