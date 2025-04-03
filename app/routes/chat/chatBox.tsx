import { useParams } from "react-router";
import { useEffect, useState } from "react";
import FlatList from "flatlist-react";
import type { message } from "../../../types/message";
import { Message } from "../../../components/molecules/message";
import { BsFillSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import "../../../resources/js/echo";

export const ChatBox = () => {
  const { chat_id } = useParams();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const token = useSelector((state: RootState) => state.token.value);
  const user_id = useSelector((state: RootState) => state.user.value?.id);

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
      setMessages(data);
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
  }, [token, chat_id]);

  return (
    <div className="h-screen">
      <div className="text-center  bg-blue-500 h-13">{chat_id}</div>
      <div className="flex flex-col items-center h-full">
        <FlatList
          list={messages}
          renderItem={Message}
          renderWhenEmpty={() => <div>no messages</div>}
        />
        <div className="absolute bottom-10 flex flex-row w-full items-center justify-center space-x-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border w-1/4 h-10 rounded-md"
          />
          <button className="hover:cursor-pointer" onClick={handleSendMessage}>
            <BsFillSendFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
