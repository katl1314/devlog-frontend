'use client';

import { MdOutlineAccessTime, MdOutlineTrendingUp } from 'react-icons/md';
import { BiBell, BiBookmark } from 'react-icons/bi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{ href: '/new', label: '홈 피드', icon: <MdOutlineAccessTime size={22} />, match: ['/', '/new'] },
	{ href: '/trends', label: '트렌드', icon: <MdOutlineTrendingUp size={22} />, match: ['/trends'] },
	{ href: '#', label: '알림센터', icon: <BiBell size={22} />, match: [] },
	{ href: '#', label: '보관함', icon: <BiBookmark size={22} />, match: [] },
];

export default function SidebarNavItems() {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-1 flex-1">
			{navItems.map(item => {
				const isActive = item.match.includes(pathname);
				return (
					<Link
						key={item.label}
						href={item.href}
						className={`flex items-center gap-4 px-3 py-3 rounded-2xl transition-colors font-medium group ${
							isActive
								? 'text-foreground bg-muted/50'
								: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
						}`}
					>
						<span className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
							{item.icon}
						</span>
						<span className="hidden xl:block text-[15px]">{item.label}</span>
					</Link>
				);
			})}
		</div>
	);
}
