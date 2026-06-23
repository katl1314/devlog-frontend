'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { searchService, SearchResult } from '@/services/search.service';
import { getTimeDiff } from '@/utils';

type SearchPost = SearchResult['data'][number];

function SearchCard({ post }: { post: SearchPost }) {
	const blogHref = `/@${post.userId}`;
	const postHref = `/@${post.userId}${post.path}`;

	return (
		<article className="px-4 py-4 hover:bg-muted/30 transition-colors border-b border-border last:border-b-0">
			<div className="flex items-center gap-2 mb-3">
				<Link href={blogHref} className="text-sm font-semibold text-foreground hover:underline leading-none">
					{post.userId}
				</Link>
				<span className="text-muted-foreground text-sm">·</span>
				<span className="text-sm text-muted-foreground" suppressHydrationWarning>
					{getTimeDiff(post.createdAt)}
				</span>
			</div>

			<Link href={postHref} className="block group" scroll={false}>
				<div className="flex justify-between items-start gap-4">
					<div className="flex-1 min-w-0">
						<h3 className="text-[17px] font-bold leading-snug text-foreground mb-1.5 line-clamp-2 tracking-tight group-hover:text-foreground/70 transition-colors">
							{post.title}
						</h3>
						{post.summary && (
							<p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>
						)}
					</div>
					{post.thumbnail && (
						<div className="relative w-22 h-22 shrink-0 rounded-xl overflow-hidden">
							<Image
								src={`/api/image/${post.thumbnail}`}
								alt={post.title}
								fill
								sizes="88px"
								className="object-cover"
							/>
						</div>
					)}
				</div>

				{post.tags.length > 0 && (
					<div className="flex flex-wrap gap-1.5 mt-3">
						{post.tags.map(tag => (
							<span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
								#{tag}
							</span>
						))}
					</div>
				)}
			</Link>
		</article>
	);
}

export default function SearchPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const q = searchParams.get('q') ?? '';

	const [result, setResult] = useState<SearchResult | null>(null);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const fetchSearch = useCallback(async (query: string, after?: string) => {
		if (!query.trim()) return;
		after ? setLoadingMore(true) : setLoading(true);
		try {
			const data = await searchService.search(query.trim(), after);
			setResult(prev => (after && prev ? { ...data, data: [...prev.data, ...data.data] } : data));
		} catch {
			// 에러 시 현재 결과 유지
		} finally {
			after ? setLoadingMore(false) : setLoading(false);
		}
	}, []);

	useEffect(() => {
		setResult(null);
		fetchSearch(q);
	}, [q, fetchSearch]);

	useEffect(() => {
		const el = sentinelRef.current;
		if (!el || !result?.hasNext || !result.cursor || loadingMore) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				observer.disconnect();
				fetchSearch(q, result.cursor!.after);
			}
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [result, loadingMore, fetchSearch, q]);

	if (!q) {
		return (
			<div className="flex flex-col items-center justify-center py-32 text-muted-foreground gap-3">
				<BiSearch size={48} />
				<p className="text-base">검색어를 입력해주세요.</p>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto px-4 py-10">
			<div className="mb-6">
				<h1 className="text-xl font-bold text-foreground">
					<span className="text-blue-500">"{q}"</span> 검색 결과
				</h1>
				{result && <p className="text-sm text-muted-foreground mt-1">총 {result.count.toLocaleString()}건</p>}
			</div>

			{result?.relatedTags && result.relatedTags.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-6">
					{result.relatedTags.map(tag => (
						<button
							key={tag}
							onClick={() => router.push(`/search?q=${encodeURIComponent(tag)}`)}
							className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70 text-foreground font-medium transition"
						>
							#{tag}
						</button>
					))}
				</div>
			)}

			{loading && (
				<div className="flex flex-col gap-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
					))}
				</div>
			)}

			{!loading && result && result.data.length === 0 && (
				<div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
					<BiSearch size={40} />
					<p className="text-base">검색 결과가 없습니다.</p>
				</div>
			)}

			{!loading && result && result.data.length > 0 && (
				<div>
					{result.data.map(post => (
						<SearchCard key={post.id} post={post} />
					))}
				</div>
			)}

			<div ref={sentinelRef} />

			{loadingMore && (
				<div className="flex justify-center py-6">
					<div className="h-5 w-5 border-2 border-border border-t-foreground rounded-full animate-spin" />
				</div>
			)}
		</div>
	);
}
