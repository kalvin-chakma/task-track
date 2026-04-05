import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
          <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
            Ready to get organized?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Start tracking your tasks today with a free account. No credit card
            required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/signup">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/signin">Already have an account?</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
