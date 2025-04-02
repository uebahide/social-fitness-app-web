import { useEffect, useState } from "react";
import type { user } from "../../../types/user";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { Link } from "react-router";

const Find = () => {
  const [prefix, setPrefix] = useState("");
  const [users, setUsers] = useState<user[]>([]);
  const token = useSelector((state: RootState) => state.token.value);

  const fetchUsersByName = async (prefix: string) => {
    const res = await fetch(`/api/users/search/${prefix}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsersByName(prefix);
  }, [prefix]);

  return (
    <div className="flex flex-col items-center">
      <input
        value={prefix}
        placeholder="enter a user name"
        onChange={(e) => setPrefix(e.target.value)}
        className="border border-gray-500 p-2 rounded-full w-1/2 mt-5"
      />
      {/*<button className="bg-gray-700 text-white rounded-full p-2">search</button>*/}
      <div className="space-y-2 mt-5 flex flex-col">
        {users.length > 0 &&
          users.map((user: user) => (
            <Link
              to={`../../user/show/${user.id}`}
              key={user.id}
              className="border rounded-full px-2 hover:cursor-pointer"
            >
              {user.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Find;
