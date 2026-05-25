'use client';

import { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import Logo from './logo';
import NavbarLogo from './navbar-logo';
import { Button } from '@/components/ui/button';

export default function Header() {
	const [searchOpen, setSearchOpen] = useState(false);
	const [query, setQuery] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (searchOpen) inputRef.current?.focus();
	}, [searchOpen]);

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
					onClick={() => setSearchOpen(v => !v)}
					aria-label="검색"
					className="p-2 h-auto rounded-full hover:bg-muted"
				>
					{searchOpen ? <IoClose size={22} className="size-5.5" /> : <BiSearch size={22} className="size-5.5" />}
				</Button>
			</div>

			{searchOpen && (
				<div className="px-4 pb-3">
					<div
						className={`flex items-center gap-3 bg-muted rounded-full px-4 py-3 border transition-all ${
							query
								? 'border-blue-500 ring-2 ring-blue-500/10 bg-card'
								: 'border-transparent'
						}`}
					>
						<BiSearch size={18} className="text-muted-foreground shrink-0" />
						<input
							ref={inputRef}
							type="text"
							value={query}
							onChange={e => setQuery(e.target.value)}
							placeholder="인사이트, 에디터 검색..."
							className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
						/>
					</div>
				</div>
			)}
		</header>
	);
}
