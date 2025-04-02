import { Link, NavLink, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "~/store";

const Layout = () => {
  const user = useSelector((state: RootState) => state.user.value);
  return (
    <>
      {!user ? (
        <h1 className="text-center mt-10 text-2xl">You need to log in your account first</h1>
      ) : (
        <div>
          <nav className="bg-gray-200 h-13 flex flex-row justify-around items-center">
            <NavLink
              to="friend/index"
              className={({ isActive }) => (isActive ? "text-blue-700" : "text-gray-500")}
            >
              friend list
            </NavLink>
            <NavLink
              to="friend/find"
              className={({ isActive }) => (isActive ? "text-blue-700" : "text-gray-500")}
            >
              find users
            </NavLink>
            <NavLink
              to="friend/requests"
              className={({ isActive }) => (isActive ? "text-blue-700" : "text-gray-500")}
            >
              requests
            </NavLink>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Layout;
