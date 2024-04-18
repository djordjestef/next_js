import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log("error", error);
    return { error: "Something went wrong" };
  }
};



// export async function POST(req, res) {
//   try {
//     connectToDb();

//     const data = await req.json();
//     const { formData } = data;
//     console.log("formData", formData);
//     const newBlog = new Blog({
//       title: formData.title,
//       desc: formData.desc,
//       slug: formData.slug,
//     });
//     console.log("newBlog", newBlog);

//     await newBlog.save();

//     //making response to browser(client) of this POST
//     return new Response(
//       JSON.stringify({ data: "return from our handler", error: null }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error("Error processing request:", error);
//     if (error instanceof Error)
//       return new Response(JSON.stringify({ error: error }));
//     return new Response(JSON.stringify({ error: "Unknown error" }));
//   }
// }

