import { BiUser } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import NavbarLogo from './navbar-logo';
import { auth } from '@/auth';
import Link from 'next/link';
import SidebarUserMenu from './sidebar-user-menu';
import SidebarNavItems from './sidebar-nav-items';

export default async function SidebarNav() {
	const session = await auth();
	const user = session?.user;

	return (
		<nav className="flex flex-col h-screen sticky top-0 overflow-y-auto py-6 px-3 xl:px-5">
			{/* Logo */}
			<Link href="/" className="flex items-center gap-3 mb-8 px-2 xl:px-1">
				{/* 아이콘만 보이는 좁은 사이드바 */}
				<svg
					className="xl:hidden shrink-0"
					width="36"
					height="36"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient
							id="nav-icon-grad"
							x1="0"
							y1="0"
							x2="1"
							y2="1"
							gradientUnits="objectBoundingBox"
						>
							<stop offset="0%" stopColor="#3b82f6" />
							<stop offset="100%" stopColor="#8b5cf6" />
						</linearGradient>
					</defs>
					<rect width="32" height="32" rx="8" fill="url(#nav-icon-grad)" />
					<path d="M19 3L10 17L16 17L12 29L22 15L16 15Z" fill="white" />
				</svg>
				{/* 넓은 사이드바에서 전체 로고 */}
				<div className="hidden xl:block">
					<NavbarLogo />
				</div>
			</Link>

			{/* Nav items */}
			<SidebarNavItems />

			{/* 새 포스트 작성 버튼 */}
			<Link
				href={user ? '/write' : '/auth'}
				className="mt-4 mx-auto xl:mx-0 flex items-center justify-center gap-2 p-3 xl:py-3 xl:px-4 w-10 h-10 xl:w-auto xl:h-auto rounded-full bg-foreground text-background text-sm font-bold hover:opacity-85 transition-opacity shadow-sm"
			>
				<IoCreateOutline size={18} />
				<span className="hidden xl:block">새 포스트 작성</span>
			</Link>

			{/* 유저 프로필 */}
			<div className="mt-3">
				{user ? (
					<SidebarUserMenu
						name={user.name ?? ''}
						image={user.image ?? ''}
						userId={user.id ?? ''}
					/>
				) : (
					<Link
						href="/auth"
						className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-border text-sm font-medium hover:bg-muted/50 transition-colors"
					>
						<BiUser size={20} />
						<span className="hidden xl:block">로그인</span>
					</Link>
				)}
			</div>
		</nav>
	);
}
