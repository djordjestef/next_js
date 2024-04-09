import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";
const PostCard = ({post}:any) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image src="https://images.pexels.com/photos/19251205/pexels-photo-19251205/free-photo-of-a-cup-of-coffee-sits-on-a-table-next-to-a-pair-of-earbuds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" fill className={styles.img} />
        </div>
        <span className={styles.date}>1.1.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.id}`}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
