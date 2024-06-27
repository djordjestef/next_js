"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navLink.module.css";

const mobileState = global.window?.innerWidth <= 992;
const NavLink = ({ item, setOpen }: any) => {
  const pathName = usePathname();
  const closeNav = () => {
    if (mobileState) {
      setOpen(false);
    }
  };

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${pathName === item.path && styles.active}`}
      onClick={closeNav}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
