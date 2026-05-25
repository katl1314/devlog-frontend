'use client';

import { isEmpty } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

interface Props {
	onClose: () => void;
}

export default function SearchOverlay({ onClose }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [mounted, setMounted] = useState(false);
	const [query, setQuery] = useState('');

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		inputRef.current?.focus();
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	if (isEmpty(mounted) || mounted === false) return null; // 마운트가 되지 않았으면 null을 반환한다.

	return createPortal(
		<div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
			<div className="w-full max-w-150" onClick={e => e.stopPropagation()}>
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
						placeholder="인사이트, 에디터 검색..."
						className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
					/>
					<Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground shrink-0">
						<IoClose size={18} className="size-4.5" />
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
}
