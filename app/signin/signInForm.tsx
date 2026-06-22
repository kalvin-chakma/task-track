"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, LayoutDashboard } from "lucide-react";
import { Spinner } from "@/app/components/ui/spinner";
import FormInput from "@/app/components/formInput";
import { useState } from "react";

interface SignInFormProps {
  loading: boolean;
  error: string;
  onSubmit: (formData: { email: string; password: string }) => void;
}

export default function SignInForm({
  loading,
  error,
  onSubmit,
}: SignInFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  return (
    <div className="dark:bg-background relative flex flex-1 items-center justify-center overflow-hidden bg-gray-50 px-6 py-12 sm:px-10 lg:px-16">
      <div className="relative z-10 w-full max-w-md">
        {/* Mobile Logo */}
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <LayoutDashboard className="h-4 w-4 text-[#080808]" />
          </div>
          <span className="font-bold tracking-tight text-white">
            Task<span className="text-primary">Tracker</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <p className="text-primary mb-3 text-xs font-semibold tracking-widest uppercase">
            Sign in to continue
          </p>
          <h1 className="dark:text-foreground mb-1.5 text-3xl font-bold text-gray-900">
            Welcome back.
          </h1>
          <p className="text-sm text-[#555]">
            No account yet?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Create one free →
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="dark:bg-card dark:border-border rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-black/5">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
            {error && (
              <div className="animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 duration-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <p className="text-sm font-medium text-red-400">{error}</p>
              </div>
            )}

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="name@example.com"
              autoComplete="email"
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-widest text-[#666] uppercase">
                  Password
                </span>
                <Link
                  href="/forgot-password"
                  className="text-primary text-xs hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FormInput
                id="password"
                label=""
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200"
            >
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Divider & Sign Up Link */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/6" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="dark:bg-card px-3 text-[#444]">
                  New to TaskTracker?
                </span>
              </div>
            </div>

            <Link
              href="/signup"
              className="block w-full rounded-lg border border-zinc-300 px-4 py-3 text-center text-sm font-medium text-[#888] transition-all hover:bg-zinc-200 hover:text-zinc-400 dark:border-white/8 dark:hover:border-white/12 dark:hover:bg-white/4 dark:hover:text-white"
            >
              Create Account
            </Link>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#444]">
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
  );
}
