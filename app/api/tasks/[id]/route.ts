import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Task from "@/app/models/Task";
import connectDB from "@/app/lib/db";
import mongoose from "mongoose";

// PUT: Update a task
export async function PUT(
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

    const { title, description, dueDate, status } = await req.json();
    const params = await context.params;

    // Validate required fields
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!description?.trim()) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }
    if (!dueDate) {
      return NextResponse.json(
        { error: "Due date is required" },
        { status: 400 }
      );
    }

    // Validate date format
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    const task = await Task.findOneAndUpdate(
      { _id: params.id, userId: decoded.userId },
      {
        title: title.trim(),
        description: description.trim(),
        dueDate: date,
        status,
      },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    if (error instanceof mongoose.Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
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
