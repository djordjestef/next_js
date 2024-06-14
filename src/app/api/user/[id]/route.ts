import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    await connectToDb();
    const user = await User.findById(id);
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
        success: true,
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
    return { error: "Something went wrong" };
  }
};
