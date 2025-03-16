"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

// 모달은 React의 Portal을 사용한다.
export default function Modal({ children }: { children: ReactNode }) {
  // createPortal을 통해 모달로 보여줄 컴포넌트와, 위치 엘리먼트를 전달한다.
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 화면에 마운트 되는 시점에 실행한다.
    if (!modalRef.current?.open) {
      // 모달이 현재 꺼져있다면?
      modalRef.current?.showModal();
      // 모달이 상단에 위치하도록
      modalRef.current?.scrollTo({
        top: 0,
      });
      // 포커스 방지
      modalRef.current?.focus({ preventScroll: true });
    }
  }, []);

  return createPortal(
    <dialog
      ref={modalRef}
      className={style.modal}
      onClose={() => {
        router.back(); // esc키 눌렀을 때 모달 닫힘.
      }}
      onClick={(e) => {
        // 모달 클릭 시 뒤로가기 => 뒷 배경
        if ((e.target as HTMLElement).nodeName === "DIALOG") {
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
}
