import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getBlog } from "@/lib/services";
// import { getPost } from "@/lib/data";

const SinglePostPage = async ({ params }: any) => {
  const { slug } = params;

  // FETCH DATA WITH AN API
  const post = await getBlog(slug);
  console.log('post',post)
  // const post: any = await getPost(slug);
  // console.log("post", post);

  return (
    <div className={styles.container}>
      {post?.img! && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post?.userId} />
            </Suspense>
          )}

          <div className={styles.detailText}>
            <div className={styles.detailTitle}>Published</div>
            <div className={styles.detailValue}>
              {post?.createdAt.toString().slice(4, 16)}
            </div>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
      
    </div>
  );
};

export default SinglePostPage;
