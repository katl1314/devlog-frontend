'use client';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  const onClickWrapper = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onDismiss();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClickWrapper}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-6">
        {children}
      </div>
    </div>
  );
}