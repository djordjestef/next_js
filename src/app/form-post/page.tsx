"use client"
import { postBlog } from "@/lib/services";

const FormPage = () => {
  const getFormData = async (event:any) => {
    event.preventDefault();
    const title = document.getElementById("title")?.value;
    const desc = document.getElementById("desc")?.value;
    const slug = document.getElementById("slug")?.value;
    const userId = document.getElementById("userId")?.value;
    const formData = {
      title,
      desc,
      slug,
      userId,
    };
    console.log("formData", formData);
    await postBlog(formData);
  };
  return (
    <div>
      <form action=''>
        <input type="text" placeholder="title" name="title" id="title" />
        <input type="text" placeholder="desc" name="desc" id="desc" />
        <input type="text" placeholder="slug" name="slug" id="slug" />
        <input type="text" placeholder="userId" name="userId" id="userId" />
        <button onClick={getFormData}>Create</button>
      </form>
    </div>
  );
};

export default FormPage;
