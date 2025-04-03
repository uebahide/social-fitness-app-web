import { Link, Outlet, useNavigate } from "react-router";
import { type AppDispatch, type RootState, store } from "~/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateToken } from "../../slices/tokenSlice";
import { fetchUser, updateUser } from "../../slices/userSlice";
import axios from "axios";
import { SlActionUndo } from "react-icons/sl";

const Layout = () => {
  const token = useSelector((state: RootState) => state.token.value);
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log(token);
    const res = await axios
      .post(
        `/api/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        localStorage.removeItem("token");
        dispatch(updateToken());
        dispatch(updateUser(null));
        navigate("/");
      });
  };

  useEffect(() => {
    dispatch(updateToken());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-row justify-between px-10 py-10 bg-blue-800 items-center text-white">
        <div className="space-x-10">
          <Link to="/" className="">
            Home
          </Link>
          <Link to="friend/index" className="">
            Friend
          </Link>
          <Link to="chat/friends" className="">
            Chat
          </Link>
        </div>
        {user ? (
          <div className="space-x-10 flex flex-row">
            <div>Welcome back {user?.name}</div>
            <div className="hover:cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : (
          <div className="space-x-10">
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/register">Register</Link>
          </div>
        )}
      </div>
      <div
        className="rounded-full  w-13 h-13 flex flex-row justify-around items-center absolute right-5 hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <SlActionUndo className="text-4xl" />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
