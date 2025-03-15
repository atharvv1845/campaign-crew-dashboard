
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Leads from './pages/Leads';
import Messaging from './pages/Messaging';
import Reports from './pages/Reports';
import Team from './pages/Team';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

// Create Tanstack query client
const queryClient = new QueryClient();

// Create Supabase client
const supabaseUrl = 'https://iouuqypqvpicswzzcwpd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdXVxeXBxdnBpY3N3enpjd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjAzNTksImV4cCI6MjA1NzYzNjM1OX0.2LN6JCsaD4gMb8AuYezBD7wF4Pif_LZZ0PbFnttSvdw';
export const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/*" element={
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
          } />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
