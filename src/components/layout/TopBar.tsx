
import React from 'react';
import { Bell, Search, LogOut, User, Settings, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface TopBarProps {
  sidebarExpanded: boolean;
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarExpanded, title }) => {
  const { user, signOut, isAdmin, userRole, getUserRoleLabel } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  // Get correct color for role badge
  const getRoleBadgeColor = () => {
    switch (userRole) {
      case 'admin':
        return 'bg-primary text-primary-foreground';
      case 'editor':
        return 'bg-blue-500 text-white';
      case 'viewer':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full w-9 h-9 bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
              <UserCircle className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.email}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className={cn("h-5 text-xs font-normal", getRoleBadgeColor())}>
                    {userRole && getUserRoleLabel(userRole)}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={() => navigate('/team')} className="cursor-pointer">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Team Management</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
