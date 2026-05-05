'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useContext, ReactNode } from 'react';
import { cn } from '@/utils';

type NavTabsType = 'segment' | 'line';

type NavTabsContextValue = {
	type: NavTabsType;
};

const NavTabsContext = createContext<NavTabsContextValue | null>(null);

function useNavTabs() {
	const ctx = useContext(NavTabsContext);
	if (!ctx) throw new Error('NavTabs 컴포넌트 내부에서만 사용할 수 있습니다.');
	return ctx;
}

type NavTabsProps = {
	type: NavTabsType;
	children: ReactNode;
	className?: string;
};

function NavTabs({ type, children, className }: NavTabsProps) {
	return (
		<NavTabsContext.Provider value={{ type }}>
			<div className={className}>{children}</div>
		</NavTabsContext.Provider>
	);
}

function NavTabsList({ children, className }: { children: ReactNode; className?: string }) {
	const { type } = useNavTabs();
	return (
		<div className={cn('flex', type === 'line' && 'border-b border-border', className)}>
			{children}
		</div>
	);
}

type NavTabsItemProps = {
	href: string;
	match?: string[];
	active?: boolean;
	children: ReactNode;
	className?: string;
};

function NavTabsItem({ href, match, active, children, className }: NavTabsItemProps) {
	const { type } = useNavTabs();
	const pathname = usePathname();
	const hrefPath = href.split('?')[0];
	const isActive = active ?? (match ? match.includes(pathname) : pathname === hrefPath);

	return (
		<Link
			href={href}
			className={cn(
				'transition-colors',
				type === 'line' && [
					'px-3 py-3.5 text-sm font-semibold border-b-2',
					isActive
						? 'border-foreground text-foreground'
						: 'border-transparent text-muted-foreground hover:text-foreground'
				],
				type === 'segment' && [
					'px-4 py-1.5 text-sm font-semibold rounded-full',
					isActive
						? 'bg-foreground text-background'
						: 'text-muted-foreground hover:text-foreground'
				],
				className
			)}
		>
			{children}
		</Link>
	);
}

NavTabs.List = NavTabsList;
NavTabs.Item = NavTabsItem;

export { useNavTabs };
export default NavTabs;
