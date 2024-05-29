"use client";
import { useContext, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { handleLogout } from "@/lib/action";
import { ActionType, MyContext } from "@/app/Store";
import Switch from "react-switch";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({ session }: any) => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(MyContext);

  const handleChangeTheme = (value: any) => {
    dispatch({ type: ActionType.CHANGE_THEME, dark_theme: value });
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={styles.container}>
      <Switch onChange={handleChangeTheme} checked={state.theme.dark_theme} />
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session?.user.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={state.theme.dark_theme ? styles.logoutDark : styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuBtn}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prevState) => !prevState)}
      />

      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
