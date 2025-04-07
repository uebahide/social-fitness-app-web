import { Link } from "react-router";
import type { user } from "../../types/user";
import type { FC } from "react";

type UserCardProps = {
  friend: user;
};

export const UserCard: FC<UserCardProps> = ({ friend }) => {
  return (
    <Link
      to={`../../user/show/${friend.id}`}
      key={friend.id}
      className="border rounded-full px-2 hover:cursor-pointer"
    >
      {friend.name}
    </Link>
  );
};
