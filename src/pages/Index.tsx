
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, BarChart2, RefreshCw, ArrowRight, ChevronRight, BarChart4, Mail, Rocket } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <BarChart2 className="h-12 w-12 text-primary" />,
      title: "Live Campaign Analytics",
      description: "Get real-time insights into your campaign performance with our powerful analytics dashboard.",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      title: "Lead Tracking & Status Updates",
      description: "Easily track leads and update their status with our intuitive drag-and-drop interface.",
    },
    {
      icon: <Mail className="h-12 w-12 text-primary" />,
      title: "Automated Outreach",
      description: "Set up automated email sequences to nurture leads and improve conversion rates.",
    },
    {
      icon: <Rocket className="h-12 w-12 text-primary" />,
      title: "Conversion Rate Optimization",
      description: "Optimize your campaigns with AI-powered insights to maximize your conversion rates.",
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

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individuals just starting out",
      features: [
        "Up to 3 campaigns",
        "100 leads",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For growing businesses and teams",
      popular: true,
      features: [
        "Unlimited campaigns",
        "10,000 leads",
        "Advanced analytics",
        "Priority support",
        "Team collaboration",
        "Custom integrations"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Pro",
        "Unlimited leads",
        "Dedicated account manager",
        "Custom reporting",
        "SLA guarantee",
        "API access"
      ]
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
                <Button className="bg-primary text-black hover:bg-primary/90">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary text-black hover:bg-primary/90">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with abstract pattern */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <svg width="100%" height="100%" className="text-primary/5">
              <pattern id="pattern-circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="25" cy="25" r="12" fill="currentColor"></circle>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
          </div>
          
          <div className="container text-center relative z-10">
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/0ad6094e-df44-49fa-a82e-e59b86c8263f.png" 
                alt="Campaign Crew Logo" 
                className="h-24" 
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Supercharge Your Campaigns with AI-Powered Insights</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Track, manage, and optimize your marketing outreach with ease.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-primary text-black rounded-full px-8 hover:shadow-lg group">
                    Go to Dashboard
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="bg-primary text-black rounded-full px-8 hover:shadow-lg group">
                      Get Started for Free
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-secondary text-secondary hover:bg-secondary hover:text-white">
                    See Features
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-background" id="features">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your marketing campaigns effectively
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg border border-border p-6 shadow hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-secondary/5">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Streamline Your Campaign Management</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our intuitive dashboard gives you a complete overview of your campaigns, leads, and performance metrics in one place.
                </p>
                <ul className="space-y-4">
                  {[
                    "Track multiple campaigns simultaneously",
                    "Monitor lead progress in real-time",
                    "Analyze performance with detailed metrics",
                    "Collaborate with your team seamlessly"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="mt-8 inline-block">
                  <Button className="mt-6 bg-primary text-black hover:bg-primary/90 group">
                    Get Started
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative perspective-[1000px] transform-gpu">
                  <div className="absolute inset-0 rotate-[-4deg] scale-[0.95] bg-secondary rounded-xl transform-gpu"></div>
                  <div className="relative rounded-xl overflow-hidden border-4 border-secondary shadow-2xl transform-gpu rotation-y-10 rotate-y-[-4deg]">
                    <img 
                      src="https://placehold.co/800x500/333/FFC107?text=Campaign+Crew+Dashboard"
                      alt="Dashboard Preview" 
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background" id="pricing">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your business
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`rounded-lg p-6 ${plan.popular ? 'border-primary border-2 shadow-lg' : 'border border-border'} relative`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-black py-1 px-3 uppercase text-xs font-bold tracking-wider transform translate-x-2 -translate-y-2 rounded-bl-lg rounded-tr-lg shadow">
                      Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="my-4 flex items-end">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-primary text-black hover:bg-primary/90' : 'bg-secondary text-white hover:bg-secondary/90'}`}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-secondary text-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-secondary-foreground rounded-lg border border-secondary p-6 shadow relative text-secondary">
                  <div className="absolute -top-4 left-6 text-5xl text-primary">"</div>
                  <blockquote className="mb-4 relative z-10 pt-4">
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
        <section className="py-20 bg-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Campaign Management?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of marketers who've improved their campaign performance with Campaign Crew.
            </p>
            <Link to={user ? "/dashboard" : "/signup"}>
              <Button size="lg" className="bg-primary text-black rounded-full px-8 hover:shadow-lg group">
                {user ? "Go to Dashboard" : "Start Your Free Trial Today"}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
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
