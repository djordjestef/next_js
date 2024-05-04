import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const users = await User.find();
    return NextResponse.json(
      {
        sucess: true,
        message: "List Data Users",
        data: users,
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
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { id } = data;
    const deletedUser = await User.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({
        data: deletedUser,
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

export const POST = async (request: NextRequest) => {
  try {
    await connectToDb();
    const data = await request.json();
    const { formData } = data;
    const { username, email } = formData;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          error: "User with the same username or email has already exist",
        }),
        { status: 400 }
      );
    }

    const newUser = new User(formData);
    await newUser.save();
    return new Response(
      JSON.stringify({
        data: newUser,

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
