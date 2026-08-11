import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const taskCreateSchema = z.object({
  boardId: z.string().uuid("Invalid board id"),
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(2000),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid due date"),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).default("TODO"),
});

export const taskUpdateSchema = taskCreateSchema.omit({ boardId: true });

export const boardRoleSchema = z.enum(["OWNER", "EDITOR", "VIEWER"]);

export const createBoardSchema = z.object({
  name: z.string().trim().min(1, "Board name is required").max(100),
});

export const updateBoardSchema = createBoardSchema;

export const addMemberSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  role: boardRoleSchema.default("EDITOR"),
});

export const updateMemberRoleSchema = z.object({
  role: boardRoleSchema,
});
