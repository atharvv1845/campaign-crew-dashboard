
import { cn } from "@/lib/utils";

interface GlowProps {
  variant?: "below" | "above";
  className?: string;
}

export function Glow({ variant = "below", className }: GlowProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        variant === "above" && "z-10",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute right-1/2 -translate-y-1/2 translate-x-1/2 transform-gpu",
          variant === "above" ? "top-1/4" : "top-3/4"
        )}
      >
        <div
          className={cn(
            "h-[40rem] w-[60rem] bg-gradient-to-r",
            variant === "above"
              ? "from-primary/20 via-primary/5 to-primary/20"
              : "from-primary/10 via-primary/5 to-primary/10"
          )}
          style={{
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />
      </div>
    </div>
  );
}
