import { CiBellOn, CiSearch } from "react-icons/ci";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

/**
 *
 * @returns
 */
export default function Profile() {
  return (
    <div className="flex flex-row gap-2 items-center">
      {/* 검색 => 모달을 통해서 검색 기능 */}
      <CiSearch size={32} className="block lg:hidden" />
      {/* 구독 알람 => 페이지?*/}
      <CiBellOn size={32} />
      {/* 로그인 모달 또는 페이지?*/}
      <Link href={"/sign"} className="flex items-center">
        <span className="px-[10px] py-[5px] border-[1px] border-[#e5e5e5] rounded-md text-sm">
          로그인
        </span>
      </Link>
      {/* <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
    </div>
  );
}
