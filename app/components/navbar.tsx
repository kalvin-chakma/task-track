"use client";
import React from "react";
import { FaPlus } from "react-icons/fa6";

interface NavbarProps {
  onCreateTask: () => void;
}

const Navbar = ({ onCreateTask }: NavbarProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
          Task Management
        </h1>
        <button
          onClick={onCreateTask}
          className="flex items-center gap-2 w-[20vh] px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <FaPlus />
          Create New Task
        </button>
      </div>
    </div>
  );
};

export default Navbar;
