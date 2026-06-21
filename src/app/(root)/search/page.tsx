'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { searchService, SearchResult } from '@/services/search.service';
import { getTimeDiff } from '@/utils';

export default function SearchPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const q = searchParams.get('q') ?? '';

	const [result, setResult] = useState<SearchResult | null>(null);
	const [loading, setLoading] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);

	const fetchSearch = useCallback(async (query: string, after?: string) => {
		if (!query.trim()) return;
		after ? setLoadingMore(true) : setLoading(true);
		try {
			const data = await searchService.search(query.trim(), after);
			setResult(prev =>
				after && prev
					? { ...data, data: [...prev.data, ...data.data] }
					: data
			);
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
				{result && (
					<p className="text-sm text-muted-foreground mt-1">총 {result.count.toLocaleString()}건</p>
				)}
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
				<div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
					{result.data.map(post => {
						const href = `/user/${post.userId}${post.path}`;
						return (
							<Link
								key={post.id}
								href={href}
								className="flex items-start gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
							>
								<div className="flex-1 min-w-0">
									<p className="text-xs text-muted-foreground mb-1">{post.userId}</p>
									<h2 className="text-base font-semibold text-foreground line-clamp-1 mb-1">{post.title}</h2>
									{post.summary && (
										<p className="text-sm text-muted-foreground line-clamp-2 mb-2">{post.summary}</p>
									)}
									<div className="flex items-center gap-2 flex-wrap">
										{post.tags.map(tag => (
											<span key={tag} className="text-xs text-blue-500">#{tag}</span>
										))}
										<span className="text-xs text-muted-foreground" suppressHydrationWarning>
											{getTimeDiff(post.createdAt)}
										</span>
									</div>
								</div>
								{post.thumbnail && (
									<div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
										<Image
											src={`/api/image/${post.thumbnail}`}
											alt={post.title}
											fill
											sizes="80px"
											className="object-cover"
										/>
									</div>
								)}
							</Link>
						);
					})}
				</div>
			)}

			{!loading && result?.hasNext && result.cursor && (
				<button
					onClick={() => fetchSearch(q, result.cursor!.after)}
					disabled={loadingMore}
					className="w-full mt-4 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted transition disabled:opacity-50"
				>
					{loadingMore ? '불러오는 중...' : '더 보기'}
				</button>
			)}
		</div>
	);
}
