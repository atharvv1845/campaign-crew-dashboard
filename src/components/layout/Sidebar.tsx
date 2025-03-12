
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Users, 
  MessageSquare, 
  BarChart, 
  UserPlus, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  expanded: boolean;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to, expanded, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-x-2 py-3 px-3 rounded-lg transition-all duration-300 hover:bg-sidebar-accent group",
        active ? "bg-sidebar-accent text-primary font-medium" : "text-sidebar-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground")} />
      {expanded && (
        <span className="animate-fade-in overflow-hidden whitespace-nowrap">
          {label}
        </span>
      )}
      {!expanded && (
        <div className="fixed left-16 z-50 hidden group-hover:flex rounded-md px-2 py-1 ml-6 bg-popover text-popover-foreground shadow-md">
          <span className="whitespace-nowrap text-sm">{label}</span>
        </div>
      )}
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ expanded, onToggle }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: FileSpreadsheet, label: 'Campaigns', to: '/campaigns' },
    { icon: Users, label: 'Leads', to: '/leads' },
    { icon: MessageSquare, label: 'Messaging', to: '/messaging' },
    { icon: BarChart, label: 'Reports', to: '/reports' },
    { icon: UserPlus, label: 'Team', to: '/team' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 bottom-0 z-30 flex flex-col h-screen bg-sidebar shadow-sm border-r border-sidebar-border transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-3 h-16 border-b border-sidebar-border">
          <div 
            className={cn(
              "flex items-center overflow-hidden transition-all duration-300",
              expanded ? "justify-between w-full" : "justify-center"
            )}
          >
            {expanded ? (
              <>
                <span className="font-bold text-lg animate-fade-in">CampaignCrew</span>
                <button
                  onClick={onToggle}
                  className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={onToggle}
                className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              expanded={expanded}
              active={location.pathname === item.to}
            />
          ))}
        </nav>
        
        {/* User profile */}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                JD
              </div>
            </div>
            {expanded && (
              <div className="animate-fade-in overflow-hidden">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
