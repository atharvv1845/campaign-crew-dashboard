
import React from "react";
import { cn } from "@/lib/utils";

interface MockupProps {
  children: React.ReactNode;
  className?: string;
}

export function Mockup({ children, className }: MockupProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border bg-black shadow-xl",
        className
      )}
    >
      <div className="flex items-center justify-start border-b border-white/10 bg-black px-4 py-2.5">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-rose-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
