import type { message } from "../../types/message";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import type { FC } from "react";

type MessageProps = {
  message: message;
};

export const Message: FC<MessageProps> = ({ message }) => {
  const user_id = useSelector((state: RootState) => state.user.value?.id);
  return (
    <div
      className={`flex my-5 ${message.user_id === user_id ? "justify-end mx-5" : "justify-start"}`}
    >
      <div className="flex">
        {message.user_id !== user_id && (
          <div className="flex bg-orange-400 rounded-full w-10 h-10 justify-center items-center text-white mx-1"></div>
        )}
        <div
          className={`border-1 p-1 rounded-md max-w-60 ${message.user_id === user_id && "bg-green-400"}`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
};
