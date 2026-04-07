"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/app/lib/store";
import { Spinner } from "@/app/components/ui/spinner";
import {
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  LayoutDashboard,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { PreviewSection } from "../components/landing/preview-section";
import Header from "../components/landing/header";

const recentActivity = [
  {
    user: "Sarah K.",
    action: "Completed",
    task: "Q4 Report Review",
    time: "2m ago",
    avatar: "SK",
  },
  {
    user: "Marcus L.",
    action: "Moved",
    task: "API Integration",
    time: "5m ago",
    avatar: "ML",
  },
  {
    user: "Priya S.",
    action: "Created",
    task: "Design System v2",
    time: "12m ago",
    avatar: "PS",
  },
  {
    user: "Tom W.",
    action: "Completed",
    task: "User Testing",
    time: "1h ago",
    avatar: "TW",
  },
];

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-violet-500/20 text-violet-400",
  "bg-amber-500/20 text-amber-400",
  "bg-rose-500/20 text-rose-400",
];

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      document.cookie = `token=${data.token}; path=/`;
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#080808]">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-4/7 relative flex-col overflow-hidden p-8">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[140%] h-[60%] bg-primary/5"
            style={{ transform: "skewY(-8deg)", transformOrigin: "top left" }}
          />
          <div
            className="absolute top-[30%] -left-32 w-[140%] h-2 bg-primary/20"
            style={{ transform: "skewY(-8deg)" }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #23BA7D 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Glows */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px]" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-[#080808]" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Task<span className="text-primary">Tracker</span>
            </span>
          </div>
          {/* Headline */}
          <Header
            className="mt-10"
            variant="fancy"
            title={
              <>
                Your taskboard is{" "}
                <span
                  style={{
                    WebkitTextStroke: "2px #23BA7D",
                    color: "transparent",
                  }}
                >
                  active
                </span>
                <br />
                right now.
              </>
            }
            subtitle=""
          />
          <PreviewSection className="py-0 md:py-0" />
          {/* Trust badges */}
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

      {/* ── RIGHT PANEL (Form) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 relative overflow-hidden bg-[#0d0d0d]">
        {/* Accents */}
        <div className="absolute bottom-0 right-0 w-400px h-400px bg-primary/4 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-[#080808]" />
            </div>
            <span className="font-bold text-white tracking-tight">
              Task<span className="text-primary">Tracker</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">
              Sign in to continue
            </p>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
              Welcome back.
            </h1>
            <p className="text-[#555] text-sm">
              No account yet?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Create one free →
              </Link>
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400 font-medium">{error}</p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-[#666] uppercase tracking-widest"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-[#444] text-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-[#666] uppercase tracking-widest"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-white/[0.04] border border-white/[0.08] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-white placeholder:text-[#444] text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/40 text-[#080808] font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group mt-2 text-sm"
              >
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-[#141414] text-[#444]">
                    New to TaskTracker?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <Link
                href="/signup"
                className="w-full block text-center px-4 py-3 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all text-[#888] hover:text-white font-medium text-sm"
              >
                Create Account
              </Link>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[#444] mt-6">
            By signing in, you agree to our{" "}
            <Link
              href="#"
              className="text-primary/70 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-primary/70 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
