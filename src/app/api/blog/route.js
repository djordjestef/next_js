import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async (req) => {
  try {
    await connectToDb();
    const posts = await Post.find();
    return NextResponse.json(posts, { status: 200 });
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
        data: { ...newPost, custom: "custom id" },
        error: null,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

export const DELETE = async (request) => {
  try {
    const req = await request.json();
    const { id } = req;

    await connectToDb()
    await Post.findByIdAndDelete(id)
    revalidatePath("/blog")

    return new Response(
      JSON.stringify({
        data: "",
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
