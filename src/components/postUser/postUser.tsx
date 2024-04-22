
import styles from "./postUser.module.css";
import { getUser, getUsers } from "@/lib/services";
import Image from "next/image";

// FETCH DATA WITH AN API
// const getData = async (userId: number) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("User does not exist");
//   }

//   return res.json();
// };
const PostUser = async ({ userId }: any) => {
  const users = await getUsers()
  const user = await getUser(userId);
  console.log('users',users)

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : '/noavatar.png'}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <div className={styles.title}>Author</div>
        <div className={styles.username}>{user.username}</div>
      </div>
    </div>
  );
};

export default PostUser;
