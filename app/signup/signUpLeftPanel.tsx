import { CheckCircle2, Kanban, Zap, Shield, Move } from "lucide-react";
import Header from "../components/landing/header";
import AppLogo from "../components/logo";

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
    <div className="relative hidden flex-col justify-between overflow-hidden bg-gray-100 p-7 lg:flex lg:w-1/2 dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-size-[3rem_3rem] dark:bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)]" />
      <div className="dark:bg-primary/20 absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/4 h-56 w-56 rounded-full blur-[80px] dark:bg-emerald-500/10" />

      <div className="dark:text-foreground relative z-10 flex h-full flex-col text-gray-900">
        <AppLogo className="mb-6" />

        <Header
          className="mt-16 mb-10"
          variant="section"
          badge={
            <>
              <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
              <span className="text-primary text-xs font-medium tracking-wide uppercase">
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
              className="group flex gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 dark:border-white/6 dark:bg-white/6 dark:hover:bg-white/6"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors">
                <Icon className="text-primary h-4 w-4" />
              </div>
              <div>
                <p className="mb-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                  {title}
                </p>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-[#666]">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

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
