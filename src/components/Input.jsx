/* eslint-disable react/prop-types */
import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label,disable=false, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
      <div className=" flex justify-between my-4 items-center">
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <br />
        <input
        disabled = {disable}
          type={type}
          className={`px-3 w-3/4 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
      </div>
  );
});

export default Input;
