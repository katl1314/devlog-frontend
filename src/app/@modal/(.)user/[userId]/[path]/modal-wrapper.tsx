'use client';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export default function ModalWrapper({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	const onDismiss = () => {
		router.back();
	};

	const onClickBackdrop = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			onDismiss();
		}
	};

	useEffect(() => {
		setMounted(true);
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);

	if (!mounted) return null;

	const modalRoot = document.getElementById('modal') ?? document.body;

	return createPortal(
		<div
			className="fixed inset-0 z-100 flex md:items-center md:justify-center md:bg-black/50 md:p-6"
			onClick={onClickBackdrop}
			role="dialog"
			aria-modal="true"
		>
			<Button
				type="button"
				variant="ghost"
				onClick={onDismiss}
				aria-label="닫기"
				className="absolute right-4 top-4 z-10 p-2 h-auto rounded-full text-muted-foreground hover:text-foreground hover:bg-muted md:text-white/60 md:hover:text-white md:hover:bg-white/10"
			>
				<FiX size={24} className="size-6" />
			</Button>
			<div className="relative flex flex-col w-full h-full md:h-auto md:max-w-5xl md:max-h-[95vh] bg-background md:border md:border-border md:rounded-lg overflow-hidden">
				<div className="flex-1 overflow-y-auto scrollbar-thin pb-6">{children}</div>
			</div>
		</div>,
		modalRoot
	);
}
