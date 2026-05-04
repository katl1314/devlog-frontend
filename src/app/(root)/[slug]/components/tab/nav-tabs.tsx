'use client';
import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'nav-tabs:active-href';

export type TabItem = {
	tab: string;
	text: string;
	href: string;
};

interface TabItems {
	items: TabItem[];
	icons?: { [name: string]: React.ReactNode };
	defaultPath?: string;
	onOptionChange?: (opt: string) => void;
}

export default function NavTabs({ items, icons, defaultPath }: TabItems) {
	const pathname = usePathname();
	const [fallback, setFallback] = useState<string | null>(null);

	const matchedHref = items.find(
		item => pathname === item.href || (pathname === '/' && item.href === defaultPath)
	)?.href;

	useEffect(() => {
		if (matchedHref) {
			sessionStorage.setItem(STORAGE_KEY, matchedHref);
			setFallback(matchedHref);
		} else {
			const stored = sessionStorage.getItem(STORAGE_KEY);
			setFallback(stored ?? defaultPath ?? null);
		}
	}, [matchedHref, defaultPath]);

	const activeHref = matchedHref ?? fallback;

	return (
		<>
			{items.map(item => {
				const isActive = item.href === activeHref;
				return (
					<Tab key={item.tab} {...item} isActive={isActive}>
						{icons?.[item.tab]}
					</Tab>
				);
			})}
		</>
	);
}

function Tab({
	tab,
	text,
	href,
	isActive = false
}: {
	tab: string;
	text: string;
	href: string;
	children?: React.ReactNode;
	isActive?: boolean;
}) {
	return (
		<Link
			key={tab}
			href={href}
			className={cn(
				'px-4 py-1.5 rounded-full text-sm font-semibold transition-colors',
				isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
			)}
		>
			{text}
		</Link>
	);
}
