"use client";

import { Label } from "./ui/label";

export default function SignInForm() {
  return (
    <div className="p-6 w-[90%] lg:w-[60%] my-0 mx-auto">
      <Label className="text-2xl font-bold text-center">로그인</Label>
      <div className="mt-4 flex flex-col">
        <div>
          <h3 className="text-lg font-bold text-neutral-400">
            소셜 계정으로 로그인
          </h3>
          <div className="flex py-4 flex-col gap-6">
            <div>카카오 로그인</div>
            <div>네이버 로그인</div>
            <div>구글 로그인</div>
          </div>
        </div>
        <div>asdasd</div>
      </div>
    </div>
  );
}
