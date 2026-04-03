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
				<NavbarLogo />
			</Link>

			{/* Nav items */}
			<SidebarNavItems />

			{/* 새 포스트 작성 버튼 */}
			<div className="mt-4">
				<Link
					href={user ? '/write' : '/auth'}
					className="flex items-center justify-center gap-2 xl:py-3 xl:px-4 rounded-full text-sm mx-auto xl:mx-0 w-11 h-11 xl:w-auto xl:h-auto  bg-foreground text-background font-bold hover:opacity-85 transition-opacity shadow-sm"
				>
					<IoCreateOutline size={18} />
					<span className="hidden xl:block">새 포스트 작성</span>
				</Link>
			</div>
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
						className="flex items-center justify-center gap-2 xl:py-3 xl:px-4 rounded-full text-sm mx-auto xl:mx-0 w-11 h-11 xl:w-auto xl:h-auto  border border-border  font-medium hover:bg-muted/50 transition-colors"
					>
						<BiUser size={18} />
						<span className="hidden xl:block">로그인</span>
					</Link>
				)}
			</div>
		</nav>
	);
}
