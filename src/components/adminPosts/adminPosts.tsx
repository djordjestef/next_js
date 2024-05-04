"use client";
import styles from "./adminPosts.module.css";
import Image from "next/image";
import { deleteBlog } from "@/lib/services";
import { Confirm } from "react-st-modal";
import AdminEditForm from "../adminEditForm/adminEditForm";

const AdminPosts = ({ posts }: any) => {
  const deleteOneBlog = async (id: any, title: any) => {
    const result = await Confirm(
      `Are you sure to delete ${title}`,
      "Deleting Blog"
    );

    if (result) {
      await deleteBlog(id);
    } else {
      // Сonfirmation not confirmed
    }
  };

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts?.data.map((post: any) => (
        <div className={styles.post} key={post._id}>
          <div className={styles.detail}>
            <Image
              src={post.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          <div className={styles.btnHolder}>
            <AdminEditForm post={post} />
            <button
              className={styles.deleteBtn}
              onClick={() => deleteOneBlog(post._id, post.title)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
