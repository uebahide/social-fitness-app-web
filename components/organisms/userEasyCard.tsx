import { Link } from "react-router";
import type { user } from "../../types/user";
import type { FC } from "react";

type UserEasyCardProps = {
  user: user;
};

export const UserEasyCard: FC<UserEasyCardProps> = ({ user }) => {
  return (
    <Link
      to={`../../user/show/${user.id}`}
      key={user.id}
      className="flex flex-row items-center space-x-5 border-b pb-2"
    >
      <div className="flex bg-orange-400 rounded-full w-10 h-10 justify-center items-center text-white">
        {user.name[0].toUpperCase()}
      </div>
      <p className="text-xl font-bold">{user.name}</p>
    </Link>
  );
};
