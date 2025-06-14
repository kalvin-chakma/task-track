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
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface DragEndResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
  reason: "DROP" | "CANCEL";
}
