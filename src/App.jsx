/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Footer, Header } from "./components";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Outlet } from "react-router-dom";
import LoadingImage from "../public/Loading.gif";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);
  let userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // get current user from state if user is logedIn
    if (authStatus) {
      // setting userdata from getCurrentuser if not avialble in state
      if (userData == null) {
        authService
          .getCurrentUser()
          .then((userData) => {
            if (userData) {
              dispatch(login({ userData }));
            } else {
              dispatch(logout());
            }
          })
          .catch(() => {
            console.log(
              "App.jsx :: Something went wrong while loading .getCurrentUser"
            );
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      // get userdata from state here -
      setLoading(false);
    }
  }, []);

  return loading ? (
    // if it is loading
    <div className="text-white w-full flex justify-center items-center my-24 p-10">
      <img src={LoadingImage} alt="Loading ..." className="size-44" />
    </div>
  ) : (
    <div className="min-h-screen min-w-fit flex flex-col  flex-wrap justify-between bg-[#8C3061]">
      <Header />
      <main className="my-10 w-screen p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
