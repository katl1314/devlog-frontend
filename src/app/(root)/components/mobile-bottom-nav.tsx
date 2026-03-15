'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineAccessTime, MdOutlineTrendingUp } from 'react-icons/md';
import { IoCreateOutline } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { cn } from '@/utils';

const navItems = [
	{ href: '/new', icon: MdOutlineAccessTime, label: '홈' },
	{ href: '/trends', icon: MdOutlineTrendingUp, label: '트렌드' },
	{ href: '/write', icon: IoCreateOutline, label: '글쓰기' },
	{ href: '/user', icon: BiUser, label: '프로필' },
];

export default function MobileBottomNav() {
	const pathname = usePathname();

	return (
		<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl border-t border-border">
			<div className="flex justify-around items-center h-[56px]">
				{navItems.map(({ href, icon: Icon, label }) => {
					const isActive = pathname === href || (href !== '/write' && pathname?.startsWith(href));
					return (
						<Link
							key={href}
							href={href}
							className={cn(
								'flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs transition-colors',
								isActive
									? 'text-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							<Icon size={22} />
							<span className="text-[10px] font-medium">{label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
