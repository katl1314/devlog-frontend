import Searchbar from "../Searchbar";
import Profile from "../../Profile/Profile";
import style from "./Header.module.css";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="sticky top-[0] z-[9999]">
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.menu}>
            <h3 className="text-xl font-bold cursor-pointer">
              <Logo />
            </h3>
            <Searchbar />
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
}
