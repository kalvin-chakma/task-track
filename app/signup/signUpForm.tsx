"use client";

import { useState } from "react";
import Link from "next/link";
import { Spinner } from "@/app/components/ui/spinner";
import { AlertCircle, ArrowRight } from "lucide-react";
import FormInput from "@/app/components/formInput";

interface SignUpFormProps {
  loading: boolean;
  error: string;
  onSubmit: (formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export default function SignUpForm({
  loading,
  error,
  onSubmit,
}: SignUpFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16 relative overflow-hidden bg-gray-50 dark:bg-background">
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
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
          >
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
  );
}
