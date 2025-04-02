import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "~/store";
import { useNavigate } from "react-router";
import { useState } from "react";
import { updateToken } from "../../../slices/tokenSlice";
import { updateUser } from "../../../slices/userSlice";

const CreatePost = () => {
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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.token.value);
  const user = useSelector((state: RootState) => state.user.value);
  const userFetchStatus = useSelector((state: RootState) => state.user.status);

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

  return (
    <>
      {userFetchStatus === "pending" ? (
        <></>
      ) : !user ? (
        <h1 className="text-center mt-10 text-2xl">You need to log in your account first</h1>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold mt-5">Create a new post!</h1>
          <form onSubmit={handleCreatePost} className="flex flex-col space-y-10 items-center mt-5">
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
            <div className="w-full text-center">
              <button
                type="submit"
                className="border-gray-500 w-1/2 py-2 rounded-md pl-1 bg-green-400 text-white"
              >
                Create Post
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreatePost;
