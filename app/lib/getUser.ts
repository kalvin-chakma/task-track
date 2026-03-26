import { verifyToken } from "./auth";

export function getUserFromToken(token: string) {
  try {
    const decoded = verifyToken(token) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}