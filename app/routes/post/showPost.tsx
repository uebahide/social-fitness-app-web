import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { post } from "../../../types/post";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";

const ShowPost = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState<post | null>(null);
  const token = useSelector((state: RootState) => state.token.value);
  const userFetchStatus = useSelector((state: RootState) => state.user.status);
  const user = useSelector((state: RootState) => state.user.value);

  const fetchPost = async () => {
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

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {userFetchStatus === "pending" ? (
        <></>
      ) : !user ? (
        <h1 className="text-center mt-10 text-2xl">You need to log in your account first</h1>
      ) : (
        <div className="flex justify-center flex-col items-center mt-10 space-y-3">
          <div className="border w-1/2 rounded-md text-center py-2">
            <p>{post?.created_at}</p>
            <p className="mb-2 underline">{post?.title}</p>
            <p>{post?.amount}</p>
            <p>{post?.time_hour} hour</p>
            <p>{post?.time_minute} minutes</p>
          </div>
          {user ? (
            <div className="flex w-1/2 justify-center space-x-10">
              <Link
                to={`/post/edit/${post_id}`}
                className="border-gray-500 w-1/4 py-2 rounded-md pl-1 bg-green-400 text-white text-center"
              >
                Edit
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ShowPost;
