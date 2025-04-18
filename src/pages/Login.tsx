
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Mail, Key, Lock, Users, AlertCircle, WifiOff, RefreshCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { NetworkStatus } from '@/components/ui/network-status';
import { isNetworkError } from '@/lib/network-utils';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters'
  })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, isOffline } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Check network state on mount and when isOffline changes
  useEffect(() => {
    // Check network status during component mount
    const isCurrentlyOffline = !navigator.onLine;
    console.log('Current network status:', isCurrentlyOffline ? 'offline' : 'online');
    setNetworkError(isOffline || isCurrentlyOffline);
    
    // Event listeners for online/offline status
    const handleOnline = () => {
      console.log('Connection restored');
      setNetworkError(false);
      setLastError(null);
    };
    
    const handleOffline = () => {
      console.log('Connection lost');
      setNetworkError(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check again via fetch
    const checkNetworkConnection = async () => {
      try {
        await fetch('https://www.google.com/favicon.ico', { 
          mode: 'no-cors',
          cache: 'no-cache',
          headers: { 'Cache-Control': 'no-cache' }
        });
        // If we get here, we're online
        setNetworkError(false);
      } catch (error) {
        console.log('Network check failed:', error);
        setNetworkError(true);
      }
    };
    
    checkNetworkConnection();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOffline]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Check offline status before attempting login
    if (networkError) {
      toast({
        title: "Network error",
        description: "Unable to connect to the authentication service. Please check your internet connection.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('Attempting to sign in with:', data.email);
      await signIn(data.email, data.password);
      setLastError(null);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Check if it's a network error
      if (isNetworkError(error)) {
        setNetworkError(true);
        setRetryAttempts(prev => prev + 1);
        setLastError("Network connection error. Please check your internet connection and try again.");
        
        toast({
          title: "Network error",
          description: "Unable to connect to the authentication service. Please check your internet connection.",
          variant: "destructive"
        });
      } else {
        setLastError(error.message || "Unknown error occurred");
        
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectionRetry = async () => {
    try {
      setIsLoading(true);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://www.google.com/favicon.ico', { 
        mode: 'no-cors',
        signal: controller.signal,
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      clearTimeout(timeoutId);
      
      // If we get here, the fetch succeeded
      setNetworkError(false);
      setLastError(null);
      
      toast({
        title: "Connection check",
        description: "Internet connection appears to be working. You can try signing in now.",
      });
    } catch (error) {
      console.error('Connection retry failed:', error);
      
      toast({
        title: "Still offline",
        description: "Internet connection isn't available. Please check your network settings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Team Access</CardTitle>
          <CardDescription className="text-center">
            Sign in with your Leveraged Growth team credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          {networkError && (
            <div className="mb-4">
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
                      onClick={handleConnectionRetry}
                      disabled={isLoading}
                    >
                      {isLoading ? (
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
          )}
          
          {lastError && !networkError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-5 w-5 mr-2" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{lastError}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField 
                control={form.control} 
                name="email" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="your.email@leveragedgrowth.co" 
                          className="pl-10" 
                          {...field} 
                          disabled={isLoading} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              <FormField 
                control={form.control} 
                name="password" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-10" 
                          {...field} 
                          disabled={isLoading} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || networkError}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </span>
                )}
              </Button>
              
              {networkError && (
                <div className="pt-2">
                  <p className="text-sm text-center text-muted-foreground">
                    Test credentials (when service is available):
                  </p>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">Email:</span> atharv@leveragedgrowth.co
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">Password:</span> leveragedgrowth123
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Internal team access only</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Multiple user roles supported</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
