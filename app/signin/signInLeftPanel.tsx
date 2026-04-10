import { LayoutDashboard, CheckCircle2 } from "lucide-react";
import Header from "../components/landing/header";
import { PreviewSection } from "../components/landing/preview-section";
import AppLogo from "../components/logo";

export default function SignInLeftPanel() {
  return (
    <div className="relative hidden flex-col overflow-hidden bg-gray-100 p-7 lg:flex lg:w-4/7 dark:bg-black">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="bg-primary/5 absolute -top-32 -left-32 h-[60%] w-[140%]"
          style={{ transform: "skewY(-8deg)", transformOrigin: "top left" }}
        />
        <div
          className="bg-primary/20 absolute top-[30%] -left-32 h-2 w-[140%]"
          style={{ transform: "skewY(-8deg)" }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #23BA7D 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glows */}
      <div className="bg-primary/10 dark:bg-primary/15 absolute top-0 left-0 h-64 w-64 rounded-full blur-[80px]" />
      <div className="bg-primary/8 dark:bg-primary/10 absolute right-0 bottom-1/3 h-48 w-48 rounded-full blur-[60px]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Logo */}
        <AppLogo className="mb-6" />

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
        />
        <PreviewSection className="py-0 md:py-0" />

        {/* Trust badges */}
        <div className="mt-auto flex items-center gap-2 pt-10 text-xs text-gray-500 dark:text-[#555]">
          <CheckCircle2 className="text-primary h-3.5 w-3.5" /> Secure
          Authentication
          <span className="mx-2">·</span>
          <CheckCircle2 className="text-primary h-3.5 w-3.5" /> Drag & Drop
          Interface
          <span className="mx-2">·</span>
          <CheckCircle2 className="text-primary h-3.5 w-3.5" /> Real-time
          Updates
        </div>
      </div>
    </div>
  );
}
