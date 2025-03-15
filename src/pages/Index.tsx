
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border bg-background py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold">OutreachPilot</h1>
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
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Streamline Your Outreach Campaigns</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Create, manage, and optimize your outreach campaigns all in one place
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="rounded-full px-8">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </section>
        
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Campaign Management",
                  description: "Create and manage multiple outreach campaigns with ease.",
                },
                {
                  title: "Lead Tracking",
                  description: "Keep track of all your leads and their progress through your sales funnel.",
                },
                {
                  title: "Performance Analytics",
                  description: "Get insights into your campaign performance to optimize your strategy.",
                }
              ].map((feature, index) => (
                <div key={index} className="bg-card rounded-lg border p-6 text-card-foreground shadow">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border bg-background py-8">
        <div className="container text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OutreachPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
