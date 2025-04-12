
import { useEffect, useState } from 'react';
import { initializeAdminUsers } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const AdminInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const setupAdminUsers = async () => {
      try {
        await initializeAdminUsers();
        setInitialized(true);
        console.log('Admin users initialized successfully');
      } catch (error) {
        console.error('Error initializing admin users:', error);
        toast({
          title: 'Admin Setup Error',
          description: 'There was an error setting up admin accounts. Please check the console.',
          variant: 'destructive'
        });
      }
    };
    
    setupAdminUsers();
  }, [toast]);
  
  return null; // This component doesn't render anything
};
