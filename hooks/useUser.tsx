import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { useState } from "react";
import type { user } from "../types/user";

export const useUser = () => {
  const [fetchedUserById, setFetchedUserById] = useState<user | null>(null);
  const [users, setUsers] = useState<user[]>([]);
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

  return { users, fetchUsersByName, fetchUserById, fetchedUserById };
};
