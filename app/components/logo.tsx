import { LayoutDashboard } from "lucide-react";

interface AppLogoProps {
  className?: string;
}

export default function AppLogo({ className = "" }: AppLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-xl">
        <LayoutDashboard className="h-5 w-5 text-white" />
      </div>
      <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Task<span className="text-primary">Tracker</span>
      </span>
    </div>
  );
}
