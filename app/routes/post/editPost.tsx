import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { usePost } from "../../../hooks/usePost";

const EditPost = () => {
  const { post_id } = useParams();
  const user = useSelector((state: RootState) => state.user.value);
  const userFetchStatus = useSelector((state: RootState) => state.user.status);
  const {
    title,
    amount,
    timeHour,
    timeMinute,
    errors,
    post,
    setTitle,
    setAmount,
    setTimeHour,
    setTimeMinute,
    fetchPost,
    handleUpdatePost,
    handleDeletePost,
  } = usePost();

  useEffect(() => {
    fetchPost(post_id ?? "");
  }, []);

  useEffect(() => {
    setTitle(post?.title ?? "");
    setAmount(post?.amount ?? "");
    setTimeHour(post?.time_hour.toString() ?? "");
    setTimeMinute(post?.time_minute.toString() ?? "");
  }, [post]);

  return (
    <div>
      <>
        {userFetchStatus === "pending" ? (
          <></>
        ) : !user ? (
          <h1 className="text-center mt-10 text-2xl">Not authorized</h1>
        ) : !post ? (
          <></>
        ) : user.id !== post.user_id ? (
          <h1 className="text-center mt-10 text-2xl">Not authorized</h1>
        ) : (
          <>
            <h1 className="text-center text-3xl font-bold mt-5">Update your post</h1>
            <form
              onSubmit={(e) => handleUpdatePost(e, post_id ?? "")}
              className="flex flex-col space-y-10 items-center mt-5"
            >
              <div className="w-full text-center">
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
                <br />
                <span className="text-red-400">{errors?.title}</span>
              </div>
              <div className="w-full text-center flex-col">
                <input
                  name="amount"
                  type="text"
                  placeholder="Amount (10km, 100 times, etc)"
                  className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  value={amount}
                />
                <br />
                <span className="text-red-400">{errors?.amount}</span>
              </div>
              <div className="w-full text-center">
                <input
                  name="time_hour"
                  type="number"
                  placeholder="Time Hour"
                  className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                  onChange={(e) => {
                    setTimeHour(e.target.value);
                  }}
                  value={timeHour}
                />
                <br />
                <span className="text-red-400">{errors?.time_hour}</span>
              </div>
              <div className="w-full text-center">
                <input
                  name="time_minute"
                  type="number"
                  placeholder="Time Minute"
                  className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                  onChange={(e) => {
                    setTimeMinute(e.target.value);
                  }}
                  value={timeMinute}
                />
                <br />
                <span className="text-red-400">{errors?.time_minute}</span>
              </div>
              <div className="w-1/2 text-center space-x-10">
                <button
                  type="submit"
                  className="border-gray-500 w-1/4 py-2 rounded-md pl-1 bg-green-400 text-white hover:cursor-pointer"
                >
                  Update Post
                </button>
                <button
                  type="button"
                  className="border-gray-500 w-1/4 py-2 rounded-md pl-1 bg-red-400 text-white text-center hover:cursor-pointer"
                  onClick={() => handleDeletePost(post_id ?? "")}
                >
                  Delete
                </button>
              </div>
            </form>
          </>
        )}
      </>
    </div>
  );
};

export default EditPost;
