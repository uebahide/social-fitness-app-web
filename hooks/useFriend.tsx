import { useState } from "react";
import type { user } from "../types/user";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";

export const useFriend = () => {
  const [friends, setFriends] = useState<user[]>([]);
  const [requesters, setRequesters] = useState<user[]>([]);
  const [friendRequestStatus, setFriendRequestStatus] = useState<string>("");
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

  return {
    fetchFriends,
    friends,
    fetchRequesters,
    requesters,
    fetchFriendRequestStatus,
    friendRequestStatus,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
  };
};
