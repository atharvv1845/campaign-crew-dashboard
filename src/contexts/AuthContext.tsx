
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
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
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        setUserRole('viewer'); // Default to lowest access level
        return;
      }

      if (data) {
        setUserRole(data.role as UserRole);
        setIsAdmin(data.role === 'admin');
      } else {
        setUserRole('viewer'); // Default role if not found
      }
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      setUserRole('viewer'); // Default to viewer role on error
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        
        if (data.session?.user) {
          setUser(data.session.user);
          checkUserEmail(data.session.user);
          await fetchUserRole(data.session.user.id);
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsInternalTeam(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
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
          setUser(currentSession.user);
          checkUserEmail(currentSession.user);
          await fetchUserRole(currentSession.user.id);
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsInternalTeam(false);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Check user email for internal team status
  const checkUserEmail = (user: User) => {
    if (!user) return;
    
    // Check if user is from internal team
    const isLeveragedGrowthEmail = user.email && 
      (user.email.endsWith('@leveragedgrowth.co') || 
       user.email.endsWith('@leveragedgrowth.com'));
    
    setIsInternalTeam(isLeveragedGrowthEmail || false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        checkUserEmail(data.user);
        await fetchUserRole(data.user.id);
        
        // Check if user is internal team
        const isLeveragedGrowthEmail = data.user.email && 
          (data.user.email.endsWith('@leveragedgrowth.co') || 
           data.user.email.endsWith('@leveragedgrowth.com'));
        
        if (!isLeveragedGrowthEmail) {
          // Sign out if not from internal team
          await supabase.auth.signOut();
          throw new Error('Access restricted to Leveraged Growth team members only');
        }
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${data.user.email}!`,
        });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const value = {
    session,
    user,
    loading,
    isAdmin,
    isInternalTeam,
    userRole,
    signIn,
    signOut,
    getUserRoleLabel,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
