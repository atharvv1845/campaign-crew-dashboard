
import { useEffect, useState } from 'react';
import { initializeAdminUsers } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const AdminInitializer = () => {
  const [initialized, setInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const setupAdminUsers = async () => {
      setIsInitializing(true);
      setNetworkError(false);

      try {
        console.log('AdminInitializer: Starting initialization');
        await initializeAdminUsers();
        setInitialized(true);
        console.log('AdminInitializer: Initialization successful');
        
        // If we were previously offline and now succeeded, show a success message
        if (networkError) {
          toast({
            title: 'Connection Restored',
            description: 'Successfully connected to authentication service.',
            variant: 'default'
          });
        }
        setNetworkError(false);
      } catch (error) {
        console.error('AdminInitializer: Error initializing admin users:', error);
        
        // Check if it's a network error
        if (error instanceof Error && 
            (error.message === 'Failed to fetch' || 
             error.message.includes('NetworkError') || 
             error.message.includes('network') || 
             error.name === 'AbortError')) {
          
          setNetworkError(true);
          toast({
            title: 'Network Connection Issue',
            description: 'Could not connect to the authentication service. Admin accounts will initialize when connection is restored.',
            variant: 'destructive'
          });

          // Retry after 10 seconds in case of network error
          setTimeout(() => {
            setupAdminUsers();
          }, 10000);
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

    // Set up cleanup
    return () => {
      // Any cleanup if needed
    };
  }, [toast]);
  
  // Render a hidden status alert for debugging purposes
  if (networkError) {
    return (
      <div className="fixed bottom-4 left-4 z-50 max-w-md">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Issue</AlertTitle>
          <AlertDescription>
            Unable to connect to the authentication service.
            {isInitializing ? ' Retrying...' : ' Will retry automatically.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return null;
};
