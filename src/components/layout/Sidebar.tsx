
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  BarChart3, 
  MessageSquare,
  Settings,
  ChevronLeft,
  UserPlus,
} from 'lucide-react';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, onToggle }) => {
  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 h-screen bg-black z-30 border-r border-border transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className={cn(
          "h-16 flex items-center transition-all duration-300 overflow-hidden border-b border-border",
          expanded ? "px-6 justify-between" : "justify-center"
        )}>
          {expanded ? (
            <>
              <div className="font-semibold text-primary">Campaign Crew</div>
              <button 
                onClick={onToggle}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button 
              onClick={onToggle}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors rotate-180"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent",
                  !expanded && "justify-center"
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                {expanded && <span className="ml-3">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/campaigns" 
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent",
                  !expanded && "justify-center"
                )}
              >
                <Megaphone className="h-5 w-5" />
                {expanded && <span className="ml-3">Campaigns</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/leads" 
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent",
                  !expanded && "justify-center"
                )}
              >
                <Users className="h-5 w-5" />
                {expanded && <span className="ml-3">Leads</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/messaging" 
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent",
                  !expanded && "justify-center"
                )}
              >
                <MessageSquare className="h-5 w-5" />
                {expanded && <span className="ml-3">Messaging</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/reports" 
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent",
                  !expanded && "justify-center"
                )}
              >
                <BarChart3 className="h-5 w-5" />
                {expanded && <span className="ml-3">Reports</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/team" 
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent",
                  !expanded && "justify-center"
                )}
              >
                <UserPlus className="h-5 w-5" />
                {expanded && <span className="ml-3">Team</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {/* Bottom actions */}
        <div className="p-3 mt-auto">
          <NavLink 
            to="/settings" 
            className={({ isActive }) => cn(
              "flex items-center py-2 px-3 rounded-lg transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-accent",
              !expanded && "justify-center"
            )}
          >
            <Settings className="h-5 w-5" />
            {expanded && <span className="ml-3">Settings</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
