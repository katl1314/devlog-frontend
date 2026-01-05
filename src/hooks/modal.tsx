import { useEffect, useRef } from 'react';

export const useModal = (isOpen: boolean) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current as HTMLDialogElement;

    if (!modal) return;

    if (isOpen && !modal.open) {
      // 상태값은 open이지만, 실제로는 close일때 값을 바꿔야겠지?
      modal.showModal();
      modal.scrollTo({ top: 0 });
      modal.focus({ preventScroll: true });
    } else if (!isOpen && modal.open) {
      modal.close();
    }
  }, [isOpen]);

  return modalRef;
}