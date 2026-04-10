import { LayoutDashboard } from "lucide-react";

interface AppLogoProps {
  className?: string;
}

export default function AppLogo({ className = "" }: AppLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
        <LayoutDashboard className="w-5 h-5 text-white" />
      </div>
      <span className="text-gray-900 dark:text-white font-bold text-lg tracking-tight">
        Task<span className="text-primary">Tracker</span>
      </span>
    </div>
  );
}
