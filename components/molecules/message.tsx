import type { message } from "../../types/message";

export const Message = (message: message, idx: any) => {
  return <div key={idx}>{message.text}</div>;
};
