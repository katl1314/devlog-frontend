import { seriesService } from '@/services/series.service';
import { BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import PostCard from '@/components/post/post-card';

interface Props {
	seriesId: string;
	userId: string;
}

export default async function UserSeriesDetail({ seriesId, userId }: Props) {
	let series;
	let posts: any[] = [];

	try {
		[series, posts] = await Promise.all([seriesService.findOne(seriesId), seriesService.findPosts(seriesId)]);
	} catch {
		return <div className="p-6 text-center text-muted-foreground text-sm">시리즈를 찾을 수 없습니다.</div>;
	}

	return (
		<div className="p-4 sm:p-6">
			<Link
				href={`/@${userId}?tab=series`}
				className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 pr-3 py-1.5 rounded-full mb-5 transition-colors cursor-pointer"
			>
				<ChevronLeft size={14} /> 시리즈 목록
			</Link>

			<div className="mb-6 p-5 rounded-2xl bg-muted border border-border flex items-start gap-4">
				<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border shrink-0">
					<BookOpen size={22} className="text-muted-foreground" strokeWidth={1.5} />
				</div>
				<div className="min-w-0">
					<h2 className="text-lg font-bold text-foreground leading-snug">{series.name}</h2>
					{series.description && (
						<p className="mt-1 text-sm text-muted-foreground line-clamp-2">{series.description}</p>
					)}
					<p className="mt-2 text-xs font-medium text-muted-foreground">{posts.length}개의 포스트</p>
				</div>
			</div>

			{posts.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-24 text-center px-6">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-5">
						<BookOpen size={28} strokeWidth={1.5} className="text-muted-foreground" />
					</div>
					<p className="text-base font-semibold text-foreground">아직 포스트가 없습니다</p>
					<p className="mt-1.5 text-sm text-muted-foreground">이 시리즈에 포스트를 추가해보세요</p>
				</div>
			) : (
				<div className="divide-y divide-border">
					{posts.map((post: any) => (
						<PostCard key={post.id} {...post} />
					))}
				</div>
			)}
		</div>
	);
}
