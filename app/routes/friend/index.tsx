import { useEffect, useState } from "react";
import type { user } from "../../../types/user";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { Link } from "react-router";
import { useFriend } from "../../../hooks/useFriend";

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
          friends.map((friend) => (
            <Link
              to={`../../user/show/${friend.id}`}
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

export default Friends;
