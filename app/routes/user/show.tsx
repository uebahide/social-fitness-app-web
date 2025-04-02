import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import type { user } from "../../../types/user";
import { useEffect, useState } from "react";

const Show = () => {
  const { user_id } = useParams();
  const [friendRequestStatus, setFriendRequestStatus] = useState<string>("");
  const [fetchedUserById, setFetchedUserById] = useState<user | null>(null);
  const token = useSelector((state: RootState) => state.token.value);

  const fetchUserById = async (user_id: string) => {
    if (user_id) {
      const res = await fetch(`/api/users/${user_id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setFetchedUserById(data);
      if (data.errors) {
        console.log(data.errors);
      }
    } else {
      console.error("no user id was passed");
    }
  };

  const fetchFriendRequestStatus = async (user_id: string) => {
    const res = await fetch(`/api/friend/status/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setFriendRequestStatus(data.status);
  };

  const sendFriendRequest = async (user_id: string) => {
    const res = await fetch(`/api/friend/request/${user_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      await fetchFriendRequestStatus(user_id);
    }
  };
  useEffect(() => {
    token && fetchUserById(user_id ?? "");
    token && fetchFriendRequestStatus(user_id ?? "");
    console.log(friendRequestStatus);
  }, [token]);

  const acceptFriendRequest = async (user_id: string) => {
    const res = await fetch(`/api/friend/accept/${user_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      await fetchFriendRequestStatus(user_id);
    }
  };

  const rejectFriendRequest = async (user_id: string) => {
    const res = await fetch(`/api/friend/reject/${user_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      await fetchFriendRequestStatus(user_id);
    }
  };

  const unfriend = async (user_id: string) => {
    const res = await fetch(`/api/friend/unfriend/${user_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.errors) {
      console.log(data.errors);
    } else {
      await fetchFriendRequestStatus(user_id);
    }
  };

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
