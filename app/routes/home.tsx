import type { Route } from "./+types/home";
import { Link, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { useEffect, useState } from "react";
import type { post } from "../../types/post";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const user = useSelector((state: RootState) => state.user.value);
  const token = useSelector((state: RootState) => state.token.value);
  const [posts, setPosts] = useState<post[]>([]);

  const fetchMyPosts = async () => {
    const res = await axios.get<post[]>("api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts(res.data);
  };

  useEffect(() => {
    token ? fetchMyPosts() : setPosts([]);
  }, [token]);

  return (
    <div>
      {!user ? (
        <h1 className="text-center mt-10 text-2xl">
          Create your account first and post your exercise!
        </h1>
      ) : posts.length == 0 ? (
        <h1 className="text-center mt-10 text-2xl">no post yet</h1>
      ) : (
        <>
          <h1 className="text-center mt-10 text-2xl">Your posts</h1>
          <div className="flex justify-center flex-col items-center mt-10 space-y-3">
            {posts.map((post) => (
              <Link
                to={`/post/show/${post.id}`}
                key={post.id}
                className="border w-1/2 rounded-md text-center py-2 hover:cursor-pointer"
              >
                <p>{post.created_at}</p>
                <p className="mb-2 underline">{post.title}</p>
                <p>{post.amount}</p>
                <p>{post.time_hour} hour</p>
                <p>{post.time_minute} minutes</p>
              </Link>
            ))}
          </div>
        </>
      )}
      {user && (
        <Link
          to="post/create"
          className="bg-gray-400 rounded-full h-[60px] w-[60px]
        text-white text-center text-5xl absolute bottom-10 right-10 hover:cursor-pointer"
        >
          +
        </Link>
      )}
    </div>
  );
}
