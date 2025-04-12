
import { useEffect, useState } from 'react';
import { initializeAdminUsers } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const AdminInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const setupAdminUsers = async () => {
      setIsInitializing(true);
      try {
        console.log('AdminInitializer: Starting initialization');
        await initializeAdminUsers();
        setInitialized(true);
        console.log('AdminInitializer: Initialization successful');
      } catch (error) {
        console.error('AdminInitializer: Error initializing admin users:', error);
        
        // Check if it's a network error
        if (error instanceof Error && error.message === 'Failed to fetch') {
          toast({
            title: 'Network Connection Issue',
            description: 'Could not connect to the authentication service. Admin accounts will initialize when connection is restored.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Admin Setup Error',
            description: 'There was an error setting up admin accounts. Check console for details.',
            variant: 'destructive'
          });
        }
      } finally {
        setIsInitializing(false);
      }
    };
    
    setupAdminUsers();
  }, [toast]);
  
  return null; // This component doesn't render anything
};
