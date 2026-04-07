"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/lib/store";
import { Spinner } from "@/app/components/ui/spinner";
import {
  AlertCircle,
  CheckCircle2,
  Kanban,
  LayoutDashboard,
  ArrowRight,
  Zap,
  Shield,
  Move,
} from "lucide-react";
import TextInput from "@/app/components/formInput";
import PasswordInput from "@/app/components/formInput";
import FormInput from "@/app/components/formInput";
import Header from "../components/landing/header";

const features = [
  {
    icon: Kanban,
    title: "Kanban Boards",
    desc: "Visualize your workflow with drag-and-drop task management.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    desc: "Changes sync instantly across all your devices.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    desc: "Your data is encrypted and protected at every layer.",
  },
  {
    icon: Move,
    title: "Drag & Drop",
    desc: "Easily move items around with intuitive drag-and-drop functionality.",
  },
];

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
      });
      document.cookie = `token=${data.token}; path=/`;
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-background">
      {/* ---------------- LEFT PANEL ---------------- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-gray-100 dark:bg-[#0a0a0a] p-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[3rem_3rem]" />

        <div className="absolute top-1/4 left-1/4 w-72 h-72 dark:bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 dark:bg-emerald-500/10 rounded-full blur-[80px]" />

        <div className="relative z-10 flex flex-col h-full text-gray-900 dark:text-foreground">
          <div className="flex items-center gap-3 mb-auto">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Task<span className="text-primary">Tracker</span>
            </span>
          </div>

          <Header
            className="mt-16 mb-10"
            variant="section"
            badge={
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-primary font-medium tracking-wide uppercase">
                  Built for managing daily tasks easily
                </span>
              </>
            }
            title={
              <>
                The complete platform to{" "}
                <span className="text-primary">track your tasks</span>
              </>
            }
            subtitleClass="max-w-xl"
            subtitle="Organize, prioritize, and complete your work with a beautiful Kanban board. Drag and drop tasks as they progress."
          />

          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-3 p-4 rounded-xl bg-white dark:bg-white/6 border border-gray-200 dark:border-white/6 hover:bg-gray-50 dark:hover:bg-white/6 transition-colors group"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm font-semibold mb-0.5">
                    {title}
                  </p>
                  <p className="text-gray-500 dark:text-[#666] text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10 flex items-center gap-2 text-gray-500 dark:text-[#555] text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Secure
            Authentication
            <span className="mx-2">·</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Drag & Drop
            Interface
            <span className="mx-2">·</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Real-time
            Updates
          </div>
        </div>
      </div>

      {/* ---------------- RIGHT PANEL ---------------- */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 relative overflow-hidden bg-gray-50 dark:bg-background">
        <div className="absolute inset-0 bg-linear-to-br from-gray-50 dark:from-background via-gray-50 dark:via-background to-secondary/30 -z-10" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-1.5">
              Create your account
            </h1>
            <p className="text-gray-600 dark:text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-2xl p-8 shadow-xl shadow-black/5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 dark:bg-destructive/10 border border-red-200 dark:border-destructive/30 rounded-lg p-4 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 dark:text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-red-500 dark:text-destructive font-medium">
                    {error}
                  </p>
                </div>
              )}

              <FormInput
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="John Doe"
              />

              <FormInput
                id="email"
                label="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
              />

              <FormInput
                id="password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
              />

              <FormInput
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                type="password"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm mt-2"
              >
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-muted-foreground mt-6">
            By creating an account, you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
