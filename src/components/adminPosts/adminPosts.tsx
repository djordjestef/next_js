"use client";
import styles from "./adminPosts.module.css";
import Image from "next/image";
import { deleteBlog } from "@/lib/services";
import { Confirm } from "react-st-modal";
import EditForm from "../editForm/EditForm";

const AdminPosts = ({ posts }) => {
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

  console.log('posts',posts)

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts?.posts.map((post) => (
        <div className={styles.post} key={post.id}>
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
            <EditForm post={post} />
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
