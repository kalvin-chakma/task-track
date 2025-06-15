"use client";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Task, TaskStatus } from "../types";

interface TaskBoardProps {
  onEditTask: (task: Task) => void;
  refreshTasks: () => Promise<void>;
}

interface ColumnTasks {
  [key: string]: Task[];
}

const TaskBoard = ({ onEditTask, refreshTasks }: TaskBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/tasks");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch tasks"
      );
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  // Listen for refreshTasks changes
  useEffect(() => {
    fetchTasks();
  }, [refreshTasks]);

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete task");
      }

      await refreshTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete task"
      );
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (result: DropResult) => {
    setIsDragging(false);

    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;

    const task = tasks.find((t) => t._id === draggableId);
    if (!task) return;

    // Optimistic update
    const updatedTask = {
      ...task,
      status: destination.droppableId as TaskStatus,
    };
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === draggableId ? updatedTask : t))
    );

    try {
      const response = await fetch(`/api/tasks/${draggableId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update task status"
      );
      // Revert optimistic update on error
    }
  };

  const columns: ColumnTasks = {
    TODO: tasks.filter((task) => task.status === "TODO"),
    IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
    COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">
          No tasks found. Create a new task to get started!
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 transition-opacity duration-200 ${
          isDragging ? "opacity-75" : "opacity-100"
        }`}
      >
        {Object.entries(columns).map(([status, columnTasks]) => (
          <div key={status} className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 capitalize text-center">
              {status.toLowerCase().replace("_", " ")}
            </h2>
            <Droppable droppableId={status}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`space-y-4 min-h-[200px] transition-colors duration-200 ${
                    snapshot.isDraggingOver ? "bg-gray-200" : ""
                  }`}
                >
                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id!}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white p-4 rounded-lg shadow transition-shadow duration-200 ${
                            snapshot.isDragging ? "shadow-lg" : ""
                          }`}
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-gray-600 text-sm mt-2">
                            {task.description}
                          </p>
                          <p className="text-gray-500 text-xs mt-2">
                            Due:{" "}
                            {format(new Date(task.dueDate), "MMM dd, yyyy")}
                          </p>
                          <div className="flex justify-end space-x-2 mt-4">
                            <button
                              onClick={() => onEditTask(task)}
                              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id!)}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
