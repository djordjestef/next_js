import { User } from "@/lib/models";
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToDb();
    const user = await User.findById(id);

    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return { error: "Something went wrong" };
  }
};
