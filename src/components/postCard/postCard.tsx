"use client";
import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";
import { deleteBlog } from "@/lib/services";
import { Confirm } from "react-st-modal";

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
            <button
              className={styles.deleteBtn}
              onClick={() => deleteOneBlog(post._id, post.title)}
            >
              X
            </button>
            <Image src={post.img} alt="" fill className={styles.img} />
          </div>
        )}
        <span className={styles.date}>
          {post.createdAt.toString().slice(4, 16)}
        </span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
