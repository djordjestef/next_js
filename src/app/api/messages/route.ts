import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Messages } from "@/lib/models";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { message } = data;
    const messagePost = new Messages(message);

    await messagePost.save();

    return new Response(
      JSON.stringify({
        data: [],
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

export const PUT = async (req: NextRequest) => {
  try {
    await connectToDb();
    const data = await req.json();
    const { toID, seen } = data;
    console.log('data',data)
    await Messages.findByIdAndUpdate(toID, seen);
    // await Messages.updateMany(
    //   { messageId: { $in: messageIds }, toID: toID },
    //   { $set: { seen: true } }
    // );

    return new Response(
      JSON.stringify({
        success: true,
        data: null,
        error: null,
      }),

      {
        status: 204,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDb();
    const messages = await Messages.find();

    console.log("messages ROUTE", messages);

    return NextResponse.json(
      {
        success: true,
        message: "Messages",
        data: messages,
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
