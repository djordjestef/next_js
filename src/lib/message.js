const storeMessages = async (message) => {
  console.log("messages SERVICE", message);
  try {
    const res = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ message }),
    });

    return await res.json();
  } catch (error) {
    console.error("Failed to store messages:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
};

const updateMessage = async (message)=>{
  console.log('message',message)
  try {
    const res = fetch('http://localhost:3000/api/messages',{
      method:'PUT',
      cache: "no-cache",
      body: JSON.stringify(message),
    });
    return await res.json();
    
  } catch (error) {
    console.error("Failed to store messages:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
}

const getMessages = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/messages");
    return await res.json();
  } catch (error) {
    console.error("Failed to store messages:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Unknown error" } };
  }
};



module.exports = {
  storeMessages,
  getMessages,
  updateMessage
};
