import { User } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  try {
    await connectToDb();
    const user = await User.findById(id);

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
    return { error: "Something went wrong" };
  }
};
