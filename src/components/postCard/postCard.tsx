"use client";
import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";
import { deleteBlog } from "@/lib/services";
import { Confirm } from "react-st-modal";
import EditForm from "../editForm/EditForm";

const PostCard = ({ post }: any) => {
  const deleteOneBlog = async (id: any, title: any) => {
    const result = await Confirm(
      `Are you sure to delete ${title}`,
      "Deleting Blog"
    );

    if (result) {
      deleteBlog(id);
    } else {
      // Сonfirmation not confirmed
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image src={post.img} alt="" fill className={styles.img} />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <span className={styles.date}>
          {post.createdAt.toString().slice(0, 10)}
        </span>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
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
    </div>
  );
};

export default PostCard;
