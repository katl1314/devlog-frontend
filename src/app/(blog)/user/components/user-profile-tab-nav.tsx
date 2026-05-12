'use client';

import { useSearchParams } from 'next/navigation';
import NavTabs from '@/components/ui/nav-tabs';

const getTabs = (userId: string) => [
	{ label: '포스트', href: `/@${userId}`, tab: null },
	{ label: '시리즈', href: `/@${userId}?tab=series`, tab: 'series' },
	{ label: '소개', href: `/@${userId}?tab=about`, tab: 'about' }
];

export default function UserProfileTabNav({ userId }: { userId: string }) {
	const searchParams = useSearchParams();
	const currentTab = searchParams.get('tab');

	return (
		<nav className="md:hidden sticky top-0 z-10 bg-background border-b border-border">
			<NavTabs type="line">
				<NavTabs.List className="border-none">
					{getTabs(userId).map(({ label, href, tab }) => (
						<NavTabs.Item
							key={label}
							href={href}
							active={tab === null ? currentTab === null : currentTab === tab}
							className="flex-1 text-center py-3"
						>
							{label}
						</NavTabs.Item>
					))}
				</NavTabs.List>
			</NavTabs>
		</nav>
	);
}
