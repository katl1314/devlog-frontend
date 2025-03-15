"use client";

import { useRouter } from "next/navigation";
import {
  MouseEventHandler,
  PropsWithChildren,
  ReactEventHandler,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: PropsWithChildren) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  // 컴포넌트 마운트 시
  useEffect(() => {
    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, []);

  // 이벤트 정의
  const handleClick: MouseEventHandler = () => {
    // 모달 영역 클릭 시
    modalRef?.current?.close(); // 모달 닫기
  };

  const handleClose: ReactEventHandler = () => {
    // esc 버튼 클릭 시 => 모달 종료...
    router.back();
  };
  const dialog = (
    <dialog
      ref={modalRef}
      open={false}
      onClick={handleClick}
      onClose={handleClose}
    >
      {children}
    </dialog>
  );
  const target = document.body.querySelector("#modal")!; // !을 붙이면 Null이 아니다.
  const modal = createPortal(dialog, target);
  return modal;
}
