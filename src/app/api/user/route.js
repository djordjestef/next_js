import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.log("error", error);
  }
};
