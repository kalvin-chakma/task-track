"use client";
import React, { useCallback, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";
import Navbar from "../components/navbar";

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
}

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [error, setError] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshTasks = useCallback(async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tasks");
      }
      const data = await response.json();
      setRefreshTrigger((prev) => prev + 1);
      return data;
    } catch (error) {
      console.error("Error refreshing tasks:", error);
      setError(
        error instanceof Error ? error.message : "Failed to refresh tasks"
      );
    }
  }, []);

  const handleCreateTask = async (task: Task) => {
    try {
      setError("");
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create task");
      }

      setShowForm(false);
      await refreshTasks();
    } catch (error) {
      console.error("Error creating task:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create task"
      );
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      setError("");
      if (!task._id) {
        throw new Error("Task ID is missing");
      }
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update task");
      }

      setEditingTask(undefined);
      await refreshTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update task"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Navbar onCreateTask={() => setShowForm(true)} />

          {error && (
            <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {(showForm || editingTask) && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
                <TaskForm
                  task={editingTask}
                  onSubmit={editingTask ? handleEditTask : handleCreateTask}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingTask(undefined);
                  }}
                />
              </div>
            </div>
          )}

          <TaskBoard
            onEditTask={setEditingTask}
            refreshTasks={refreshTasks}
            key={refreshTrigger}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
