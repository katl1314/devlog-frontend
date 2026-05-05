'use client';

import { BiBell } from 'react-icons/bi';
import Tabs from '@/components/ui/tabs';

const TABS = ['전체', '댓글', '팔로우'] as const;

export default function NotificationTabs() {
	return (
		<Tabs defaultValue="전체" type="line">
			<Tabs.List className="px-6">
				{TABS.map(tab => (
					<Tabs.Item key={tab} value={tab}>
						{tab}
					</Tabs.Item>
				))}
			</Tabs.List>

			<Tabs.Panels>
				{TABS.map(tab => (
					<Tabs.Panel key={tab} value={tab}>
						<div className="flex flex-col items-center justify-center py-24 text-center px-6">
							<div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
								<BiBell size={28} className="text-muted-foreground" />
							</div>
							<p className="text-base font-semibold text-foreground">새로운 알림이 없습니다</p>
							<p className="mt-1.5 text-sm text-muted-foreground">
								댓글, 좋아요 등 새로운 소식이 여기 표시됩니다
							</p>
						</div>
					</Tabs.Panel>
				))}
			</Tabs.Panels>
		</Tabs>
	);
}
