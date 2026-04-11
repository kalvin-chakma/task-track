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
import { Task, TaskStatus } from "../../types";
import { useAuthStore } from "../../lib/store";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Calendar, GripVertical } from "lucide-react";
import Loading from "./loading";

interface TaskBoardProps {
  onEditTask: (task: Task) => void;
  refreshTasks: () => Promise<void>;
}

interface ColumnTasks {
  [key: string]: Task[];
}

const columnTitles = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const columnColors = {
  TODO: "border-blue-500",
  IN_PROGRESS: "border-yellow-500",
  COMPLETED: "border-green-500",
};

const TaskBoard = ({ onEditTask, refreshTasks }: TaskBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setTasks([]);
      setError("Please sign in to view tasks");
    } else {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const { isAuthenticated } = useAuthStore.getState();
      if (!isAuthenticated) {
        setError("Please sign in to view tasks");
        setTasks([]);
        return;
      }

      const response = await fetch("/api/tasks");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch tasks",
      );
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Re-fetch whenever refreshTasks reference changes (e.g. after create/edit)
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
      console.error(error);
      setError(
        error instanceof Error ? error.message : "Failed to delete task",
      );
    }
  };

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = async (result: DropResult) => {
    setIsDragging(false);
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;

    const prevTasks = [...tasks];
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    const updatedTask = {
      ...task,
      status: destination.droppableId as TaskStatus,
    };

    setTasks((prev) =>
      prev.map((t) => (t.id === draggableId ? updatedTask : t)),
    );

    try {
      const res = await fetch(`/api/tasks/${draggableId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update task status");
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to update task status",
      );
      setTasks(prevTasks);
    }
  };

  const columns: ColumnTasks = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    COMPLETED: tasks.filter((t) => t.status === "COMPLETED"),
  };

  if (loading)
    return (
      <div className="">
        <Loading />
      </div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!tasks.length) return <div className="text-center">No tasks found.</div>;

  return (
    <div className="mt-5">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.keys(columns).map((column) => (
            <Droppable droppableId={column} key={column}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Card
                    className={`border-t-4 ${columnColors[column as TaskStatus]} bg-card/50`}
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between">
                        {columnTitles[column as TaskStatus]}
                        <Badge>{columns[column as TaskStatus].length}</Badge>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {columns[column as TaskStatus].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id!}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="group bg-background rounded-lg border p-3"
                            >
                              <div className="relative mt-2 flex gap-2">
                                <div className="flex items-start gap-2">
                                  <div>
                                    <GripVertical className="text-muted-foreground mt-0.5 h-4 w-4 cursor-grab opacity-30 transition-opacity group-hover:opacity-100" />
                                  </div>

                                  <div className="flex-1 space-y-2">
                                    <p className="text-sm leading-tight font-medium">
                                      {task.title}
                                    </p>

                                    <div className="flex items-center justify-between">
                                      <div className="text-muted-foreground flex items-center gap-1 text-xs">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                          {format(
                                            new Date(task.dueDate),
                                            "MMM dd",
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="absolute right-0 bottom-0 flex gap-3">
                                  <div className="group/edit relative">
                                    <FaEdit
                                      onClick={() => onEditTask(task)}
                                      className="cursor-pointer transition-colors hover:text-green-500"
                                    />
                                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-zinc-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/edit:opacity-100">
                                      Edit
                                    </span>
                                  </div>

                                  <div className="group/delete relative">
                                    <FaTrash
                                      onClick={() => handleDeleteTask(task.id!)}
                                      className="cursor-pointer text-red-500 transition-colors hover:text-red-700"
                                    />
                                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-zinc-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/delete:opacity-100">
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </CardContent>
                  </Card>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
