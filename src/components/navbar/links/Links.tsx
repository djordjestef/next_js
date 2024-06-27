"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/Link";
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
  {
    title: "Chat",
    path: "/chat",
  },
];

const Links = ({ session }: any) => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { state, dispatch } = useContext(MyContext);

  const handleChangeTheme = (value: any) => {
    dispatch({ type: ActionType.CHANGE_THEME, dark_theme: value });
    document.documentElement.classList.toggle("dark");
    setIsDark((prevState) => !prevState);
    localStorage.setItem("dark_theme", JSON.stringify(value));
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      if (JSON.parse(localStorage.getItem("dark_theme")!)) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
        dispatch({
          type: ActionType.CHANGE_THEME,
          dark_theme: JSON.parse(localStorage.getItem("dark_theme")!),
        });
      }
    }
  }, []);

  const hasSession = (
    <>
      {session?.user.isAdmin && (
        <NavLink item={{ title: "Admin", path: "/admin" }} />
      )}
      <form action={handleLogout}>
        <button
          className={state.theme.dark_theme ? styles.logoutDark : styles.logout}
        >
          Logout
        </button>
      </form>
    </>
  );

  return (
    <div className={styles.container}>
      {session && (
        <div className={styles.username}>
          Hi <strong>{session?.user.username}</strong>
        </div>
      )}
      <Switch
        onChange={handleChangeTheme}
        checked={state.theme.dark_theme}
        className={styles.themeBtn}
      />
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          hasSession
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuBtn}
        src={isDark ? "/menu.png" : "/light_menu.png"}
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prevState) => !prevState)}
      />

      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} setOpen={setOpen} />
          ))}
          {session?.user ? (
            hasSession
          ) : (
            <NavLink item={{ title: "Login", path: "/login" }} />
          )}
        </div>
      )}
    </div>
  );
};

export default Links;
