import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Task from "@/app/models/Task";
import connectDB from "@/app/lib/db";

// PUT: Update a task
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const { title, description, dueDate, status } = await req.json();
    const params = await context.params; // Await params here
    await connectDB();

    const task = await Task.findOneAndUpdate(
      { _id: params.id, userId: decoded.userId }, // Use awaited params
      { title, description, dueDate, status },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}

// DELETE: Delete a task
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const params = await context.params; // Await params here
    await connectDB();

    const task = await Task.findOneAndDelete({
      _id: params.id, // Use awaited params
      userId: decoded.userId,
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}