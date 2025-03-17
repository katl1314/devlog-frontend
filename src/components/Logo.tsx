import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link href={"/"} className="flex items-center no-underline">
        {/* <Image src={"/icon.svg"} alt="로고이미지" width={50} height={50} /> */}
        <span className="text-[20px] font-bold text-[#333]">DevsLog</span>
      </Link>
    </div>
  );
}
