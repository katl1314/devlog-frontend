import Image from "next/image";
import Link from "next/link";
import style from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={style.container}>
      <Link href={"./"} className={style.logo}>
        <Image src={"/icon.svg"} alt="로고이미지" width={50} height={50} />
        <span className={style.text}>Moodoo</span>
      </Link>
    </div>
  );
}
