import Links from "./links/Links";
import Image from "next/image";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div>
        <Image
          src="/logo.jpg"
          width={40}
          height={40}
          alt="Picture of the author"
        />
      </div>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
