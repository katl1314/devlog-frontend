'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { IoClose, IoArrowBack } from 'react-icons/io5';
import { MdHistory, MdClose } from 'react-icons/md';
import { LuFileText, LuTag, LuCornerDownLeft } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { searchService, SuggestResult } from '@/services/search.service';
import { isEmpty } from '@/utils';

interface Props {
	onClose: () => void;
}

type NavItem =
	| { kind: 'history'; value: string }
	| { kind: 'tag'; value: string }
	| { kind: 'post'; id: string; title: string; userId: string; path: string };

export default function SearchOverlay({ onClose }: Props) {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [mounted, setMounted] = useState(false);
	const [query, setQuery] = useState('');
	const [suggest, setSuggest] = useState<SuggestResult | null>(null);
	const [history, setHistory] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);

	useEffect(() => {
		setMounted(true);
		setHistory(searchService.getHistory());
	}, []);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		if (!query.trim()) {
			setSuggest(null);
			setLoading(false);
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

	const showHistory = !query.trim() && history.length > 0;
	const showSuggest =
		!!query.trim() && suggest !== null && (suggest.posts.length > 0 || suggest.tags.length > 0);

	const navItems: NavItem[] = useMemo(() => {
		if (showHistory) return history.map(v => ({ kind: 'history' as const, value: v }));
		if (showSuggest && suggest) {
			return [
				...suggest.tags.map(t => ({ kind: 'tag' as const, value: t.name })),
				...suggest.posts.map(p => ({
					kind: 'post' as const,
					id: p.id,
					title: p.title,
					userId: p.userId,
					path: p.path,
				})),
			];
		}
		return [];
	}, [showHistory, showSuggest, history, suggest]);

	useEffect(() => {
		setActiveIndex(-1);
	}, [navItems]);

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

	const activateItem = useCallback(
		(item: NavItem) => {
			if (item.kind === 'history' || item.kind === 'tag') {
				handleSearch(item.value);
			} else {
				onClose();
				router.push(`/@${item.userId}${item.path}`);
			}
		},
		[handleSearch, onClose, router]
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
				return;
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setActiveIndex(prev => (navItems.length > 0 ? (prev + 1) % navItems.length : -1));
				return;
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				setActiveIndex(prev =>
					navItems.length > 0 ? (prev <= 0 ? navItems.length - 1 : prev - 1) : -1
				);
				return;
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose, navItems]);

	useEffect(() => {
		if (activeIndex < 0 || !listRef.current) return;
		const el = listRef.current.querySelectorAll('[data-nav-item]')[activeIndex] as HTMLElement;
		el?.scrollIntoView({ block: 'nearest' });
	}, [activeIndex]);

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (activeIndex >= 0 && navItems[activeIndex]) {
				activateItem(navItems[activeIndex]);
			} else {
				handleSearch(query);
			}
		}
	};

	const removeHistory = (item: string, e: React.MouseEvent) => {
		e.stopPropagation();
		searchService.removeHistory(item);
		setHistory(searchService.getHistory());
	};

	const showPanel = showHistory || showSuggest || loading;
	const postOffset = suggest ? suggest.tags.length : 0;

	if (isEmpty(mounted) || mounted === false) return null;

	const results = (
		<>
			{loading && (
				<div className="px-4 py-6 text-sm text-muted-foreground text-center">검색 중...</div>
			)}

			{/* 최근 검색 */}
			{!loading && showHistory && (
				<div className="py-1">
					<div className="flex items-center justify-between px-4 py-2">
						<span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
							최근 검색
						</span>
						<button
							onClick={() => {
								searchService.clearHistory();
								setHistory([]);
							}}
							className="text-xs text-muted-foreground hover:text-foreground transition-colors"
						>
							전체 삭제
						</button>
					</div>
					{history.map((item, idx) => {
						const isActive = idx === activeIndex;
						return (
							<div
								key={item}
								data-nav-item
								onClick={() => handleSearch(item)}
								className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
									isActive ? 'bg-primary/10' : 'hover:bg-muted'
								}`}
							>
								<MdHistory
									size={15}
									className={`shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
								/>
								<span className="flex-1 text-sm text-foreground">{item}</span>
								{isActive && <LuCornerDownLeft size={13} className="text-primary shrink-0" />}
								<button
									onClick={e => removeHistory(item, e)}
									className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
								>
									<MdClose size={13} />
								</button>
							</div>
						);
					})}
				</div>
			)}

			{/* 자동완성 */}
			{!loading && showSuggest && suggest && (
				<div className="py-1">
					{suggest.tags.length > 0 && (
						<div>
							<div className="px-4 py-2">
								<span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
									태그
								</span>
							</div>
							{suggest.tags.map((tag, idx) => {
								const isActive = idx === activeIndex;
								return (
									<div
										key={tag.name}
										data-nav-item
										onClick={() => handleSearch(tag.name)}
										className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
											isActive ? 'bg-primary/10' : 'hover:bg-muted'
										}`}
									>
										<LuTag
											size={14}
											className={`shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
										/>
										<span className="flex-1 text-sm text-foreground">#{tag.name}</span>
										{isActive && (
											<LuCornerDownLeft size={13} className="text-primary shrink-0" />
										)}
									</div>
								);
							})}
						</div>
					)}

					{suggest.posts.length > 0 && (
						<div>
							<div className="px-4 py-2">
								<span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
									포스트
								</span>
							</div>
							{suggest.posts.map((post, idx) => {
								const isActive = postOffset + idx === activeIndex;
								return (
									<div
										key={post.id}
										data-nav-item
										onClick={() => {
											onClose();
											router.push(`/@${post.userId}${post.path}`);
										}}
										className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
											isActive ? 'bg-primary/10' : 'hover:bg-muted'
										}`}
									>
										<LuFileText
											size={14}
											className={`shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
										/>
										<span className="flex-1 text-sm text-foreground line-clamp-1">
											{post.title}
										</span>
										{isActive && (
											<LuCornerDownLeft size={13} className="text-primary shrink-0" />
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			)}
		</>
	);

	return createPortal(
		<div className="fixed inset-0 z-50">
			{/* 데스크탑 딤 오버레이 */}
			<div className="hidden md:block absolute inset-0 bg-black/50" onClick={onClose} />

			{/* 검색 패널 */}
			<div
				className={`
					relative flex flex-col bg-card h-full
					md:absolute md:h-auto md:inset-auto md:top-20 md:left-1/2 md:-translate-x-1/2
					md:w-full md:max-w-xl md:rounded-xl md:border md:border-border md:shadow-2xl
				`}
			>
				{/* 입력창 */}
				<div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
					{/* 모바일: 뒤로가기 / 데스크탑: 검색 아이콘 */}
					<button
						className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
						onClick={onClose}
					>
						<IoArrowBack size={20} />
					</button>
					<BiSearch size={18} className="hidden md:block text-muted-foreground shrink-0" />

					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={e => setQuery(e.target.value)}
						onKeyDown={handleInputKeyDown}
						placeholder="인사이트, 에디터 검색..."
						className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
					/>

					{query && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setQuery('')}
							className="text-muted-foreground hover:text-foreground shrink-0 w-7 h-7"
						>
							<IoClose size={16} />
						</Button>
					)}
				</div>

				{/* 결과 영역 */}
				{showPanel && (
					<div
						ref={listRef}
						className="flex-1 overflow-y-auto md:flex-none md:max-h-96"
					>
						{results}
					</div>
				)}

				{/* 키보드 힌트 (데스크탑 전용) */}
				<div className="hidden md:flex items-center gap-4 px-4 py-2 border-t border-border bg-muted/40 text-xs text-muted-foreground">
					<span className="flex items-center gap-1.5">
						<kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px] leading-tight">
							↵
						</kbd>
						선택
					</span>
					<span className="flex items-center gap-1.5">
						<kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px] leading-tight">
							↑↓
						</kbd>
						이동
					</span>
					<span className="flex items-center gap-1.5">
						<kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px] leading-tight">
							esc
						</kbd>
						닫기
					</span>
				</div>
			</div>
		</div>,
		document.body
	);
}
