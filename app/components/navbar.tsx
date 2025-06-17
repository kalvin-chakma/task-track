"use client";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "../lib/store";
import Link from "next/link";

interface NavbarProps {
  onCreateTask: () => void;
}

const Navbar = ({ onCreateTask }: NavbarProps) => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
          Task Management
        </h1>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={onCreateTask}
                className="flex items-center gap-2 w-[20vh] px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <FaPlus />
                Create New Task
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none  transition-colors">
                  <FaUser />
                  <span>{user?.name || "Profile"}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="">
              <Link
                href="/signin"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 "
              >
                <FaUser />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
