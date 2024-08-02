import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import logo from "/Blog.png"
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import LoadingImage from "../../public/Loading.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showpass, toggleShowpass] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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

  const handleLogin = async (data) => {
    setError("");
    if (isSubmitting) {
      return;
    }
    console.log("submitting the form....");

    try {
      const result = await authService.login(data);
      if (result && result.error) {
        showErrorToast(result.error);
      } else if (result) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log("dispatching userData from login, ", userData);
          dispatch(login(userData));
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
          <div className="">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: { value: true, message: "Please enter email !" },
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <p className=" text-red-600 font-semibold text-center mt-0">
              {errors.email?.message}
            </p>
            <Input
              label="Password: "
              type={showpass ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Please enter password !" },
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
            <Button type="submit" className="w-full flex justify-center">
              {isSubmitting ? (
                <img src={LoadingImage} alt="Loading..." className="size-5" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
