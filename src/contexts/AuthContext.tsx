
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
      setUserRole('viewer'); // Default to viewer role on error
    }
  };

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
  }, []);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Auth context: Sign in error:', error);
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
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Auth context: Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      console.error('Auth context: Sign out error:', error);
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
