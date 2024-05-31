import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    await connectToDb();
    const user = await User.findById(id);
    console.log("user API", user);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return NextResponse.json(
      {
        sucess: true,
        message: "One User",
        data: user,
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
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message || "Unknown error",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // return { error: "Something went wrong" };
  }
};
