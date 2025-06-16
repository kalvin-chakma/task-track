export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface TaskFormData {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}
