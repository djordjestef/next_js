export const getBlogs = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return await res.json();
};

export const getBlog = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

  if (!res.ok) {
    throw new Error("Single Post Error");
  }
  return await res.json();
};

export async function postBlog(formData) {
  const url = "http://localhost:3000/api/blog";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ formData: formData }),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to generate blog:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
}

export const deleteBlog = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/api/blog", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to delete blog:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
};

export const updateBlog = async (formData, postId) => {
  try {
    const response = await fetch("http://localhost:3000/api/blog", {
      method: "PUT",
      cache:'no-cache',
      body: JSON.stringify({ formData, postId }),
    });



    console.log("AFTER BACKEND");
    return await response.json();
  } catch (error) {
    console.error("Failed to update blog:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
};

export const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/user");
  if (!res.ok) {
    throw new Error("Get UserS Error");
  }

  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`http://localhost:3000/api/user/${id}`);

  if (!res.ok) {
    throw new Error("Get User Error");
  }

  return res.json();
};
