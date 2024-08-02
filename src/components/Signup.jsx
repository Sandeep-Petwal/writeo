/* eslint-disable no-unused-vars */
import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index.js";
import logo from "/Blog.png";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import LoadingImage from "../../public/Loading.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showpass, toggleShowpass] = useState(false);
  const handleShowPasswordChange = (event) => {
    toggleShowpass(event.target.checked);
  };

  // toast
  const showErrorToast = (sms) => {
    toast.error(sms, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // function to handle submit
  const create = async (data) => {
    setError("");

    try {
      const result = await authService.createAccount(data);
      if (result && result.error) {
        showErrorToast(result.error);
      } else if (result) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <ToastContainer />
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={logo} alt="Logo" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Please Enter your full name !",
                },
              })}
            />
            <p className=" text-red-600 text-center mt-2">
              {errors.name?.message}
            </p>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Please Enter your email !",
                },
              })}
            />
            <p className=" text-red-600 text-center mt-2">
              {errors.email?.message}
            </p>
            <Input
              label="Password: "
              type={showpass ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Please enter the password ",
                },
              })}
            />
            <input
              type="checkbox"
              name="show"
              id="show"
              checked={showpass}
              onChange={handleShowPasswordChange}
            />
            <label htmlFor="show" className="ml-2">
              Show password
            </label>
            <p className=" text-red-600 text-center mt-2">
              {errors.password?.message}
            </p>
            <Button type="submit" className="w-full flex justify-center">
              {isSubmitting ? (
                <img src={LoadingImage} alt="Loading..." className="size-5" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
