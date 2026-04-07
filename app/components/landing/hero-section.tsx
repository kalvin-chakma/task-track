"use client";

import { Button } from "../ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Header from "./header";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Main heading */}
          <Header
            variant="hero"
            className="text-center"
            title={
              <>
                <span className="text-foreground">
                  The complete platform to{" "}
                </span>
                <span className="text-primary">track your tasks</span>
              </>
            }
            subtitle="Organize, prioritize, and complete your work with a beautiful Kanban board. Drag and drop tasks between columns as they progress from To Do to Completed."
          />

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>

          {/* Feature list */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Drag & Drop Interface</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
