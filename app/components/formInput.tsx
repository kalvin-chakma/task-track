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
        className="block text-sm font-medium text-gray-900 dark:text-foreground"
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
          className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm ${
            isPassword ? "pr-10" : ""
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-muted-foreground hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
