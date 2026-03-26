import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

const User = {
  async findOne(filter: { email?: string; id?: string }) {
    if (filter.email) {
      return prisma.user.findUnique({
        where: { email: filter.email },
      });
    }
    if (filter.id) {
      return prisma.user.findUnique({
        where: { id: filter.id },
      });
    }
    return null;
  },

  async create({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  },

  async comparePassword(
    hashedPassword: string,
    candidatePassword: string
  ) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  },
};

export default User;
