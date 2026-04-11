"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { CheckSquare, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/app/lib/store";
import { FaPlus, FaUser } from "react-icons/fa";
import AppLogo from "../logo";

interface NavbarProps {
  onCreateTask?: () => void;
}

export function Navbar({ onCreateTask }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const pathname = usePathname();

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isHomePage = pathname === "/";
  const isDashboard = pathname === "/home";

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <header className="border-border bg-background sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}

        <AppLogo />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {!isDashboard && (
            <>
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Features
              </Link>
              <Link
                href="#preview"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Preview
              </Link>
            </>
          )}
        </div>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </Button>

          {isAuthenticated ? (
            <>
              {!isHomePage && (
                <Button
                  size="sm"
                  onClick={onCreateTask}
                  className="flex items-center gap-2 bg-zinc-700 text-white/80 hover:bg-zinc-800"
                >
                  <FaPlus />
                  Create Task
                </Button>
              )}

              <div className="group relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-600"
                >
                  <FaUser />
                  {user?.name || "Profile"}
                </Button>

                <div className="bg-background border-border invisible absolute right-0 mt-2 w-40 rounded-md border opacity-0 shadow-md transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <button
                    onClick={handleLogout}
                    className="hover:bg-accent/10 w-full px-4 py-2 text-left text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-border bg-background border-t px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {!isDashboard && (
              <>
                <Link href="#features" onClick={() => setMobileMenuOpen(false)}>
                  Features
                </Link>
                <Link href="#preview" onClick={() => setMobileMenuOpen(false)}>
                  Preview
                </Link>
              </>
            )}

            <hr className="border-border" />
            <Button
              variant="outline"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </Button>

            {isAuthenticated ? (
              <>
                {!isHomePage && (
                  <Button onClick={onCreateTask}>
                    <FaPlus className="mr-2" />
                    Create Task
                  </Button>
                )}
                <Button variant="outline" onClick={handleLogout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
