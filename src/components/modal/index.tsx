'use client';

import { ReactNode, useEffect, useState, MouseEventHandler, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import { FiX } from 'react-icons/fi'; // 닫기 아이콘 (선택사항)

interface ModalProps {
  open: boolean;
  children: ReactNode;
  onAfterClose: () => void; // EventTarget 의존성 제거하여 더 심플하게 변경 권장
  className?: string;
  showCloseButton?: boolean; // 닫기 버튼 표시 여부 옵션
}

export default function Modal({
  open,
  children,
  className,
  onAfterClose,
  showCloseButton = true
}: ModalProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // 모달이 열려있을 때 body 스크롤 방지
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // ESC 키로 닫기 기능
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') {
        onAfterClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onAfterClose]);

  // 배경 클릭 시 닫기
  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onAfterClose();
    }
  };

  if (!mounted || !open) return null;

  // React Portal을 사용하여 body 레벨에 렌더링
  const modalRoot = document.getElementById('modal') || document.body;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. 배경 오버레이 (Backdrop) */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* 2. 모달 컨텐츠 (Content) */}
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto",
          // 애니메이션 클래스: 등장 시 투명도 0->1, 크기 95%->100%
          "animate-in fade-in zoom-in-95 duration-200 slide-in-from-bottom-2",
          className
        )}
      >
        {/* (옵션) 우측 상단 닫기 버튼 */}
        {showCloseButton && (
          <button
            onClick={onAfterClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <FiX size={20} />
          </button>
        )}

        {children}
      </div>
    </div>,
    modalRoot
  );
}