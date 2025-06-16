import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Task from "@/app/models/Task";
import connectDB from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const { title, description, dueDate } = await req.json();

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
    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      dueDate: date,
      userId: decoded.userId,
      status: "TODO",
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    await connectDB();
    const tasks = await Task.find({ userId: decoded.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(Array.isArray(tasks) ? tasks : []);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 }
    );
  }
}
