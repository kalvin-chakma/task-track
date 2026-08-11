"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import TaskForm from "../components/tasks/TaskForm";
import TaskBoard from "../components/tasks/TaskBoard";
import { Navbar } from "../components/landing/navbar";
import { Task, Board } from "../types";

const HomeClient = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [error, setError] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [boardId, setBoardId] = useState<string | null>(null);
  const [boardsLoading, setBoardsLoading] = useState(true);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await fetch("/api/boards");
        if (!response.ok) throw new Error("Failed to load boards");
        const boards: Board[] = await response.json();
        setBoardId(boards[0]?.id ?? null);
      } catch (err) {
        console.error("Error loading boards:", err);
        setError("Failed to load your boards");
      } finally {
        setBoardsLoading(false);
      }
    };
    loadBoards();
  }, []);

  const refreshTasks = useCallback(async () => {
    if (!boardId) return;
    try {
      const response = await fetch(`/api/tasks?boardId=${boardId}`);
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
  }, [boardId]);

  const handleCreateTask = async (task: Task) => {
    if (!boardId) return;
    try {
      setError("");
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, boardId }),
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

          {!boardsLoading && !boardId ? (
            <div className="text-muted-foreground mt-5 text-center">
              No board found for your account.
            </div>
          ) : (
            <TaskBoard
              boardId={boardId}
              onEditTask={setEditingTask}
              refreshTasks={refreshTasks}
              key={refreshTrigger}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
