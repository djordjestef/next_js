"use client";
import { Confirm } from "react-st-modal";
import styles from "./adminUsers.module.css";
import Image from "next/image";
import { deleteUser } from "@/lib/services";

const AdminUsers = ({ userId, users }: any) => {
  const deleteOneUser = async (id: any, title: any) => {
    const result = await Confirm(
      `Are you sure to delete ${title}`,
      "Deleting Blog"
    );

    if (result) {
      await deleteUser(id);
    } else {
      // Сonfirmation not confirmed
    }
  };

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users?.data.map((user: any) => (
        <div className={styles.user} key={user._id}>
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
          <button
            className={styles.deleteBtn}
            onClick={() => deleteOneUser(user._id, user.username)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
