import React, { useState } from "react";
import { Logo } from "../../assets/Logo";
import { User } from "@nextui-org/react";
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      title: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
      link: "/",
    },
    {
      title: "Movies",
      icon: "",
      link: "/movies",
    },
    {
      title: "Cinemas",
      icon: "",
      link: "/cinemas",
    },
    {
      title: "Showtimes",
      icon: "",
      link: "/showtimes",
    },
    {
      title: "Nhân viên",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
      link: "/employees",
    },
  ];

  return (
    <nav className="flex flex-col gap-4 p-8 w-full h-full border-r-1 border-slate-200">
      <div className="flex space-x-2 items-center pb-8">
        <Logo />
        <h3 className="font-bold text-xl">Cinema</h3>
      </div>
      <div>
        <User
          name="Admin"
          description="admin"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        {menus.map((menu, index) => (
          <button
            key={index}
            onClick={() => navigate(menu.link)}
            className={`flex items-center gap-2 p-3 rounded-lg w-full font-medium ${
              menu.link === location.pathname
                ? "bg-gray-100 text-foreground"
                : "hover:bg-gray-200 text-gray-500"
            }`}
          >
            {menu.icon}
            <span>{menu.title}</span>
          </button>
        ))}
      </div>
      <div className="justify-self-end">
        <a
          href=""
          className={`flex items-center gap-2 p-3 rounded-lg w-full font-medium hover:bg-gray-200 text-gray-500`}
        >
          Help & Information
        </a>
        <a
          href=""
          className={`flex items-center gap-2 p-3 rounded-lg w-full font-medium hover:bg-gray-200 text-gray-500`}
        >
          Log Out
        </a>
      </div>
    </nav>
  );
};
