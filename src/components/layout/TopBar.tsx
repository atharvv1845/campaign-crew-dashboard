
import { UserButton } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  sidebarExpanded: boolean;
  title: string;
}

const TopBar = ({ sidebarExpanded, title }: TopBarProps) => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      sidebarExpanded ? "pl-64" : "pl-16"
    )}>
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
