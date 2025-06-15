"use client";
import React from "react";

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
          className="w-[20vh] px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Create New Task
        </button>
      </div>
    </div>
  );
};

export default Navbar;
