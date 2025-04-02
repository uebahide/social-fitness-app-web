import { useEffect, useState } from "react";
import type { user } from "../../../types/user";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { Link } from "react-router";

const Requests = () => {
  const [requesters, setRequesters] = useState<user[]>([]);
  const token = useSelector((state: RootState) => state.token.value);

  const fetchRequesters = async () => {
    const res = await fetch(`/api/requesters`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      setRequesters(data);
    }
  };

  useEffect(() => {
    fetchRequesters();
  }, [token]);

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-2 mt-5 flex flex-col">
        {requesters.length > 0 &&
          requesters.map((requester) => (
            <Link
              to={`../../user/show/${requester.id}`}
              key={requester.id}
              className="border rounded-full px-2 hover:cursor-pointer"
            >
              {requester.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Requests;
