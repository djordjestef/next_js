import { auth } from "@/lib/auth";
import ChatSocket from "@/components/chatSocket/Chat";
import { getUsers } from "@/lib/services";

const ChatPage = async () => {
  const session = await auth();
  const users = await getUsers();

  return (
    <div>
      <ChatSocket user={session?.user} users={users} />
    </div>
  );
};

export default ChatPage;
