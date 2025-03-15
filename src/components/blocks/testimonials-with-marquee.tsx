
import React from "react";
import { cn } from "@/lib/utils";

interface Author {
  name: string;
  handle: string;
  avatar: string;
}

interface Testimonial {
  author: Author;
  text: string;
  href?: string;
}

export interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn("py-20 bg-black/30 overflow-hidden", className)}
    >
      <div className="container text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="relative">
        <div className="testimonial-marquee-container pb-12 overflow-hidden">
          <div className="testimonial-marquee">
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={`${testimonial.author.name}-${i}`}
                className="testimonial-card glass-card border border-white/10 p-6 mx-4 max-w-md rounded-lg bg-black/60"
              >
                <blockquote className="mb-4 relative z-10 pt-4">
                  <div className="absolute -top-4 left-6 text-5xl text-primary">"</div>
                  <p className="italic text-white">{testimonial.text}</p>
                </blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-white">{testimonial.author.name}</p>
                    {testimonial.href ? (
                      <a
                        href={testimonial.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary"
                      >
                        {testimonial.author.handle}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{testimonial.author.handle}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
