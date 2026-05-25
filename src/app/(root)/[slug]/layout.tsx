'use client';

import { ReactNode } from 'react';
import NavTabs from '@/components/ui/nav-tabs';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<div className="sticky top-0 z-10 flex items-center justify-end px-6 h-15 bg-background/80 backdrop-blur-xl border-b border-border/50">
				<div className="flex gap-1">
					<NavTabs type="segment">
						<NavTabs.List>
							<NavTabs.Item href="/new" match={['/', '/new']}>
								최신
							</NavTabs.Item>
							<NavTabs.Item href="/trends">트렌드</NavTabs.Item>
						</NavTabs.List>
					</NavTabs>
				</div>
			</div>

			<div>{children}</div>
		</>
	);
}
