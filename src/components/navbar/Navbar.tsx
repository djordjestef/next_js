import Links from "./links/Links";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href='/'>
        <Image
          src="/logo.jpg"
          width={40}
          height={40}
          alt="Picture of the author"
        />
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
