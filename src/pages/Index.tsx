
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, BarChart2, RefreshCw, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: "Campaign Tracking",
      description: "Manage multiple campaigns at once with our intuitive dashboard and detailed analytics.",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-primary" />,
      title: "Real-Time Insights",
      description: "Monitor leads & responses with analytics that update in real-time as your campaign progresses.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Status Updates",
      description: "Easily update lead progress within campaigns using our drag-and-drop interface.",
    }
  ];

  const testimonials = [
    {
      quote: "Campaign Crew has transformed how we manage our marketing campaigns. We've seen a 40% increase in conversions!",
      author: "Sarah Johnson",
      position: "Marketing Director, TechSolutions Inc."
    },
    {
      quote: "The analytics dashboard gives us insights we never had before. It's like having a marketing consultant at your fingertips.",
      author: "Michael Chen",
      position: "Growth Lead, Startup Ventures"
    },
    {
      quote: "I can finally track all my leads in one place. The time savings alone has made this worth every penny.",
      author: "Emma Watson",
      position: "Sales Manager, Global Enterprises"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border bg-background py-4 sticky top-0 z-10">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/0ad6094e-df44-49fa-a82e-e59b86c8263f.png" 
              alt="Campaign Crew Logo" 
              className="h-10" 
            />
            <h1 className="text-2xl font-bold">Campaign Crew</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-24 md:py-32">
          <div className="container text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/0ad6094e-df44-49fa-a82e-e59b86c8263f.png" 
                alt="Campaign Crew Logo" 
                className="h-24" 
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Effortless Campaign Management for Your Business</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Track leads, update statuses, and improve conversions – all in one place.
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full px-8 group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8 group">
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-lg border p-6 text-card-foreground shadow hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-background rounded-lg border p-6 shadow relative">
                  <div className="absolute -top-4 left-6 text-5xl text-primary/20">"</div>
                  <blockquote className="mb-4 relative z-10">
                    <p className="italic text-muted-foreground">{testimonial.quote}</p>
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Campaign Management?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of marketers who've improved their campaign performance with Campaign Crew.
            </p>
            <Link to={user ? "/dashboard" : "/signup"}>
              <Button size="lg" className="rounded-full px-8">
                {user ? "Go to Dashboard" : "Get Started Today"}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/lovable-uploads/0ad6094e-df44-49fa-a82e-e59b86c8263f.png" 
                  alt="Campaign Crew Logo" 
                  className="h-8" 
                />
                <h3 className="text-lg font-semibold">Campaign Crew</h3>
              </div>
              <p className="text-muted-foreground">Streamline your outreach campaigns for better results.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Campaign Crew. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
