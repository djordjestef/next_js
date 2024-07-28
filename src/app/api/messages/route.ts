import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Messages } from "@/lib/models";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDb();
    const data = await req.json();
    const {message} = data
    console.log('messages',message)

    const messagePost = new Messages(message)

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
