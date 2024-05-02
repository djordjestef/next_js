'use client'
import styles from "./adminUsers.module.css";
import Image from "next/image";

const AdminUsers =  ({ userId, users }:any) => {

  console.log("users", users);
  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user: any) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.detail}>
            <Image
              src={user.img ? user.img : "/noavatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span className={user._id === userId ? `${styles.active}` : ""}>
              {user.username}
            </span>
          </div>
          {/* <form action={deleteUser}>
          <input type="hidden" name="id" value={user.id} />
          <button className={styles.userButton}>Delete</button>
        </form> */}
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
