import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useFriend } from "../../../hooks/useFriend";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";

const Show = () => {
  const { user_id } = useParams();
  const { fetchUserById, fetchedUserById } = useUser();
  const {
    fetchFriendRequestStatus,
    friendRequestStatus,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
  } = useFriend();

  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {
    token && fetchUserById(user_id ?? "");
    token && fetchFriendRequestStatus(user_id ?? "");
    console.log(friendRequestStatus);
  }, [token]);

  return (
    <div className="flex flex-col items-center w-full">
      <div>{fetchedUserById?.name}</div>
      <div>
        {friendRequestStatus === "pending" ? (
          <button className="border-gray-500 w-full p-2 rounded-md bg-green-400 text-white hover:cursor-pointer">
            Request sent
          </button>
        ) : friendRequestStatus === "accepted" ? (
          <button
            onClick={() => unfriend(user_id ?? "")}
            className="border-gray-500 w-full p-2 rounded-md bg-green-400 text-white hover:cursor-pointer"
          >
            unfriend
          </button>
        ) : friendRequestStatus === "accept?" ? (
          <>
            <button
              onClick={() => acceptFriendRequest(user_id ?? "")}
              className="border-gray-500 w-full p-2 rounded-md bg-green-400 text-white hover:cursor-pointer"
            >
              Accept request
            </button>
            <button
              onClick={() => rejectFriendRequest(user_id ?? "")}
              className="border-gray-500 w-full p-2 rounded-md bg-red-400 text-white hover:cursor-pointer"
            >
              Reject request
            </button>
          </>
        ) : (
          <button
            onClick={() => sendFriendRequest(user_id ?? "")}
            className="border-gray-500 w-full p-2 rounded-md bg-green-400 text-white hover:cursor-pointer"
          >
            send friend request
          </button>
        )}
      </div>
    </div>
  );
};

export default Show;
