
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getUserRole } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

// Define available user roles
export type UserRole = 'admin' | 'editor' | 'viewer';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isInternalTeam: boolean;
  userRole: UserRole | null;
  isOffline: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUserRoleLabel: (role: UserRole) => string;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isAdmin: false,
  isInternalTeam: false,
  userRole: null,
  isOffline: false,
  signIn: async () => {},
  signOut: async () => {},
  getUserRoleLabel: () => '',
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInternalTeam, setIsInternalTeam] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  // Helper function to get role label
  const getUserRoleLabel = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'editor':
        return 'Editor';
      case 'viewer':
        return 'Viewer';
      default:
        return 'Unknown Role';
    }
  };

  // Function to fetch and set user role from database
  const fetchUserRole = async (userId: string) => {
    try {
      console.log('Fetching user role for:', userId);
      const role = await getUserRole(userId);
      
      if (role) {
        console.log('User role found:', role);
        setUserRole(role);
        setIsAdmin(role === 'admin');
      } else {
        console.log('No role found, defaulting to viewer');
        setUserRole('viewer'); // Default role if not found
      }
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      
      // Check if it's a network error
      if (error instanceof Error && 
          (error.message === 'Failed to fetch' || 
           error.message.includes('NetworkError') || 
           error.message.includes('network'))) {
        setIsOffline(true);
      }
      
      setUserRole('viewer'); // Default to viewer role on error
    }
  };

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      console.log('Connection restored');
      setIsOffline(false);
      
      // If user exists, refresh their role
      if (user) {
        fetchUserRole(user.id);
      }
      
      toast({
        title: "Connection Restored",
        description: "You're back online.",
      });
    };
    
    const handleOffline = () => {
      console.log('Connection lost');
      setIsOffline(true);
      
      toast({
        title: "Connection Lost",
        description: "You're currently offline. Some features may not work.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set initial offline status
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast, user]);

  useEffect(() => {
    console.log('Auth provider initialized');
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session');
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        
        if (data.session?.user) {
          console.log('User found in session:', data.session.user.email);
          setUser(data.session.user);
          checkUserEmail(data.session.user);
          await fetchUserRole(data.session.user.id);
        } else {
          console.log('No user in session');
          setUser(null);
          setIsAdmin(false);
          setIsInternalTeam(false);
          setUserRole(null);
        }
        
        // Reset retry count on success
        setRetryCount(0);
        setIsOffline(false);
      } catch (error) {
        console.error('Error getting initial session:', error);
        
        // Check if it's a network error
        if (error instanceof Error && 
            (error.message === 'Failed to fetch' || 
             error.message.includes('NetworkError') || 
             error.message.includes('network'))) {
          
          setIsOffline(true);
          
          // Retry with increasing delay if we're offline
          if (retryCount < 5) {
            const delayMs = Math.min(1000 * Math.pow(2, retryCount), 30000); // Exponential backoff with 30s max
            console.log(`Retrying session in ${delayMs}ms (attempt ${retryCount + 1})`);
            
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
              getInitialSession();
            }, delayMs);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log(`Auth event: ${event}`);
        setSession(currentSession);
        
        if (currentSession?.user) {
          console.log('User in auth change:', currentSession.user.email);
          setUser(currentSession.user);
          checkUserEmail(currentSession.user);
          await fetchUserRole(currentSession.user.id);
        } else {
          console.log('No user in auth change');
          setUser(null);
          setIsAdmin(false);
          setIsInternalTeam(false);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth listener');
      authListener?.subscription?.unsubscribe();
    };
  }, [retryCount]);

  // Check user email for internal team status
  const checkUserEmail = (user: User) => {
    if (!user) return;
    
    // Check if user is from internal team
    const isLeveragedGrowthEmail = user.email && 
      (user.email.endsWith('@leveragedgrowth.co') || 
       user.email.endsWith('@leveragedgrowth.com'));
    
    console.log('Internal team check:', isLeveragedGrowthEmail);
    setIsInternalTeam(isLeveragedGrowthEmail || false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Auth context: Signing in user:', email);
      
      // Validate offline status first
      if (isOffline) {
        throw new Error('You are currently offline. Please check your internet connection and try again.');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Auth context: Sign in error:', error);
        
        // Detect network errors
        if (error.message === 'Failed to fetch') {
          setIsOffline(true);
          throw new Error('Network connection error. Please check your internet connection and try again.');
        }
        
        throw error;
      }
      
      if (data.user) {
        console.log('Auth context: Sign in successful:', data.user.email);
        checkUserEmail(data.user);
        await fetchUserRole(data.user.id);
        
        // Check if user is internal team
        const isLeveragedGrowthEmail = data.user.email && 
          (data.user.email.endsWith('@leveragedgrowth.co') || 
           data.user.email.endsWith('@leveragedgrowth.com'));
        
        if (!isLeveragedGrowthEmail) {
          // Sign out if not from internal team
          console.log('Auth context: Not internal team, signing out');
          await supabase.auth.signOut();
          throw new Error('Access restricted to Leveraged Growth team members only');
        }
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${data.user.email}!`,
        });
      }
    } catch (error: any) {
      console.error('Auth context: Sign in error:', error);
      
      // Set offline state based on error message
      if (error.message === 'Failed to fetch' || 
          error.message.includes('Network connection error')) {
        setIsOffline(true);
      }
      
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Auth context: Signing out user');
      
      // If we're offline, just clear the local session
      if (isOffline) {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        setIsInternalTeam(false);
        setUserRole(null);
        
        toast({
          title: "Signed out (offline mode)",
          description: "You have been signed out locally. Some data may re-appear when your connection is restored.",
        });
        
        return;
      }
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      console.error('Auth context: Sign out error:', error);
      
      // Handle network errors during sign out
      if (error.message === 'Failed to fetch') {
        setIsOffline(true);
        toast({
          title: "Offline Sign Out",
          description: "Signed out locally. Full sign out will occur when connection is restored.",
          variant: "destructive"
        });
      } else {
        throw error;
      }
    }
  };

  const value = {
    session,
    user,
    loading,
    isAdmin,
    isInternalTeam,
    userRole,
    isOffline,
    signIn,
    signOut,
    getUserRoleLabel,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
