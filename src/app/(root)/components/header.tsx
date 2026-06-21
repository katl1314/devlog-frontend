'use client';

import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Logo from './logo';
import NavbarLogo from './navbar-logo';
import { Button } from '@/components/ui/button';
import SearchOverlay from './search-overlay';

export default function Header() {
	const [searchOpen, setSearchOpen] = useState(false);

	return (
		<header className="md:hidden border-b border-border">
			<div className="flex items-center justify-between px-4 py-[10px]">
				<h3 className="flex cursor-pointer">
					<Logo href="/">
						<NavbarLogo />
					</Logo>
				</h3>
				<Button
					variant="ghost"
					onClick={() => setSearchOpen(true)}
					aria-label="검색"
					className="p-2 h-auto rounded-full hover:bg-muted"
				>
					<BiSearch size={22} className="size-5.5" />
				</Button>
			</div>

			{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
		</header>
	);
}
