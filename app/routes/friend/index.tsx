import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { useFriend } from "../../../hooks/useFriend";
import { UserEasyCard } from "../../../components/organisms/userEasyCard";

const Friends = () => {
  const { fetchFriends, friends } = useFriend();
  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {
    fetchFriends();
  }, [token]);

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-2 mt-5 flex flex-col">
        {friends.length > 0 &&
          friends.map((friend) => <UserEasyCard key={friend.id} user={friend} />)}
      </div>
    </div>
  );
};

export default Friends;
