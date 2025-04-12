
import { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { WifiOff, Wifi, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface NetworkStatusProps {
  onRetry?: () => void;
  className?: string;
}

export const NetworkStatus = ({ onRetry, className = "" }: NetworkStatusProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [checking, setChecking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connection Restored",
        description: "You're back online.",
      });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Connection Lost",
        description: "You're currently offline. Some features may not work.",
        variant: "destructive"
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const checkConnection = async () => {
    setChecking(true);
    
    try {
      // Try to fetch a small resource to test connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://www.google.com/favicon.ico', { 
        mode: 'no-cors',
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      
      // If we get here, connection is working
      if (!isOnline) {
        setIsOnline(true);
        toast({
          title: "Connection Available",
          description: "Internet connection appears to be working, but the authentication service may still be unavailable.",
        });
      }
    } catch (error) {
      // Connection still not working
      setIsOnline(false);
      toast({
        title: "Still Offline",
        description: "Internet connection isn't available. Please check your network settings.",
        variant: "destructive"
      });
    } finally {
      setChecking(false);
    }
  };

  const handleRetry = () => {
    checkConnection();
    if (onRetry) onRetry();
  };

  if (isOnline) return null;

  return (
    <div className={`network-status ${className}`}>
      <Alert variant="destructive">
        <WifiOff className="h-4 w-4 mr-2" />
        <AlertTitle>Connection Issue</AlertTitle>
        <AlertDescription className="mt-1">
          <p>Unable to connect to the authentication service. This could be due to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Network connectivity issues</li>
            <li>Temporary server downtime</li>
            <li>Firewall or VPN restrictions</li>
          </ul>
          <div className="mt-3 flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRetry}
              disabled={checking}
            >
              {checking ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Check Connection
                </>
              )}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
