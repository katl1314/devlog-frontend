import { CiBellOn, CiSearch } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 *
 * @returns
 */
export default function Profile() {
  return (
    <div className="flex flex-row gap-2 align-center">
      {/* 검색 => 모달을 통해서 검색 기능 */}
      <CiSearch size={32} className="block lg:hidden" />
      {/* 구독 알람 => 페이지?*/}
      <CiBellOn size={32} />
      {/* 로그인 모달 또는 페이지?*/}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
