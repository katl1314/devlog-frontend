'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { MdHistory, MdClose } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { searchService, SuggestResult } from '@/services/search.service';
import { isEmpty } from '@/utils';

interface Props {
	onClose: () => void;
}

export default function SearchOverlay({ onClose }: Props) {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [mounted, setMounted] = useState(false);
	const [query, setQuery] = useState('');
	const [suggest, setSuggest] = useState<SuggestResult | null>(null);
	const [history, setHistory] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setMounted(true);
		setHistory(searchService.getHistory());
	}, []);

	useEffect(() => {
		inputRef.current?.focus();
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		if (!query.trim()) {
			setSuggest(null);
			return;
		}

		setLoading(true);
		debounceRef.current = setTimeout(async () => {
			try {
				const result = await searchService.suggest(query.trim());
				setSuggest(result);
			} catch {
				setSuggest(null);
			} finally {
				setLoading(false);
			}
		}, 300);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [query]);

	const handleSearch = useCallback(
		(q: string) => {
			const trimmed = q.trim();
			if (!trimmed) return;
			searchService.addHistory(trimmed);
			setHistory(searchService.getHistory());
			onClose();
			router.push(`/search?q=${encodeURIComponent(trimmed)}`);
		},
		[router, onClose]
	);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleSearch(query);
	};

	const removeHistory = (item: string, e: React.MouseEvent) => {
		e.stopPropagation();
		searchService.removeHistory(item);
		setHistory(searchService.getHistory());
	};

	const showHistory = !query.trim() && history.length > 0;
	const showSuggest = !!query.trim() && suggest && (suggest.posts.length > 0 || suggest.tags.length > 0);

	if (isEmpty(mounted) || mounted === false) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
			<div className="w-full max-w-150" onClick={e => e.stopPropagation()}>
				{/* 검색 입력창 */}
				<div
					className={`flex items-center gap-3 bg-card rounded-full px-4 py-3 border shadow-lg transition-all ${
						query ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-border'
					}`}
				>
					<BiSearch size={18} className="text-muted-foreground shrink-0" />
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={e => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="인사이트, 에디터 검색..."
						className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
					/>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => (query ? setQuery('') : onClose())}
						className="text-muted-foreground hover:text-foreground shrink-0 w-7 h-7"
					>
						<IoClose size={18} className="size-4.5" />
					</Button>
				</div>

				{/* 드롭다운 */}
				{(showHistory || showSuggest || loading) && (
					<div className="mt-2 bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
						{loading && (
							<div className="px-4 py-3 text-sm text-muted-foreground">검색 중...</div>
						)}

						{/* 검색 히스토리 */}
						{!loading && showHistory && (
							<div>
								<div className="flex items-center justify-between px-4 pt-3 pb-1">
									<span className="text-xs font-semibold text-muted-foreground">최근 검색</span>
									<button
										onClick={() => { searchService.clearHistory(); setHistory([]); }}
										className="text-xs text-muted-foreground hover:text-foreground transition"
									>
										전체 삭제
									</button>
								</div>
								{history.map(item => (
									<div
										key={item}
										onClick={() => handleSearch(item)}
										className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer transition-colors"
									>
										<MdHistory size={16} className="text-muted-foreground shrink-0" />
										<span className="flex-1 text-sm text-foreground">{item}</span>
										<button
											onClick={e => removeHistory(item, e)}
											className="text-muted-foreground hover:text-foreground transition p-0.5"
										>
											<MdClose size={14} />
										</button>
									</div>
								))}
							</div>
						)}

						{/* 자동완성 */}
						{!loading && showSuggest && (
							<div className="py-1">
								{suggest!.tags.length > 0 && (
									<div className="px-4 pt-2 pb-1">
										<span className="text-xs font-semibold text-muted-foreground">태그</span>
										<div className="flex flex-wrap gap-2 mt-1.5">
											{suggest!.tags.map(tag => (
												<button
													key={tag.name}
													onClick={() => handleSearch(tag.name)}
													className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 text-foreground transition"
												>
													#{tag.name}
												</button>
											))}
										</div>
									</div>
								)}
								{suggest!.posts.length > 0 && (
									<div className="pt-2">
										<div className="px-4 pb-1">
											<span className="text-xs font-semibold text-muted-foreground">포스트</span>
										</div>
										{suggest!.posts.map(post => (
											<div
												key={post.id}
												onClick={() => { onClose(); router.push(`/user/${post.userId}${post.path}`); }}
												className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted cursor-pointer transition-colors"
											>
												<BiSearch size={14} className="text-muted-foreground shrink-0" />
												<span className="text-sm text-foreground line-clamp-1">{post.title}</span>
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>,
		document.body
	);
}
