import { LayoutDashboard, CheckCircle2 } from "lucide-react";
import Header from "../components/landing/header";
import { PreviewSection } from "../components/landing/preview-section";

export default function SignInLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-4/7 relative flex-col overflow-hidden p-8">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[140%] h-[60%] bg-primary/5"
          style={{ transform: "skewY(-8deg)", transformOrigin: "top left" }}
        />
        <div
          className="absolute top-[30%] -left-32 w-[140%] h-2 bg-primary/20"
          style={{ transform: "skewY(-8deg)" }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #23BA7D 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/15 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px]" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-[#080808]" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Task<span className="text-primary">Tracker</span>
          </span>
        </div>

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

        <div className="mt-auto pt-10 flex items-center gap-2 text-gray-500 text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Secure
          Authentication
          <span className="mx-2">·</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Drag & Drop
          Interface
          <span className="mx-2">·</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Real-time
          Updates
        </div>
      </div>
    </div>
  );
}
