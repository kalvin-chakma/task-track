"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store";
import SignInForm from "./signInForm";
import SignInLeftPanel from "./signInLeftPanel";

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (formData: {
    email: string;
    password: string;
  }) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      });
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080808]">
      <SignInLeftPanel />
      <SignInForm loading={loading} error={error} onSubmit={handleSignIn} />
    </div>
  );
}
