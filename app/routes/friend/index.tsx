import { useEffect, useState } from "react";
import type { user } from "../../../types/user";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { Link } from "react-router";

const Friends = () => {
  const [friends, setFriends] = useState<user[]>([]);
  const token = useSelector((state: RootState) => state.token.value);

  const fetchFriends = async () => {
    const res = await fetch(`/api/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      setFriends(data);
    }
  };

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
