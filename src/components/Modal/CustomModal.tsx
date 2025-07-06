'use client';

import { MouseEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ModalProps {
	children: ReactNode;
	className?: string;
	afterCloseModal?: (target: EventTarget) => void;
}

export default function SignUpModal({ children, afterCloseModal, className = '' }: ModalProps) {
	const modalRef = useRef<HTMLDialogElement>(null);

	// ⭐ `document`가 있는 환경에서만 `document.getElementById()` 실행
	const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

	useEffect(() => {
		// 컴포넌트 마운트 이후 브라우저 환경에서 실행
		setModalRoot(document.getElementById('modal'));
	}, []);

	useEffect(() => {
		// modalRoot컴포넌트가 null이 아니면
		if (modalRef.current && !modalRef.current.open) {
			modalRef.current.showModal();
			modalRef.current.scrollTo({ top: 0 });
			modalRef.current.focus({ preventScroll: true });
		}
	}, [modalRoot]); // `modalRoot`가 업데이트되면 실행

	const handleClose: MouseEventHandler<HTMLDialogElement> = e => {
		if ((e.target as HTMLElement).nodeName === 'DIALOG') {
			modalRef.current?.close();
		}
	};

	// SSR 환경에서는 null 반환해서 `document is not defined` 에러 방지
	if (!modalRoot) return null;

	return createPortal(
		<dialog
			ref={modalRef}
			className={cn('top-15 border-none rounded-[5px] mx-auto backdrop:bg-[rgba(0,0,0,0.2)] w-full', className)}
			onClose={e => afterCloseModal?.(e.target)}
			onClick={handleClose}
		>
			{children}
		</dialog>,
		modalRoot
	);
}
