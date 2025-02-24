import Header from "@/components/Header/Header";
import style from "./page.module.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <Header />
      <div>{children}</div>
    </div>
  );
}
