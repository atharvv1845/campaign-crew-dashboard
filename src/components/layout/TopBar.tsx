
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  sidebarExpanded: boolean;
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarExpanded, title }) => {
  return (
    <div 
      className={cn(
        "h-16 sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6 transition-all duration-300",
        sidebarExpanded ? "ml-64" : "ml-16"
      )}
    >
      <h1 className="text-xl font-medium animate-fade-in">{title}</h1>
      
      <div className="flex items-center gap-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="glass-input h-9 pl-9 pr-4 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 w-[200px]"
          />
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
