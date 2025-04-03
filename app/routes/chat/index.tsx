import { useEffect } from "react";
import { useFriend } from "../../../hooks/useFriend";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";

export const Index = () => {
  const { fetchFriends, friends } = useFriend();
  const user_id = useSelector((state: RootState) => state.user.value?.id);

  const generateChatId = (friend_id: number) => {
    if (user_id) {
      return user_id < friend_id ? `chat.${user_id}_${friend_id}` : `chat.${friend_id}_${user_id}`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-2 mt-5 flex flex-col">
        {friends.length > 0 &&
          friends.map((friend) => (
            <Link
              to={`../../chat/${generateChatId(friend.id)}`}
              key={friend.id}
              className="border rounded-full px-2 hover:cursor-pointer"
            >
              {friend.name}
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Index;
