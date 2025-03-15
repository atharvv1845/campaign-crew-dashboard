import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { HeroWithMockup } from '@/components/ui/hero-with-mockup';
import { CheckCircle, BarChart2, RefreshCw, ArrowRight, ChevronRight, Mail, Rocket, Shield, Users, Code } from 'lucide-react';

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
      <header className="border-b border-border bg-white py-4 sticky top-0 z-10 shadow-sm">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/0ad6094e-df44-49fa-a82e-e59b86c8263f.png" 
              alt="Campaign Crew Logo" 
              className="h-10" 
            />
            <h1 className="text-2xl font-bold text-secondary">Campaign Crew</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-primary text-white hover:bg-primary/90">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary text-white hover:bg-primary/90">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroWithMockup
          title="Supercharge Your Campaigns"
          description="Track, manage, and optimize your marketing outreach with ease. Unlock the power of intelligent campaign management today."
          primaryCta={{
            text: user ? "Go to Dashboard" : "Get Started for Free",
            href: user ? "/dashboard" : "/signup",
          }}
          secondaryCta={{
            text: "See Features",
            href: "#features",
            icon: <ChevronRight className="mr-2 h-4 w-4" />,
          }}
          mockupImage={{
            src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
            alt: "Campaign Crew Dashboard",
            width: 1200,
            height: 800,
          }}
        />
        
        {/* Features Section */}
        <section className="py-20 bg-white" id="features">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your marketing campaigns effectively
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border border-border shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex p-3 rounded-full bg-primary/10">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-secondary">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-20 bg-blue-50">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-secondary">Streamline Your Campaign Management</h2>
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
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="mt-8 inline-block">
                  <Button className="mt-6 bg-primary text-white hover:bg-primary/90 group">
                    Get Started
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative">
                  <div className="absolute inset-0 translate-x-4 translate-y-4 bg-blue-200 rounded-xl"></div>
                  <div className="relative rounded-xl overflow-hidden border border-border shadow-xl">
                    <img 
                      src="https://placehold.co/800x500/3B82F6/FFFFFF?text=Campaign+Crew+Dashboard"
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
        <section className="py-20 bg-white" id="pricing">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your business
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`${plan.popular ? 'border-primary border-2 shadow-lg' : 'border border-border'} relative`}>
                  <CardContent className="p-6">
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white py-1 px-3 uppercase text-xs font-bold tracking-wider transform translate-x-2 -translate-y-2 rounded-bl-lg rounded-tr-lg shadow">
                        Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-secondary">{plan.name}</h3>
                    <div className="my-4 flex items-end">
                      <span className="text-4xl font-bold text-secondary">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? 'bg-primary text-white hover:bg-primary/90' : 'bg-secondary text-white hover:bg-secondary/90'}`}>
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-blue-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16 text-secondary">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border border-border p-6 shadow relative">
                  <div className="absolute -top-4 left-6 text-5xl text-primary">"</div>
                  <CardContent className="pt-4 px-0">
                    <blockquote className="mb-4 relative z-10 pt-4">
                      <p className="italic text-muted-foreground">{testimonial.quote}</p>
                    </blockquote>
                    <div className="mt-4">
                      <p className="font-semibold text-secondary">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Campaign Management?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of marketers who've improved their campaign performance with Campaign Crew.
            </p>
            <Link to={user ? "/dashboard" : "/signup"}>
              <Button size="lg" className="bg-white text-blue-600 rounded-md px-8 hover:shadow-lg hover:bg-gray-100 group">
                {user ? "Go to Dashboard" : "Start Your Free Trial Today"}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-secondary text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/lovable-uploads/0ad6094e-df44-49fa-a82e-e59b86c8263f.png" 
                  alt="Campaign Crew Logo" 
                  className="h-8 bg-white rounded-full p-1" 
                />
                <h3 className="text-lg font-semibold">Campaign Crew</h3>
              </div>
              <p className="text-gray-300">Streamline your outreach campaigns for better results.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Campaign Crew. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

