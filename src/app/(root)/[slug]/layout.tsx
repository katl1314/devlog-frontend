import NavTabs, { TabItem } from './components/tab/nav-tabs';
import PublicationCards from '@/app/(root)/components/publication-cards';

export default async function Layout({
	children
}: {
	children: React.ReactNode;
}) {
	const data: TabItem[] = [
		{ href: '/new', tab: 'new', text: '최신' },
		{ href: '/trends', tab: 'trends', text: '트렌드' }
	];

	return (
		<>
			<div className="sticky top-0 z-10 flex items-center justify-between px-6 h-[60px] bg-background/80 backdrop-blur-xl border-b border-border/50">
				<h2 className="text-lg font-bold tracking-tight">홈 피드</h2>
				<div className="flex gap-1">
					<NavTabs items={data as TabItem[]} defaultPath="/new" />
				</div>
			</div>

			{/* <PublicationCards /> */}

			{/* 포스트 스트림 */}
			<div>{children}</div>
		</>
	);
}
