import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne(slug);
    return NextResponse.json(post);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to GET single POST");
  }
};
