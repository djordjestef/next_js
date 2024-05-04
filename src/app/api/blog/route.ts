import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDb();
    const posts = await Post.find();
    return NextResponse.json(
      {
        sucess: true,
        message: "List Data Blogs",
        data: posts,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return { error: "Something went wrong" };
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
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
          error: "A blog post with the same title or slug has already exists",
        }),
        { status: 400 }
      );
    }

    const newPost = new Post(formData);

    await newPost.save();
    // revalidatePath("/blog");
    // revalidatePath("/admin");
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

export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { id } = data;

    await Post.findByIdAndDelete(id);
    // revalidatePath("/blog");
    // revalidatePath("/admin");

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

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDb();
    console.log("req", req);
    const data = await req.json();
    console.log("data", data);
    const { formData, postId } = data;
    const path = req.nextUrl.searchParams.get("path");

    console.log("path", path);

    await Post.findByIdAndUpdate(postId, formData);
    // revalidatePath(`/blog/${formData.slug}`);
    // revalidatePath(`/blog`);
    // revalidatePath("/admin");

    return NextResponse.json(
      {
        data: formData,
        error: null,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};
