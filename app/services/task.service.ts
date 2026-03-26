import { prisma } from "@/app/lib/prisma";

const Task = {
  async create({
    title,
    description,
    dueDate,
    userId,
    status,
  }: {
    title: string;
    description: string;
    dueDate: Date;
    userId: string;
    status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  }) {
    return prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        status,
        userId,
      },
    });
  },

  async find(filter: { userId?: string }) {
    if (!filter.userId) return [];

    return prisma.task.findMany({
      where: { userId: filter.userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async findOneAndUpdate(
    filter: { id: string; userId: string },
    update: {
      title: string;
      description: string;
      dueDate: Date;
      status: "TODO" | "IN_PROGRESS" | "COMPLETED";
    }
  ) {
    return prisma.task.updateMany({
      where: {
        id: filter.id,
        userId: filter.userId,
      },
      data: update,
    });
  },

  async findOneAndDelete(filter: { id: string; userId: string }) {
    return prisma.task.deleteMany({
      where: {
        id: filter.id,
        userId: filter.userId,
      },
    });
  },
};

export default Task;
