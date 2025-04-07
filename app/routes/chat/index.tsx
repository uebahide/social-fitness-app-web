import { useEffect } from "react";
import { useFriend } from "../../../hooks/useFriend";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { useChatId } from "../../../hooks/useChatId";

export const Index = () => {
  const { fetchFriends, friends } = useFriend();
  const user_id = useSelector((state: RootState) => state.user.value?.id);
  const token = useSelector((state: RootState) => state.token.value);
  const { generateChatId } = useChatId();

  useEffect(() => {
    fetchFriends();
  }, [token]);

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-2 mt-5 flex flex-col">
        {friends.length > 0 &&
          friends.map((friend) => (
            <Link
              to={`../../chat/${generateChatId(user_id ?? NaN, friend.id)}`}
              key={friend.id}
              className="flex flex-row space-x-10 border-b"
            >
              <div className="flex bg-orange-400 rounded-full w-10 h-10 justify-center items-center text-white">
                {friend.name[0].toUpperCase()}
              </div>
              <div>
                <p className="text-xl font-bold">{friend.name}</p>
                <p>Hello! Let's talk!</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default Index;
