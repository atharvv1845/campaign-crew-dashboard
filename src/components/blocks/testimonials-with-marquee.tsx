
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Author {
  name: string;
  handle?: string;
  avatar?: string;
  position?: string;
}

interface Testimonial {
  author: Author;
  text: string;
  href?: string;
}

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Testimonial[];
  actionButton?: {
    text: string;
    href: string;
  };
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  actionButton
}: TestimonialsSectionProps) {
  return (
    <section className="py-20 bg-black/30 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          <div className="testimonial-marquee flex animate-marquee py-4">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index} 
                className="min-w-[350px] max-w-md mx-4 bg-black/60 border border-white/10 p-6 rounded-lg shadow relative glass-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute -top-4 left-6 text-5xl text-primary opacity-50">"</div>
                <div className="pt-4 px-0">
                  <blockquote className="mb-6 relative z-10 pt-2">
                    <p className="italic text-gray-300">{testimonial.text}</p>
                  </blockquote>
                  <div className="flex items-center mt-4">
                    {testimonial.author.avatar && (
                      <img 
                        src={testimonial.author.avatar} 
                        alt={testimonial.author.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover border border-white/10"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-white">{testimonial.author.name}</p>
                      {testimonial.author.handle && (
                        <p className="text-sm text-primary">{testimonial.author.handle}</p>
                      )}
                      {testimonial.author.position && !testimonial.author.handle && (
                        <p className="text-sm text-muted-foreground">{testimonial.author.position}</p>
                      )}
                    </div>
                  </div>
                </div>
                {testimonial.href && (
                  <a 
                    href={testimonial.href} 
                    className="absolute bottom-3 right-3 text-primary hover:text-primary/80 text-sm"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {actionButton && (
          <div className="mt-10 text-center">
            <a href={actionButton.href}>
              <Button className="bg-primary text-black font-medium hover:bg-primary/90">
                {actionButton.text} <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
