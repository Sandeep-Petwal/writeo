import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import LoadingImage from "../../../public/Loading.gif";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    if (confirm("Logout ?")) {
      authService
        .logout()
        .then(() => {
          dispatch(logout());
          setLoading(false);
          Navigate("/")
        })
        .catch(() => {
          console.log("LogoutBtn :: Error while Logout");
        });
    }
  };
  return (
    <button
      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      onClick={logoutHandler}
    >
      {loading ? (
        <img src={LoadingImage} alt="Loading ..." className="size-5" />
      ) : (
        "Logout"
      )}
    </button>
  );
}

export default LogoutBtn;
