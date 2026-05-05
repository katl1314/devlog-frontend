import NotificationTabs from './components/notification-tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '알림',
	description: '새로운 댓글, 좋아요 알림을 확인합니다.'
};

export default function NotificationsPage() {
	return (
		<>
			<div className="sticky top-0 z-10 flex items-center px-6 h-[60px] bg-background/80 backdrop-blur-xl border-b border-border/50">
				<h2 className="text-lg font-bold tracking-tight">알림</h2>
			</div>
			<NotificationTabs />
		</>
	);
}
