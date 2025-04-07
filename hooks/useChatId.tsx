export const useChatId = () => {
  const generateChatId = (user_id: number, friend_id: number) => {
    if (user_id) {
      return user_id < friend_id ? `chat.${user_id}_${friend_id}` : `chat.${friend_id}_${user_id}`;
    } else {
      return "";
    }
  };

  return { generateChatId };
};
