import { ReactNode } from "react";

type HeaderProps = {
  className?: string;
  variant?: "hero" | "section" | "fancy";
  badge?: ReactNode;
  title: ReactNode;
  subtitle?: string;
  subtitleClass?: string;
};

export default function Header({
  className,
  variant = "section",
  badge,
  title,
  subtitle,
  subtitleClass,
}: HeaderProps) {
  return (
    <div className={className}>
      {/* Badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 ${
            variant === "fancy"
              ? "border border-primary/30 bg-primary/5"
              : "bg-primary/10 border border-primary/20"
          }`}
        >
          {badge}
        </div>
      )}

      {/* Title */}
      {variant === "hero" ? (
        <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
      ) : (
        <h2
          className={`leading-[1.1] mb-4 ${
            variant === "fancy"
              ? "text-5xl font-black text-white tracking-tight"
              : "text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white"
          }`}
        >
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`leading-relaxed ${subtitleClass ?? ""} ${
            variant === "hero"
              ? "mt-6 max-w-2xl mx-auto text-pretty text-lg text-muted-foreground md:text-xl leading-8"
              : variant === "fancy"
                ? "text-[#555] text-base max-w-xl"
                : "text-gray-600 dark:text-gray-400 text-base max-w-sm"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
