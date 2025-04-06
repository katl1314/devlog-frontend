'use client';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

export default function Tabs({ items, icons, defaultPath }: TabItems) {
	const pathname = usePathname();
	return (
		<>
			{items.map(item => {
				const target = pathname === '/' ? defaultPath ?? '' : pathname;
				const isActive = item.href.startsWith(target);
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
	children,
	isActive = false
}: {
	tab: string;
	text: string;
	href: string;
	children?: React.ReactNode;
	isActive?: boolean;
}) {
	return (
		<div
			key={tab}
			className={cn(
				'py-2 flex gap-2 items-center relative text-zinc-400 text-base ml-2 lg:ml-4',
				isActive &&
					"font-bold text-black before:content-[''] before:absolute before:border-1 before:w-full before:left-0 before:bottom-0"
			)}
		>
			{children}
			<Link href={href}>{text}</Link>
		</div>
	);
}
