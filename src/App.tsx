
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Leads from "./pages/Leads";
import Messaging from "./pages/Messaging";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Pages with main layout */}
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          
          <Route
            path="/campaigns"
            element={
              <MainLayout>
                <Campaigns />
              </MainLayout>
            }
          />
          
          <Route
            path="/leads"
            element={
              <MainLayout>
                <Leads />
              </MainLayout>
            }
          />
          
          <Route
            path="/messaging"
            element={
              <MainLayout>
                <Messaging />
              </MainLayout>
            }
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
