import { useParams } from "react-router";
import { type FC, useEffect, useState } from "react";
import type { message } from "../../../types/message";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import "../../../resources/js/echo";
import { Message } from "../../../components/molecules/message";
import { MessageInput } from "../../../components/molecules/messageInput";
import type { user } from "../../../types/user";

export const ChatBox = () => {
  const { chat_id } = useParams();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const token = useSelector((state: RootState) => state.token.value);
  const [friend, setFriend] = useState<user>([]);

  const connectWebSocket = () => {
    window.Echo.channel(chat_id).listen("GotMessage", async (e: any) => {
      // e.message
      console.log("got message");
      await getMessages();
    });
  };

  const handleSendMessage = async () => {
    const res = await fetch(`/api/message/${chat_id}`, {
      method: "post",
      body: JSON.stringify({
        text: message,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      setMessage("");
    }
  };

  const getMessages = async () => {
    const res = await fetch(`/api/messages/${chat_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      setMessages(data);
    }
    // setTimeout(window.scrollToBottom, 0);
  };

  useEffect(() => {
    token && getMessages();
    token && connectWebSocket();

    return () => {
      window.Echo.leave(chat_id);
    };
  }, [token]);

  return (
    <div>
      <div className="text-center  bg-blue-500 h-13">{chat_id}</div>
      <div className="flex flex-col items-center h-full">
        <div className="h-[650px] w-[50%] border-gray-500 border-1 overflow-auto">
          {messages.map((message) => (
            <Message message={message} key={message.id} />
          ))}
        </div>
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};
export default ChatBox;
