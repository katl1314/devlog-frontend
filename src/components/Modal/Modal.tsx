'use client';

import { ReactNode, useEffect, useState, MouseEventHandler } from 'react';
import { useModal } from '@/hooks/modal';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';

interface ModalProps {
  open: boolean; // (필수) 초기 모달 열려있는지 값
  children: ReactNode; // (필수) 모달에 렌더링할 엘리먼트
  onAfterClose: (target: EventTarget) => void; // (필수) 모달 닫혔을때 이벤트
  className?: string; // (선택) css
}

export default function Modal({ open, children, className, onAfterClose }: ModalProps) {
  const [mounted, setMounted] = useState<boolean>(false); // 마운트 여부
  const modalRef = useModal(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose: MouseEventHandler<HTMLDialogElement> = e => {
    onAfterClose(e.target);
  };

  // 배경(Backdrop) 클릭 시 닫기
  const handleBackdropClick: MouseEventHandler<HTMLDialogElement> = (e) => {
    e.target === e.currentTarget && onAfterClose(e.target);
  };

  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={modalRef}
      className={cn("border-none rounded-[5px] mx-auto backdrop:bg-[rgba(0,0,0,0.2)]", className)}
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>,
    document.getElementById('modal') as HTMLElement
  );
}
