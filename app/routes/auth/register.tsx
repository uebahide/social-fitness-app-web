import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "~/store";
import { updateToken } from "../../../slices/tokenSlice";
import { updateUser } from "../../../slices/userSlice";
import type { errorsType } from "../../../types/errors";
import { useNavigate } from "react-router";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name: string[];
    email: string[];
    password: string[];
  } | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.value);
  const userFetchStatus = useSelector((state: RootState) => state.user.status);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`/api/register`, {
      method: "post",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      }),
    });

    const data = await res.json();

    if (data.errors) {
      console.log(data.errors);
      setErrors(data.errors);
    } else {
      const token = data.token;
      const user = data.user;
      localStorage.setItem("token", token);
      dispatch(updateToken(token));
      dispatch(updateUser(user));
      navigate("/");
    }
  };

  return (
    <>
      {userFetchStatus === "pending" ? (
        <></>
      ) : user ? (
        <h1 className="text-center mt-10 text-2xl">You are already logged in.</h1>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold mt-5">Register a new account</h1>
          <form onSubmit={handleRegister} className="flex flex-col space-y-10 items-center mt-5">
            <div className="w-full text-center">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <br />
              <span className="text-red-400">{errors?.name}</span>
            </div>
            <div className="w-full text-center flex-col">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <br />
              <span className="text-red-400">{errors?.email}</span>
            </div>
            <div className="w-full text-center">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <br />
              <span className="text-red-400">{errors?.password}</span>
            </div>
            <div className="w-full text-center">
              <input
                name="confirm password"
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-500 w-1/2 py-2 rounded-md pl-1"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <div className="w-full text-center">
              <button
                type="submit"
                className="border-gray-500 w-1/2 py-2 rounded-md pl-1 bg-green-400 text-white"
              >
                Register
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};
export default Register;
