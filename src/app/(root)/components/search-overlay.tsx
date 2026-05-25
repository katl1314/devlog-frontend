'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiSearch } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

interface Props {
	onClose: () => void;
}

export default function SearchOverlay({ onClose }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState('');

	useEffect(() => {
		inputRef.current?.focus();
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return createPortal(
		<div
			className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4"
			onClick={onClose}
		>
			<div
				className="w-full max-w-150"
				onClick={e => e.stopPropagation()}
			>
				<div
					className={`flex items-center gap-3 bg-card rounded-full px-4 py-3 border shadow-lg transition-all ${
						query
							? 'border-blue-500 ring-2 ring-blue-500/10'
							: 'border-border'
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
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<IoClose size={18} />
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
}
