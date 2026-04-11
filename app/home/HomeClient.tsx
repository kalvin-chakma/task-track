"use client";
import React, { Suspense, useCallback, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskBoard from "../components/tasks/TaskBoard";
import { Navbar } from "../components/landing/navbar";
import { Task } from "../types";

const HomeClient = () => {
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

      setRefreshTrigger((prev) => prev + 1);
      return await response.json();
    } catch (error) {
      console.error("Error refreshing tasks:", error);
      setError(
        error instanceof Error ? error.message : "Failed to refresh tasks",
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
        error instanceof Error ? error.message : "Failed to create task",
      );
    }
  };

  const handleEditTask = async (task: Task) => {
    try {
      setError("");
      if (!task.id) {
        throw new Error("Task ID is missing");
      }
      const response = await fetch(`/api/tasks/${task.id}`, {
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
        error instanceof Error ? error.message : "Failed to update task",
      );
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <Navbar onCreateTask={() => setShowForm(true)} />

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {(showForm || editingTask) && (
            <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-gray-500 p-4">
              <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg">
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

export default HomeClient;
