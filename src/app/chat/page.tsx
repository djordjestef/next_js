import { auth } from "@/lib/auth";

const ChatPage = async () => {
  const session = await auth();
  console.log('session',session)

  return <div>Chat</div>;
};

export default ChatPage;
