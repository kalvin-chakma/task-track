import Link from "next/link";
import { CheckSquare } from "lucide-react";
import AppLogo from "../logo";

export function Footer() {
  return (
    <footer className="border-border border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}

          <AppLogo />

          {/* Links */}
          <div className="text-muted-foreground flex items-center gap-6 text-sm">
            <Link
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/signin"
              className="hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="hover:text-foreground transition-colors"
            >
              signup
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Task-Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
