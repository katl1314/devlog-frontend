'use client';

import { useState } from 'react';
import { MdOutlineAccessTime, MdOutlineTrendingUp } from 'react-icons/md';
import { BiBell, BiGroup, BiSearch } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import SidebarUserMenu, { SignedIn, SignedOut, SignOnUserMenu, NotSignOnUserMenu } from './sidebar-user-menu';
import SidebarNavItems from './sidebar-nav-items';
import NavbarLogo from './navbar-logo';
import SearchOverlay from './search-overlay';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SidebarNav() {
	const session = useSession();
	const pathname = usePathname();
	const user = session.data?.user;
	const [searchOpen, setSearchOpen] = useState(false);
	const navItems = [
		{
			id: 'new',
			href: '/new',
			label: '홈 피드',
			icon: <MdOutlineAccessTime size={22} />,
			match: ['/', '/new']
		},
		{
			id: 'trends',
			href: '/trends',
			label: '트렌드',
			icon: <MdOutlineTrendingUp size={22} />,
			match: ['/trends']
		},
		{
			id: 'notifications',
			href: '/notifications',
			label: '알림',
			icon: <BiBell size={22} />,
			match: ['/notifications']
		},
		{ id: 'following', href: '/following', label: '팔로잉', icon: <BiGroup size={22} />, match: ['/following'] }
	];

	const onActive = (id: string) => {
		const item = navItems.find(i => i.id === id);
		return !!item?.match.includes(pathname);
	};

	return (
		<nav className="flex flex-col h-screen sticky top-0 overflow-y-auto py-6 px-3 xl:px-5">
			<Link href="/" className="flex items-center gap-3 mb-8 px-2 xl:px-1">
				<NavbarLogo />
			</Link>

			<SidebarNavItems items={navItems} onActive={onActive} />

			<Button
				variant="ghost"
				onClick={() => setSearchOpen(true)}
				className="w-full justify-start gap-4 px-3 py-3 h-auto rounded-2xl font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 group"
			>
				<span className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
					<BiSearch size={22} className="size-5.5" />
				</span>
				<span className="hidden xl:block text-[15px]">검색</span>
			</Button>

			{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

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
