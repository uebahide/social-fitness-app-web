import { Link, useParams } from "react-router";
import { useEffect } from "react";
import { useUser } from "../../../hooks/useUser";
import { useFriend } from "../../../hooks/useFriend";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";
import { useChatId } from "../../../hooks/useChatId";
import { usePost } from "../../../hooks/usePost";

const Show = () => {
  const { user_id } = useParams();
  const current_user_id = useSelector((state: RootState) => state.user.value?.id);
  const { generateChatId } = useChatId();
  const { fetchUserById, fetchedUserById } = useUser();
  const {
    fetchFriendRequestStatus,
    friendRequestStatus,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
  } = useFriend();
  const { friendPosts, fetchFriendPosts } = usePost();

  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {
    token && fetchUserById(user_id ?? "");
    token && fetchFriendRequestStatus(user_id ?? "");
    token && fetchFriendPosts(parseInt(user_id ?? ""));
    console.log(friendRequestStatus);
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center w-[50%] border-1 mt-12">
        <div className="w-full relative">
          <div className="h-40 bg-gray-400"></div>
          <div className="border-1 rounded-full w-30 h-30 bg-orange-400 absolute top-25 left-2 flex justify-center items-center text-white font-bold text-4xl">
            {fetchedUserById?.name[0].toUpperCase()}
          </div>
        </div>

        <div className="text-3xl mt-5">{fetchedUserById?.name}</div>
        <div className="mt-20 mb-5 flex flex-row w-[50%]">
          {friendRequestStatus === "pending" ? (
            <button className="border-gray-500 w-full p-2 rounded-md bg-green-400 text-white hover:cursor-pointer">
              Request sent
            </button>
          ) : friendRequestStatus === "accepted" ? (
            <>
              <button
                onClick={() => unfriend(user_id ?? "")}
                className="border-gray-500 w-full p-2 rounded-md bg-green-400 text-white hover:cursor-pointer"
              >
                unfriend
              </button>
              <Link
                to={`../../chat/${generateChatId(current_user_id ?? NaN, parseInt(user_id ?? ""))}`}
                className="border-gray-500 w-full p-2 rounded-md bg-blue-400 text-white hover:cursor-pointer text-center"
              >
                Chat
              </Link>
            </>
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
      {friendPosts.length !== 0 ? (
        <div className="mt-10 border-1 w-[50%] min-h-[300px]">
          {friendPosts.map((post) => (
            <div className="flex justify-center flex-col items-center mt-10 space-y-3">
              <div className="border w-1/2 rounded-md text-center py-2">
                <p>{post?.created_at}</p>
                <p className="mb-2 underline">{post?.title}</p>
                <p>{post?.amount}</p>
                <p>{post?.time_hour} hour</p>
                <p>{post?.time_minute} minutes</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10">No post</p>
      )}
    </div>
  );
};

export default Show;
