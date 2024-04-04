import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div>Logo</div>
        <Link href='/'>Homepage</Link>
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact</Link>

    </div>
  );
};

export default Navbar;
