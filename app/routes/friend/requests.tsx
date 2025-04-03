import { useEffect, useState } from "react";
import type { user } from "../../../types/user";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { Link } from "react-router";
import { useFriend } from "../../../hooks/useFriend";

const Requests = () => {
  const { fetchRequesters, requesters } = useFriend();
  const token = useSelector((state: RootState) => state.token.value);

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
