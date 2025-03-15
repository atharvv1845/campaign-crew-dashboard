
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { HeroWithMockup } from '@/components/ui/hero-with-mockup';
import { TestimonialsSection } from '@/components/blocks/testimonials-with-marquee';
import { CheckCircle, BarChart2, RefreshCw, ArrowRight, ChevronRight, Mail, Rocket, Shield, Users, LayoutDashboard, ListChecks, UserPlus, PieChart, Globe, UsersRound, Plus, Clipboard, MessageSquare, BarChart, Eye, Phone, LogIn } from 'lucide-react';

const Index = () => {
  const {
    user
  } = useAuth();

  const features = [{
    icon: <LayoutDashboard className="h-12 w-12 text-primary" />,
    title: "Centralized Dashboard",
    description: "See campaign progress, response rates, and leads in real-time."
  }, {
    icon: <ListChecks className="h-12 w-12 text-primary" />,
    title: "Custom Status Tracking",
    description: "Update campaign status anytime and keep teams aligned."
  }, {
    icon: <UserPlus className="h-12 w-12 text-primary" />,
    title: "Lead Management",
    description: "Organize leads, responses, and follow-ups in one place."
  }, {
    icon: <PieChart className="h-12 w-12 text-primary" />,
    title: "Performance Insights",
    description: "Track campaign effectiveness with built-in reporting."
  }, {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: "Multi-Channel Support",
    description: "Manage campaigns across email, calls, and social media."
  }, {
    icon: <UsersRound className="h-12 w-12 text-primary" />,
    title: "Team Collaboration",
    description: "Assign roles, leave comments, and track activity logs."
  }];

  const customerTestimonials = [
    {
      author: {
        name: "Jennifer Reynolds",
        handle: "Marketing Director, Quantum Solutions",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "Campaign Crew has transformed how we manage multi-channel campaigns. The centralized dashboard gives us visibility we never had before.",
      href: "https://linkedin.com/in/jenniferreynolds"
    },
    {
      author: {
        name: "Michael Chen",
        handle: "CEO, NexGen Marketing",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "We love the simplicity and control. No unwanted automation—just powerful insights and the flexibility our team needs.",
      href: "https://linkedin.com/in/michaelchen"
    },
    {
      author: {
        name: "Sophia Martinez",
        handle: "Head of Sales, Global Enterprises",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "Since using Campaign Crew, our response rates have increased by 47%. The tracking capabilities are simply unmatched in the industry."
    },
    {
      author: {
        name: "David Wilson",
        handle: "Marketing Manager, TechAdvance",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      text: "This tool made our campaign tracking so much easier. No more messy spreadsheets, just actionable insights and better results.",
      href: "https://linkedin.com/in/davidwilson"
    },
    {
      author: {
        name: "Aisha Johnson",
        handle: "Founder, Growth Accelerators",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
      },
      text: "Campaign Crew gives us the perfect balance of structure and flexibility. We've doubled our team's productivity in just 3 months.",
      href: "https://linkedin.com/in/aishajohnson"
    }
  ];

  const useCases = [{
    icon: <BarChart2 className="h-10 w-10 text-primary" />,
    title: "Marketing Teams",
    description: "Track multiple campaigns in one place."
  }, {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Sales Teams",
    description: "Keep leads organized and follow up with prospects."
  }, {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Consulting Agencies",
    description: "Manage outreach campaigns for clients."
  }, {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Startups & SMBs",
    description: "Improve marketing efforts with data-driven decisions."
  }];

  const howItWorks = [{
    number: "1",
    title: "Create a Campaign",
    description: "Define your campaign, set goals, and choose channels."
  }, {
    number: "2",
    title: "Add Leads & Assign Tasks",
    description: "Track outreach efforts and team responsibilities."
  }, {
    number: "3",
    title: "Monitor Responses & Update Status",
    description: "Adjust campaign status as you progress."
  }, {
    number: "4",
    title: "Analyze Results & Improve Strategy",
    description: "Use reports to refine future campaigns."
  }];

  const advantages = [{
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "No Automation Overload",
    description: "You control every step of the campaign."
  }, {
    icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
    title: "Simple Yet Powerful UI",
    description: "Easy-to-use interface with deep functionality."
  }, {
    icon: <RefreshCw className="h-6 w-6 text-primary" />,
    title: "Real-Time Status Updates",
    description: "Keep track of every lead and campaign update."
  }, {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Built for Teams",
    description: "Collaborate, comment, and share updates effortlessly."
  }];

  return <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md py-4 sticky top-0 z-10">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img alt="Campaign Crew Logo" src="/lovable-uploads/ef555fda-6f23-4255-bcc5-d819165c5987.jpg" className="h-16 object-cover" />
            
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-primary text-black font-medium hover:bg-primary/90">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <a href="#contact-sales">
                  <Button className="bg-primary text-black font-medium hover:bg-primary/90">Contact Sales</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroWithMockup title="Effortless Campaign Management, Maximum Results!" description="Track, manage, and optimize your marketing campaigns—without automation. Take full control of your outreach strategy." primaryCta={{
        text: user ? "Go to Dashboard 🚀" : "Contact Sales 🚀",
        href: user ? "/dashboard" : "#contact-sales",
      }} secondaryCta={{
        text: "See It In Action 👀",
        href: "#how-it-works",
        icon: <Eye className="mr-2 h-4 w-4" />
      }} mockupImage={{
        src: "/campaign-crew-dashboard.png",
        alt: "Campaign Crew Dashboard",
        width: 1280,
        height: 800
      }} />
        
        {/* What is this SaaS section */}
        <section className="py-20 bg-black/30" id="use-cases">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">What is Campaign Crew?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Manage your outreach campaigns across multiple channels with ease. Designed for businesses, agencies, and teams 
                that want full control over their campaign process—without relying on automation.
              </p>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-white text-center mb-8">Who is it for?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((useCase, index) => <Card key={index} className="bg-black/50 border-white/10 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex p-3 rounded-full bg-primary/10">{useCase.icon}</div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{useCase.title}</h3>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </CardContent>
                  </Card>)}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/50" id="features">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Key Features & Use Cases</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage campaigns effectively
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => <Card key={index} className="bg-black/50 border-white/10 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex p-3 rounded-full bg-primary/10">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>)}
            </div>
            <div className="mt-10 text-center">
              <p className="text-lg text-primary italic">Each feature ensures you stay in control—without automation dictating your strategy.</p>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <TestimonialsSection
          title="Trusted by Marketing Teams Worldwide"
          description="Join thousands of marketing professionals who are taking control of their campaigns"
          testimonials={customerTestimonials}
        />

        {/* How It Works Section */}
        <section className="py-20 bg-black/30" id="how-it-works">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple step-by-step process to streamline your campaign management
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-black font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>)}
            </div>
            <div className="mt-12 text-center">
              <a href="#contact-sales">
                <Button className="bg-primary text-black font-medium hover:bg-primary/90">
                  Contact Sales <Phone className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-black/50" id="why-us">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Unlike other platforms, we offer:
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {advantages.map((advantage, index) => <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-md">
                      {advantage.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white">{advantage.title}</h3>
                      <p className="text-muted-foreground">{advantage.description}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Sales Section */}
        <section className="py-20 bg-black/50" id="contact-sales">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-white">Contact Sales</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Let's discuss how our platform fits your needs!
              </p>
              <p className="text-lg text-white max-w-3xl mx-auto mb-8">
                Talk to our experts and get a custom solution for your business.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card className="bg-black/70 border border-white/20">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-white">Full Name</label>
                        <input type="text" id="name" className="w-full p-3 rounded-md bg-black/50 border border-white/20 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="John Smith" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-white">Company</label>
                        <input type="text" id="company" className="w-full p-3 rounded-md bg-black/50 border border-white/20 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="ABC Company" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-white">Email</label>
                        <input type="email" id="email" className="w-full p-3 rounded-md bg-black/50 border border-white/20 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="john@company.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-white">Phone Number</label>
                        <input type="tel" id="phone" className="w-full p-3 rounded-md bg-black/50 border border-white/20 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-white">How can we help?</label>
                      <textarea id="message" rows={4} className="w-full p-3 rounded-md bg-black/50 border border-white/20 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Tell us about your campaign management needs..."></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-primary text-black font-medium hover:bg-primary/90 px-8">
                        Schedule a Call <Phone className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        Contact Sales Now <Mail className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              <p className="text-center mt-6 text-muted-foreground">We'll help you streamline your campaign management process!</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/90 text-black">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Take Full Control of Your Campaigns Today!</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              No automation distractions. Just smart, effective campaign management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact-sales">
                <Button size="lg" className="bg-black text-white rounded-md px-8 hover:bg-black/90 group">
                  Contact Sales
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button size="lg" className="bg-white text-black rounded-md px-8 hover:bg-gray-100 border border-black/10">
                Book a Demo <Eye className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/lovable-uploads/0ad6094e-df44-49fa-a82e-e59b86c8263f.png" alt="Campaign Crew Logo" className="h-8 bg-white/10 rounded-full p-1" />
                <h3 className="text-lg font-semibold text-white">Campaign Crew</h3>
              </div>
              <p className="text-gray-400">Take full control of your outreach campaigns.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#why-us" className="text-gray-400 hover:text-primary transition-colors">Why Choose Us</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Use Cases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#contact-sales" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Campaign Crew. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};

export default Index;
