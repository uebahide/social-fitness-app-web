import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { useNavigate } from "react-router";
import type { post } from "../types/post";

export const usePost = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [timeHour, setTimeHour] = useState("");
  const [timeMinute, setTimeMinute] = useState("");
  const [errors, setErrors] = useState<{
    title: string[];
    amount: string[];
    time_hour: string[];
    time_minute: string[];
  } | null>(null);
  const [post, setPost] = useState<post | null>(null);
  const [friendPosts, setFriendPost] = useState<post[]>([]);
  const token = useSelector((state: RootState) => state.token.value);
  const navigate = useNavigate();

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify({
        title: title,
        amount: amount,
        time_hour: timeHour,
        time_minute: timeMinute,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      console.log(data.errors);
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  };

  const fetchPost = async (post_id: string) => {
    try {
      const res = await fetch(`/api/posts/${post_id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async (e: any, post_id: string) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post_id}`, {
      method: "put",
      body: JSON.stringify({
        title: title,
        amount: amount,
        time_hour: timeHour,
        time_minute: timeMinute,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate(-1);
    }
  };

  const handleDeletePost = async (post_id: string) => {
    try {
      const res = await fetch(`/api/posts/${post_id}`, {
        method: "delete",
        body: JSON.stringify({
          title: title,
          amount: amount,
          time_hour: timeHour,
          time_minute: timeMinute,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFriendPosts = async (friend_id: number) => {
    const res = await fetch(`/api/posts/friend/${friend_id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setFriendPost(data);
    }
  };

  return {
    title,
    amount,
    timeHour,
    timeMinute,
    errors,
    setTitle,
    setAmount,
    setTimeHour,
    setTimeMinute,
    setErrors,
    post,
    friendPosts,

    handleCreatePost,
    fetchPost,
    handleUpdatePost,
    handleDeletePost,
    fetchFriendPosts,
  };
};
