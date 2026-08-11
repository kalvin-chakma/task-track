export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  boardId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export type BoardRole = "OWNER" | "EDITOR" | "VIEWER";

export interface Board {
  id: string;
  name: string;
  role: BoardRole;
  ownerId: string;
  createdAt?: string;
}

export interface TaskFormData {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}
