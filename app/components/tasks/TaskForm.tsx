"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Task, TaskFormData } from "../../types";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: TaskFormData) => void;
  onCancel: () => void;
}

const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: "",
    status: "TODO",
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      });
    }
  }, [task]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate form data
    if (!formData.title.trim()) {
      setError("Title is required");
      setIsLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      setIsLoading(false);
      return;
    }
    if (!formData.dueDate) {
      setError("Due date is required");
      setIsLoading(false);
      return;
    }

    // Format the date to ISO string
    const formattedData: TaskFormData = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
    };

    try {
      await onSubmit(formattedData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const statusIcon = {
    TODO: <Clock className="h-4 w-4" />,
    IN_PROGRESS: <Clock className="h-4 w-4" />,
    COMPLETED: <CheckCircle2 className="h-4 w-4" />,
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
      <div className="bg-card ring-border space-y-6 rounded p-8 shadow-sm ring-1">
        {/* Header */}
        <div className="border-border border-b pb-6">
          <h2 className="text-foreground text-2xl font-semibold">
            {task ? "Update Task" : "Create New Task"}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            {task
              ? "Modify your task details below"
              : "Add a new task to get started"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-destructive/10 ring-destructive/20 flex items-start gap-3 rounded-lg p-4 ring-1">
            <AlertCircle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-foreground block text-sm font-semibold"
            >
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title..."
              className="border-border bg-input text-foreground placeholder:text-muted-foreground w-full rounded-lg border px-4 py-3 transition-all focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-foreground block text-sm font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your task in detail..."
              className="border-border bg-input text-foreground placeholder:text-muted-foreground w-full resize-none rounded-lg border px-4 py-3 transition-all focus:outline-none"
            />
          </div>

          {/* Due Date and Status Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Due Date */}
            <div className="space-y-2">
              <label
                htmlFor="dueDate"
                className="text-foreground block text-sm font-semibold"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="border-border bg-input text-foreground w-full rounded-lg border px-4 py-3 transition-all focus:outline-none"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label
                htmlFor="status"
                className="text-foreground block text-sm font-semibold"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border-border bg-input text-foreground w-full cursor-pointer appearance-none rounded-lg border px-4 py-3 transition-all focus:outline-none"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-border flex justify-end gap-3 border-t pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="border-border bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-primary/20 rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50 flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {task ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{task ? "Update Task" : "Create Task"}</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
