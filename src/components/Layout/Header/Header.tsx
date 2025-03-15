import Searchbar from "../Searchbar";
import Profile from "@/components/Profile";
import style from "./Header.module.css";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header>
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
