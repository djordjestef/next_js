import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  const { slug } = params;
  try {
    await connectToDb();
    const post = await Post.findOne({ slug });
    return NextResponse.json(
      {
        success: true,
        message: "One Blog",
        data: post,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to GET single POST");
  }
};
