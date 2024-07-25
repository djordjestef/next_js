import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Messages } from "@/lib/models";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDb();
    const data = await req.json();
    const {messages} = data
    console.log('messages',messages)

    const messagePost = new Messages(messages)

    await messagePost.save()

    return new Response(
        JSON.stringify({
            data:[],
            error:null
        }),
        {
            status:201
        }
    )


  } catch (error) {

    console.log('error',error)


  }
};
