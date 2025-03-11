
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const getPageTitle = (pathname: string): string => {
  const path = pathname.split('/')[1];
  if (!path) return 'Dashboard';
  
  return path.charAt(0).toUpperCase() + path.slice(1);
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  
  // Handle initial animation
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };
  
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
      
      <div 
        className={cn(
          "transition-all duration-300 h-screen overflow-auto",
          sidebarExpanded ? "ml-64" : "ml-16"
        )}
      >
        <TopBar sidebarExpanded={sidebarExpanded} title={pageTitle} />
        
        <main className={cn(
          "p-6 min-h-[calc(100vh-4rem)]",
          mounted ? "animate-fade-in" : "opacity-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
