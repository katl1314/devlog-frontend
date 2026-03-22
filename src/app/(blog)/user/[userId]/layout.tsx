import MobileBottomNav from '@/app/(root)/components/mobile-bottom-nav';
import SidebarWidgets from '@/app/(root)/components/sidebar-widgets';
import UserSidebarNav from '@/app/(blog)/user/components/user-sidebar-nav';

export default async function Layout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;

	return (
		<>
			{/* 모바일 하단 탭바 (md 이상에서 숨김) */}
			<MobileBottomNav />
			<div className="flex justify-center min-h-screen pb-14 md:pb-0">
				{/* Left Sidebar - md 이상에서 표시 */}
				<aside className="hidden md:block md:w-[72px] xl:w-[260px] shrink-0 border-r border-border">
					<UserSidebarNav userId={userId} />
				</aside>

				{/* Main Feed - 최대 너비 제한으로 양옆 여백 확보 */}
				<div className="w-full max-w-[780px] border-r border-border bg-background">
					{children}
				</div>

				{/* Right Sidebar - 2xl 이상에서 표시 */}
				<aside className="hidden 2xl:block w-[320px] shrink-0">
					<SidebarWidgets />
				</aside>
			</div>
		</>
	);
}
