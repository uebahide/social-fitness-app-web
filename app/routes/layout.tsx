import { Link, Outlet } from "react-router";
import { type AppDispatch, type RootState, store } from "~/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateToken } from "../../slices/tokenSlice";
import { fetchUser, updateUser } from "../../slices/userSlice";
import axios from "axios";

const Layout = () => {
  const token = useSelector((state: RootState) => state.token.value);
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch<AppDispatch>();

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
      });
  };

  useEffect(() => {
    dispatch(updateToken());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-row justify-between px-10 py-10 bg-blue-800 items-center text-white">
        <div>
          <Link to="/" className="">
            Home
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
      <Outlet />
    </>
  );
};

export default Layout;
