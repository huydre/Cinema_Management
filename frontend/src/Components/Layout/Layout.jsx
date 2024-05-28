import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <div className=" min-h-screen md:flex">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div
        className={`w-full min-h-screen mx-0 bg-white transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
