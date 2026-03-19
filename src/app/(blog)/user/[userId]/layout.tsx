import { userService } from '@/services/user.service';
import { notFound } from 'next/navigation';
import Header from '@/app/(root)/components/header';
import MobileBottomNav from '@/app/(root)/components/mobile-bottom-nav';
import SidebarNav from '@/app/(root)/components/sidebar-nav';
import SidebarWidgets from '@/app/(root)/components/sidebar-widgets';

export default async function Layout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ userId: string }>;
}) {
	try {
		const { userId } = await params;
		const { blog } = await userService.findUserById(userId);

		return (
			<>
				{/* 모바일 전용 헤더 (md 이상에서 숨김) */}
				<Header />

				{/* 모바일 하단 탭바 (md 이상에서 숨김) */}
				<MobileBottomNav />
				<div className="flex justify-center min-h-screen pb-14 md:pb-0">
					{/* Left Sidebar - md 이상에서 표시 */}
					<aside className="hidden md:block md:w-[72px] xl:w-[260px] shrink-0 border-r border-border">
						<SidebarNav />
					</aside>

					{/* Main Feed - 최대 너비 제한으로 양옆 여백 확보 */}
					<div className="w-full max-w-[780px] border-r border-border">
						{children}
					</div>

					{/* Right Sidebar - 2xl 이상에서 표시 */}
					<aside className="hidden 2xl:block w-[320px] shrink-0">
						<SidebarWidgets />
					</aside>
				</div>
			</>
		);
	} catch {
		notFound();
	}
}
