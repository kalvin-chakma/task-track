"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

export default function FormInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = true,
  autoComplete = "off",
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="dark:text-foreground block text-sm font-medium text-gray-900"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder || (isPassword ? "••••••••" : "")}
          autoComplete={autoComplete}
          required={required}
          className={`dark:bg-secondary dark:border-border w-full rounded-lg border px-4 py-3 text-sm focus:outline-none ${
            isPassword ? "pr-10" : ""
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="dark:text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
