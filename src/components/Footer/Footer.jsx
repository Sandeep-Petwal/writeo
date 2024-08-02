/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React from "react";
import { Logo } from "../index";

function Footer() {
  return (
    <footer className=" w-screen bg-white shadow dark:bg-[#522258]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center justify-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
           <Logo width="50px"/>
            <span className="font-serif self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Writeo
            </span>
          </a>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-white">
            <li>
              <a href="https://sandeepprasad.tech/" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="https://sandeepprasad.tech/" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className=" text-center my-6 border-gray-200 sm:mx-auto dark:border-white lg:my-8" />
        <span className="text-center block text-md text-gray-500 sm:text-center dark:text-white">
          © 2024 Made with ❤️ by 
          <a href="https://sandeepprasad.tech/" className="hover:underline">
            {" "} Sandeep Prasad
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
