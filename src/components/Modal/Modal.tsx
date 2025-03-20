"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  MouseEventHandler,
} from "react";
import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";

interface ModalProps {
  children: ReactNode;
  afterCloseModal?: (target: EventTarget) => void;
}

export default function Modal({ children, afterCloseModal }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  // const router = useRouter();

  // ⭐ `document`가 있는 환경에서만 `document.getElementById()` 실행
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // 컴포넌트 마운트 이후 브라우저 환경에서 실행
    setModalRoot(document.getElementById("modal"));
  }, []);

  useEffect(() => {
    // modalRoot컴포넌트가 null이 아니면
    if (modalRef.current && !modalRef.current.open) {
      modalRef.current.showModal();
      modalRef.current.scrollTo({ top: 0 });
      modalRef.current.focus({ preventScroll: true });
    }
  }, [modalRoot]); // `modalRoot`가 업데이트되면 실행

  const handleClose: MouseEventHandler<HTMLDialogElement> = (e) => {
    modalRef.current?.close();
    afterCloseModal?.(e.target);
  };

  // SSR 환경에서는 null 반환해서 `document is not defined` 에러 방지
  if (!modalRoot) return null;

  return createPortal(
    <dialog
      ref={modalRef}
      className="w-[100%] border-none rounded-[5px] my-[60%] mx-auto backdrop:bg-[rgba(0,0,0,0.2)] lg:w-[40%] lg:my-[10%]"
      onClose={(e) => afterCloseModal?.(e.target)} // 🚀 추가된 모달 닫기 기능
      onClick={(e) => {
        // if ((e.target as HTMLElement).nodeName === "DIALOG") {
        //   router.back();
        // }
        handleClose(e);
      }}
    >
      {children}
    </dialog>,
    modalRoot
  );
}
