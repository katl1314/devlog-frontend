import { MdOutlineAccessTime, MdOutlineTrendingUp } from 'react-icons/md';
import { BiBell, BiGroup } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import SidebarUserMenu, { SignedIn, SignedOut, SignOnUserMenu, NotSignOnUserMenu } from './sidebar-user-menu';
import SidebarNavItems from './sidebar-nav-items';
import NavbarLogo from './navbar-logo';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function SidebarNav() {
	const session = await auth();
	const user = session?.user;

	const navItems = [
		{
			href: '/new',
			label: '홈 피드',
			icon: <MdOutlineAccessTime size={22} />,
			match: ['/', '/new']
		},
		{
			href: '/trends',
			label: '트렌드',
			icon: <MdOutlineTrendingUp size={22} />,
			match: ['/trends']
		},
		{ href: '/notifications', label: '알림', icon: <BiBell size={22} />, match: ['/notifications'] },
		{ href: '/following', label: '팔로잉', icon: <BiGroup size={22} />, match: ['/following'] }
	];

	return (
		<nav className="flex flex-col h-screen sticky top-0 overflow-y-auto py-6 px-3 xl:px-5">
			<Link href="/" className="flex items-center gap-3 mb-8 px-2 xl:px-1">
				<NavbarLogo />
			</Link>

			<SidebarNavItems items={navItems} />

			<div className="mt-4">
				<Link
					href={user ? '/write' : '/auth'}
					className="flex items-center justify-center gap-2 xl:py-3 xl:px-4 rounded-full text-sm mx-auto xl:mx-0 w-10 h-10 xl:w-auto xl:h-auto  bg-foreground text-background font-bold hover:opacity-85 transition-opacity shadow-sm"
				>
					<IoCreateOutline size={18} />
					<span className="hidden xl:block">새 포스트 작성</span>
				</Link>
			</div>

			<div className="mt-3">
				<SidebarUserMenu isSignedIn={!!user?.id}>
					<SignedIn>
						<SignOnUserMenu image={user?.image} id={user?.id} name={user?.name} />
					</SignedIn>
					<SignedOut>
						<NotSignOnUserMenu />
					</SignedOut>
				</SidebarUserMenu>
			</div>
		</nav>
	);
}
