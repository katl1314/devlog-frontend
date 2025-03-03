import Searchbar from "../Layout/Searchbar";
import Profile from "../Profile/Profile";
import style from "./Header.module.css";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header className="sticky top-[0] z-[9999]">
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.menu}>
            <SidebarTrigger />
            <Searchbar />
            <Gnb />
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
}

const Gnb = () => {
  return <div>Gnb</div>;
};
