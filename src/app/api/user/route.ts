import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.log("error", error);
  }
};

export const DELETE = async (req:NextRequest, res:NextResponse)=>{
  try {
    await connectToDb()
    const data = await req.json();
    console.log('data',data)
  } catch (error) {
    
  }
}
