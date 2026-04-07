import {
  LayoutDashboard,
  CheckCircle2,
  Kanban,
  Zap,
  Shield,
  Move,
} from "lucide-react";
import Header from "../components/landing/header";

const features = [
  {
    icon: Kanban,
    title: "Kanban Boards",
    desc: "Visualize your workflow with drag-and-drop task management.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    desc: "Changes sync instantly across all your devices.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    desc: "Your data is encrypted and protected at every layer.",
  },
  {
    icon: Move,
    title: "Drag & Drop",
    desc: "Easily move items around with intuitive drag-and-drop functionality.",
  },
];

export default function SignUpLeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-gray-100 dark:bg-[#0a0a0a] p-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[3rem_3rem]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 dark:bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 dark:bg-emerald-500/10 rounded-full blur-[80px]" />

      <div className="relative z-10 flex flex-col h-full text-gray-900 dark:text-foreground">
        <div className="flex items-center gap-3 mb-auto">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Task<span className="text-primary">Tracker</span>
          </span>
        </div>

        <Header
          className="mt-16 mb-10"
          variant="section"
          badge={
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium tracking-wide uppercase">
                Built for managing daily tasks easily
              </span>
            </>
          }
          title={
            <>
              The complete platform to{" "}
              <span className="text-primary">track your tasks</span>
            </>
          }
          subtitleClass="max-w-xl"
          subtitle="Organize, prioritize, and complete your work with a beautiful Kanban board. Drag and drop tasks as they progress."
        />

        <div className="grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-3 p-4 rounded-xl bg-white dark:bg-white/6 border border-gray-200 dark:border-white/6 hover:bg-gray-50 dark:hover:bg-white/6 transition-colors group"
            >
              <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white text-sm font-semibold mb-0.5">
                  {title}
                </p>
                <p className="text-gray-500 dark:text-[#666] text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-10 flex items-center gap-2 text-gray-500 dark:text-[#555] text-xs">
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
