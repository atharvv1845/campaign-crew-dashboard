
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
import Login from './pages/Login';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AdminInitializer } from './components/auth/AdminInitializer';

// Create Tanstack query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminInitializer />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/campaigns" element={
              <ProtectedRoute requiredRole="editor">
                <MainLayout>
                  <Campaigns />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/campaigns/:id" element={
              <ProtectedRoute requiredRole="editor">
                <MainLayout>
                  <CampaignDetail />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/leads" element={
              <ProtectedRoute requiredRole="editor">
                <MainLayout>
                  <Leads />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/messaging" element={
              <ProtectedRoute requiredRole="editor">
                <MainLayout>
                  <Messaging />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute requiredRole="viewer">
                <MainLayout>
                  <Reports />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/team" element={
              <ProtectedRoute requiredRole="admin">
                <MainLayout>
                  <Team />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={
              <ProtectedRoute>
                <MainLayout>
                  <NotFound />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
