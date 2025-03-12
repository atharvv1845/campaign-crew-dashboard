
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Flag, 
  Users, 
  MessageSquare, 
  Settings, 
  BarChart2 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight">Outreach CRM</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
              isActive ? "bg-muted" : "transparent"
            )
          }
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/campaigns"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
              isActive ? "bg-muted" : "transparent"
            )
          }
        >
          <Flag className="h-5 w-5" />
          <span>Campaigns</span>
        </NavLink>
        
        <NavLink
          to="/leads"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
              isActive ? "bg-muted" : "transparent"
            )
          }
        >
          <Users className="h-5 w-5" />
          <span>Leads</span>
        </NavLink>
        
        <NavLink
          to="/messaging"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
              isActive ? "bg-muted" : "transparent"
            )
          }
        >
          <MessageSquare className="h-5 w-5" />
          <span>Messaging</span>
        </NavLink>
        
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
              isActive ? "bg-muted" : "transparent"
            )
          }
        >
          <BarChart2 className="h-5 w-5" />
          <span>Reports</span>
        </NavLink>
      </nav>
      
      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
