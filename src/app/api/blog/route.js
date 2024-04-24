import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async (req) => {
  try {
    await connectToDb();
    const posts = await Post.find();
    return new Response(
      JSON.stringify({
        posts,
        error: null,
      }),
      {
        status: 200,
      }
    );
    // return NextResponse.json(posts, { status: 200 });
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
    const { title, slug } = formData;
    const existingBlog = await Post.findOne({
      $or: [{ title }, { slug }],
    });

    if (existingBlog) {
      return new Response(
        JSON.stringify({
          error: "A blog post with the same title or slug already exists",
        }),
        { status: 400 }
      );
    }

    const newPost = new Post(formData);

    await newPost.save();

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

export const DELETE = async (req) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { id } = data;

    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");

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

export const PUT = async (req) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { formData, postId } = data;
    await Post.findByIdAndUpdate(postId, formData);
    revalidatePath(`/blog/${formData.slug}`);
    revalidatePath(`/blog`);

    return new Response(
      JSON.stringify({
        data: formData,
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
