import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromToken } from "@/app/lib/getUser";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = token ? getUserFromToken(token) : null;

  if (!userId) {
    redirect("/signin");
  }

  return <HomeClient />;
}
