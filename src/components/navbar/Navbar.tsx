import Links from "./links/Links";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import { auth } from "../../lib/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          src="/logo.jpg"
          width={40}
          height={40}
          alt="Picture of the author"
        />
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
