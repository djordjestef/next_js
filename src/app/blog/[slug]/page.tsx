import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getBlog } from "@/lib/services";
// import { getPost } from "@/lib/data";

const SinglePostPage = async ({ params }: any) => {
  const { slug } = params;

  const post = await getBlog(slug);

  return (
    <div className={styles.container}>
      {post?.data?.img! && (
        <div className={styles.imgContainer}>
          <Image src={post?.data?.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.data?.title}</h1>
        <div className={styles.detail}>
          {/* {post.data && ( */}
            <Suspense fallback={<div>Loading.........</div>}>
              <PostUser userId={post?.data.userId} />
            </Suspense>
          {/* )} */}

          <div className={styles.detailText}>
            <div className={styles.detailTitle}>Published</div>
            <div className={styles.detailValue}>
              {post?.data?.createdAt.toString().slice(4, 16)}
            </div>
          </div>
        </div>
        <div className={styles.content}>{post?.data?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
