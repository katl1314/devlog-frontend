import Link from "next/link";
import style from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.menu}>
            <div>로고</div>
            <div>
              <Link href={"/book"}>도서</Link>
            </div>
            <div>프로필</div>
          </div>
        </div>
      </div>
    </header>
  );
}
