const publications = [
	{
		initials: 'DK',
		gradient: 'from-indigo-500 to-purple-600',
		name: 'DevKor Tech',
		author: 'by 김테크',
		desc: '프론트엔드 개발과 UI 트렌드를 깊이 있게 다룹니다',
		count: '12.4K 구독자',
	},
	{
		initials: 'JS',
		gradient: 'from-pink-500 to-rose-500',
		name: 'Jessica Studio',
		author: 'by Jessica Park',
		desc: '커리어와 성장에 관한 인사이트를 매주 공유합니다',
		count: '8.9K 구독자',
	},
	{
		initials: 'IT',
		gradient: 'from-sky-400 to-cyan-400',
		name: 'IT 인사이더',
		author: 'by 박인사이더',
		desc: '글로벌 IT 트렌드와 스타트업 소식을 빠르게 전달합니다',
		count: '23.1K 구독자',
	},
	{
		initials: 'PD',
		gradient: 'from-emerald-400 to-teal-400',
		name: '프로덕트 다이어리',
		author: 'by 이프로덕트',
		desc: 'PM과 디자이너를 위한 실전 프로덕트 인사이트',
		count: '5.2K 구독자',
	},
	{
		initials: 'AI',
		gradient: 'from-amber-400 to-orange-500',
		name: 'AI 위클리',
		author: 'by 최에이아이',
		desc: '매주 최신 AI 논문과 실전 활용법을 정리합니다',
		count: '31.7K 구독자',
	},
];

export default function PublicationCards() {
	return (
		<section className="px-6 py-5 border-b border-border">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-sm font-bold text-foreground">추천 뉴스레터</h3>
				<button className="text-xs font-medium text-blue-500 hover:underline">더보기</button>
			</div>
			<div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
				{publications.map(pub => (
					<div
						key={pub.name}
						className="w-[190px] flex-shrink-0 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
					>
						{/* 그라디언트 커버 */}
						<div
							className={`h-[72px] bg-gradient-to-br ${pub.gradient} flex items-center justify-center`}
						>
							<span className="text-2xl font-extrabold text-white/90 font-sans tracking-tight">
								{pub.initials}
							</span>
						</div>
						{/* 카드 내용 */}
						<div className="p-3 flex flex-col gap-2.5">
							<div>
								<h4 className="text-[13px] font-bold text-foreground leading-tight">{pub.name}</h4>
								<p className="text-[11px] text-muted-foreground">{pub.author}</p>
							</div>
							<p className="text-[12px] text-muted-foreground leading-snug line-clamp-2">
								{pub.desc}
							</p>
							<div className="flex items-center justify-between">
								<span className="text-[11px] text-muted-foreground">{pub.count}</span>
								<button className="text-[11px] font-bold px-3 py-1 rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
									구독
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
