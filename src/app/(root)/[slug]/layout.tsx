import Tabs, { TabItem } from './components/tab/tabs';
// import PublicationCards from '@/app/(root)/components/publication-cards';

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
			{/* 피드 헤더 - 글래스모피즘 sticky */}
			<div className="sticky top-0 z-10 flex items-center justify-between px-6 h-[60px] bg-background/80 backdrop-blur-xl border-b border-border/50">
				<h2 className="text-lg font-bold tracking-tight">홈 피드</h2>
				<div className="flex gap-1">
					<Tabs items={data as TabItem[]} defaultPath="/new" />
				</div>
			</div>

			{/* 추천 뉴스레터 카드 (현재 미사용) */}
			{/* <PublicationCards /> */}

			{/* 오늘의 아티클 섹션 라벨 */}
			<div className="px-6 py-3 border-b border-border">
				<span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
					오늘의 아티클
				</span>
			</div>

			{/* 포스트 스트림 */}
			<div>{children}</div>
		</>
	);
}
