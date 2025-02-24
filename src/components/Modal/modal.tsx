// import style from "./modal.module.css";
"use client";

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

  // 컴포넌트 마운트 시
  useEffect(() => {
    if (!modalRef.current?.open) {
      modalRef.current?.showModal();
    }
  }, []);

  // 이벤트 정의
  const handleClick: MouseEventHandler = (e) => {
    // 모달 영역 클릭 시
  };

  const handleClose: ReactEventHandler = (e) => {
    // esc 버튼 클릭 시 => 모달 종료...
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
