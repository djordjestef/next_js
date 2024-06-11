import { auth } from "@/lib/auth";
import ChatSocket from "@/components/chatSocket/chatSocket";

const ChatPage = async () => {
  const session = await auth();
  console.log('session',session)

  return <div>
    <ChatSocket user={session?.user}/>
  </div>;
};

export default ChatPage;