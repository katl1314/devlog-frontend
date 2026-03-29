'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/utils';

const tabs = (userId: string) => [
	{ label: '포스트', href: `/user/${userId}`, tab: null },
	{ label: '시리즈', href: `/user/${userId}?tab=series`, tab: 'series' },
	{ label: '소개', href: `/user/${userId}?tab=about`, tab: 'about' },
];

export default function UserProfileTabNav({ userId }: { userId: string }) {
	const searchParams = useSearchParams();
	const currentTab = searchParams.get('tab');

	return (
		<nav className="md:hidden sticky top-0 z-10 bg-background border-b border-border">
			<div className="flex">
				{tabs(userId).map(({ label, href, tab }) => {
					const isActive = tab === null ? currentTab === null : currentTab === tab;
					return (
						<Link
							key={label}
							href={href}
							className={cn(
								'flex-1 text-center py-3 text-sm font-medium transition-colors border-b-2',
								isActive
									? 'border-foreground text-foreground'
									: 'border-transparent text-muted-foreground hover:text-foreground'
							)}
						>
							{label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}