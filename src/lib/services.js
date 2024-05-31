export const getBlogs = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();

  return data;
};

export const getBlog = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

  if (!res.ok) {
    throw new Error("Single Post Error");
  }
  return await res.json();
};

export const createBlog = async (formData) => {
  const url = "http://localhost:3000/api/blog";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ formData: formData }),
      // next:{
      //   tags:['admin']
      // }
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to generate blog:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
};

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
      cache: "no-cache",
      body: JSON.stringify({ formData, postId }),
    });

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

  return await res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`http://localhost:3000/api/user/${id}`);

  if (!res.ok) {
    throw new Error("Get User Error");
  }

  console.log("PRETPOSLEDNJE")
  return await res.json();
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to delete user:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
};

export const createUser = async (formData) => {
  try {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ formData }),
    });
    return await res.json();
  } catch (error) {
    console.error("Failed to delete user:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
};
