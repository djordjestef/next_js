import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDb();
    const posts = await Post.find();

    // const djordje = new Response(
    //   JSON.stringify({
    //     data: posts,
    //     error: null,
    //   }),
    //   {
    //     status: 200,
    //   }
    // );

    // console.log('djordje',djordje)

    return NextResponse.json(posts);
  } catch (error) {
    console.log("error", error);
    return { error: "Something went wrong" };
  }
};

export const POST = async (req, res) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { formData } = data;
    console.log("formData", formData);

    const newPost = new Post(formData);

    await newPost.save();

    //making response to browser(client) of this POST
    return new Response(
      JSON.stringify({
        data: "data that i need to return to client",
        error: null,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};
