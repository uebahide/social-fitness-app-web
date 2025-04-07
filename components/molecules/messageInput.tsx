import { BsFillSendFill } from "react-icons/bs";
import type { ChangeEvent, FC } from "react";

type MessageInputProps = {
  message: string;
  setMessage: (s: string) => void;
  handleSendMessage: () => void;
};

export const MessageInput: FC<MessageInputProps> = ({ message, setMessage, handleSendMessage }) => {
  return (
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
  );
};
