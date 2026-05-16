import Image from 'next/image';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface Series {
	id: string;
	title: string;
	thumbnail?: string;
	postCount: number;
	updatedAt: string;
}

const MOCK_SERIES: Series[] = [
	{ id: '1', title: 'Next.js 완전 정복', thumbnail: '', postCount: 8, updatedAt: '2026-05-10' },
	{ id: '2', title: 'TypeScript 실전', thumbnail: '', postCount: 5, updatedAt: '2026-04-22' },
	{ id: '3', title: 'TailwindCSS 디자인 시스템', thumbnail: '', postCount: 3, updatedAt: '2026-03-15' },
];

export default function UserSeriesSection({ userId }: { userId: string }) {
	if (MOCK_SERIES.length === 0) {
		return (
			<div className="p-4 sm:p-6">
				<div className="bg-muted border border-border rounded-2xl p-10 flex flex-col items-center gap-3 text-muted-foreground">
					<BookOpen size={32} strokeWidth={1.5} />
					<p className="text-sm">아직 시리즈가 없습니다.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 sm:p-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{MOCK_SERIES.map(series => (
					<SeriesCard key={series.id} series={series} userId={userId} />
				))}
			</div>
		</div>
	);
}

function SeriesCard({ series, userId }: { series: Series; userId: string }) {
	const updatedAt = new Date(series.updatedAt).toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return (
		<Link
			href={`/@${userId}?tab=series&id=${series.id}`}
			className="group bg-muted border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-colors cursor-pointer"
		>
			{/* 썸네일 */}
			<div className="relative w-full aspect-video bg-background">
				{series.thumbnail ? (
					<Image src={series.thumbnail} alt={series.title} fill className="object-cover" />
				) : (
					<div className="absolute inset-0 flex items-center justify-center">
						<BookOpen size={36} strokeWidth={1.2} className="text-muted-foreground/40" />
					</div>
				)}
			</div>

			{/* 정보 */}
			<div className="p-4">
				<h3 className="font-bold text-[15px] leading-snug text-foreground mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors">
					{series.title}
				</h3>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>{series.postCount}개의 포스트</span>
					<span>{updatedAt}</span>
				</div>
			</div>
		</Link>
	);
}
