
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isInternalTeam: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isAdmin: false,
  isInternalTeam: false,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInternalTeam, setIsInternalTeam] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        
        if (data.session?.user) {
          setUser(data.session.user);
          checkUserRole(data.session.user);
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsInternalTeam(false);
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
          checkUserRole(currentSession.user);
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsInternalTeam(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Check user role from email
  const checkUserRole = (user: User) => {
    if (!user) return;
    
    // Check if user is from internal team
    const isLeveragedGrowthEmail = user.email && 
      (user.email.endsWith('@leveragedgrowth.co') || 
       user.email.endsWith('@leveragedgrowth.com'));
    
    setIsInternalTeam(isLeveragedGrowthEmail || false);
    
    // For now, consider all internal team members as admins
    // In the future, this can be refined with specific role assignments
    setIsAdmin(isLeveragedGrowthEmail || false);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        checkUserRole(data.user);
        
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
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
