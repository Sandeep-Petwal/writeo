/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingImage from "../../public/Loading.gif";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus !== authentication) {
      if (authentication) {
        navigate("/login");
      } else {
        navigate("/");
      }
    } else {
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="text-white w-full flex justify-center items-center my-24 p-10">
      <img src={LoadingImage} alt="Loading ..." className="size-44" />
    </div>
  ) : (
    <>{children}</>
  );
}
