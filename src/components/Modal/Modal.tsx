"use client";

import { ReactNode, useEffect, useRef, MouseEventHandler } from "react";
import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";

interface Modal {
  children: ReactNode;
  afterCloseModal?: (target: EventTarget) => void;
}

// 모달은 React의 Portal을 사용한다.
export default function Modal({ children, afterCloseModal }: Modal) {
  // createPortal을 통해 모달로 보여줄 컴포넌트와, 위치 엘리먼트를 전달한다.
  const modalRef = useRef<HTMLDialogElement>(null);
  // const router = useRouter();
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

  const handleClose: MouseEventHandler<HTMLDialogElement> = (e) => {
    // 로직 체크 필요... 인터셉트 라우팅 여부 확인 필
    // if ((e.target as HTMLElement).nodeName === "DIALOG") {
    //   router.back();
    // }
    modalRef.current?.close();
    afterCloseModal?.(e.target);
  };

  return createPortal(
    <dialog
      ref={modalRef}
      className="w-[100%] border-none rounded-[5px] my-[60%] mx-auto backdrop:bg-[rgba(0,0,0,0.2)] lg:w-[40%] lg:my-[10%]"
      onClick={handleClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
}
