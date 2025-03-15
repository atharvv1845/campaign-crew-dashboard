
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Leads from './pages/Leads';
import Messaging from './pages/Messaging';
import Reports from './pages/Reports';
import Team from './pages/Team';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

// Get the Clerk publishable key from environment variable
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xlcmsuY2FtcGFpZ24tY3Jldy00MC5jbGVyay5hY2NvdW50cy5kZXYk";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              }
            />
            <Route
              path="/signup"
              element={
                <SignedOut>
                  <SignUp />
                </SignedOut>
              }
            />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
              }
            />
            
            <Route
              path="/*"
              element={
                <SignedIn>
                  <MainLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="campaigns" element={<Campaigns />} />
                      <Route path="campaigns/:id" element={<CampaignDetail />} />
                      <Route path="leads" element={<Leads />} />
                      <Route path="messaging" element={<Messaging />} />
                      <Route path="reports" element={<Reports />} />
                      <Route path="team" element={<Team />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </MainLayout>
                </SignedIn>
              }
            />
          </Routes>
          <Toaster />
        </Router>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

export default App;
