"use client";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Task, TaskFormData } from "../types";

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

  useEffect(() => {
    if (task) {
      setFormData({
        _id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      });
    }
  }, [task]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate form data
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!formData.dueDate) {
      setError("Due date is required");
      return;
    }

    // Format the date to ISO string
    const formattedData: TaskFormData = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
    };

    onSubmit(formattedData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-4 p-4 bg-white rounded-lg shadow flex flex-col justify-between"
    >
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="space-y-3">
        <div>
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 ml-1"
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
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 ml-1"
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
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 ml-1"
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
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 ml-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
