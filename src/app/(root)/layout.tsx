import PageLayout from '@/components/layout/page-layout';
import Header from '@/app/(root)/components/header';
import SidebarNav from '@/app/(root)/components/sidebar-nav';
import SidebarWidgets from '@/app/(root)/components/sidebar-widgets';
import MobileBottomNav from '@/app/(root)/components/mobile-bottom-nav';

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<PageLayout>
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
				<div className="w-full max-w-[680px] border-r border-border">
					{children}
				</div>

				{/* Right Sidebar - 2xl 이상에서 표시 */}
				<aside className="hidden 2xl:block w-[320px] shrink-0">
					<SidebarWidgets />
				</aside>
			</div>
		</PageLayout>
	);
}
