'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavigationItem {
	href: string;
	label: string;
	icon: React.ReactNode;
	match: string[];
}

export default function SidebarNavItems({
	items
}: {
	items: NavigationItem[];
}) {
	const pathname = usePathname();

	return (
		<div className="flex flex-col gap-1 flex-1">
			{items.map(item => {
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
