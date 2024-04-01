import Image from "next/image";
import Link from "next/link";

export default function Home() {
  console.log("djordje");
  return (
    <main>
      <h1>Hello world</h1>
      <Link href="/users">Users</Link>
    </main>
  );
}
