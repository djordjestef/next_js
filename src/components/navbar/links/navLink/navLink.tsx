"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navLink.module.css";

const NavLink = ({ item }: any) => {
  const pathName = usePathname();
  console.log("pathName", pathName);

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${pathName === item.path && styles.active}`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
