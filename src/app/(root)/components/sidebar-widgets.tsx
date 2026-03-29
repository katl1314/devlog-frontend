'use client';

import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

// 현재 미사용
// const trendingTopics = [
// 	{ category: '디자인', name: '글래스모피즘 UI', stats: '14.2K 아티클' },
// 	{ category: '테크놀로지', name: '프론트엔드 최적화', stats: '8,930 아티클' },
// 	{ category: '생산성', name: '노션 템플릿', stats: '32.5K 아티클' },
// 	{ category: '커리어', name: '포트폴리오 전략', stats: '19.1K 아티클' },
// 	{ category: '라이프스타일', name: '디지털 노마드', stats: '7,240 아티클' }
// ];

export default function SidebarWidgets() {
	const [query, setQuery] = useState('');

	return (
		<div className="sticky top-0 flex flex-col gap-5 py-6 px-5 h-screen overflow-y-auto justify-between">
			{/* 검색 */}
			<div
				className={`flex items-center gap-3 bg-muted rounded-full px-4 py-3 border transition-all ${
					query
						? 'border-blue-500 ring-2 ring-blue-500/10 bg-card'
						: 'border-transparent'
				}`}
			>
				<BiSearch size={18} className="text-muted-foreground shrink-0" />
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder="인사이트, 에디터 검색..."
					className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
				/>
			</div>

			{/* 프리미엄 배너 */}
			{/* <div className="rounded-2xl p-5 text-white flex flex-col gap-4 bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
				<div>
					<h3 className="text-base font-bold mb-1">dev.log Pro ✨</h3>
					<p className="text-sm opacity-90 leading-snug">
						더 깊이 있는 인사이트와 미디어 업로드를 경험하세요.
					</p>
				</div>
				<button className="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-full w-fit hover:bg-white/90 transition-colors">
					지금 알아보기
				</button>
			</div> */}

			{/* 인기 토픽 */}
			{/* <div className="bg-card border border-border rounded-2xl overflow-hidden">
				<div className="px-4 py-4 border-b border-border">
					<h3 className="text-base font-bold">인기 토픽</h3>
				</div>
				<div className="flex flex-col">
					{trendingTopics.map((topic, index) => (
						<div
							key={index}
							className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
						>
							<span className="text-sm font-bold text-muted-foreground w-4 pt-0.5 shrink-0">
								{index + 1}
							</span>
							<div className="flex flex-col gap-0.5">
								<span className="text-xs text-muted-foreground">{topic.category}</span>
								<h4 className="text-[14px] font-semibold text-foreground leading-tight">
									{topic.name}
								</h4>
								<span className="text-xs text-muted-foreground">{topic.stats}</span>
							</div>
						</div>
					))}
				</div>
				<button className="w-full py-3 text-left px-4 text-sm font-medium text-blue-500 hover:bg-muted/50 transition-colors">
					토픽 더보기
				</button>
			</div> */}

			{/* 푸터 */}
			<footer className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground px-1">
				<a href="#" className="hover:underline">
					소개
				</a>
				<a href="#" className="hover:underline">
					도움말
				</a>
				<a href="#" className="hover:underline">
					이용약관
				</a>
				<a href="#" className="hover:underline">
					개인정보
				</a>
				<p className="w-full mt-1">© 2026 dev.log Platform</p>
			</footer>
		</div>
	);
}
