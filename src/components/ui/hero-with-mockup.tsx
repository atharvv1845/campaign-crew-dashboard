import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mockup } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { Github } from "lucide-react";
interface HeroWithMockupProps {
  title: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  mockupImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  className?: string;
}
export function HeroWithMockup({
  title,
  description,
  primaryCta = {
    text: "Get Started",
    href: "/get-started"
  },
  secondaryCta = {
    text: "GitHub",
    href: "https://github.com/your-repo",
    icon: <Github className="mr-2 h-4 w-4" />
  },
  mockupImage,
  className
}: HeroWithMockupProps) {
  return <section className={cn("relative bg-background text-foreground", "py-12 px-4 md:py-24 lg:py-32", "overflow-hidden", className)}>
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">
          {/* Heading */}
          <h1 className={cn("inline-block animate-appear", "bg-gradient-to-b from-white via-white/90 to-white/80", "bg-clip-text text-transparent", "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl", "leading-[1.1] sm:leading-[1.1]", "drop-shadow-sm")}>
            {title}
          </h1>

          {/* Description */}
          <p className={cn("max-w-[550px] animate-appear opacity-0 [animation-delay:150ms]", "text-base sm:text-lg md:text-xl", "text-muted-foreground", "font-medium")}>
            {description}
          </p>

          {/* CTAs */}
          <div className="relative z-10 flex flex-wrap justify-center gap-4 
            animate-appear opacity-0 [animation-delay:300ms]">
            <Button asChild size="lg" className={cn("bg-primary hover:bg-primary/90", "text-black font-medium shadow-lg", "transition-all duration-300")}>
              <a href={primaryCta.href}>{primaryCta.text}</a>
            </Button>

            <Button asChild size="lg" variant="ghost" className={cn("text-primary font-medium", "border border-primary hover:bg-primary/10", "transition-all duration-300")}>
              <a href={secondaryCta.href}>
                {secondaryCta.icon}
                {secondaryCta.text}
              </a>
            </Button>
          </div>

          {/* Mockup */}
          <div className="relative w-full pt-12 px-4 sm:px-6 lg:px-8">
            <Mockup className={cn("animate-appear opacity-0 [animation-delay:700ms]", "shadow-[0_0_50px_-12px_rgba(255,193,7,0.3)]", "border-primary/20")}>
              <img alt="Campaign Crew Dashboard" width={1280} height={800} className="w-full h-auto" loading="lazy" decoding="async" src="/lovable-uploads/b389d9c5-05f7-4e00-93df-2e69852c324a.png" />
            </Mockup>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow variant="above" className="animate-appear-zoom opacity-0 [animation-delay:1000ms]" />
      </div>
    </section>;
}