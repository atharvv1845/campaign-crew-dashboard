
/**
 * Utility functions for network status detection and handling
 */

/**
 * Checks if an error is a network-related error
 * @param error The error to check
 * @returns True if the error appears to be network related
 */
export const isNetworkError = (error: any): boolean => {
  if (!error) return false;
  
  return (
    error?.message === 'Failed to fetch' ||
    error?.message?.includes('NetworkError') ||
    error?.message?.includes('network') ||
    error?.message?.includes('Network') ||
    error?.name === 'AbortError' ||
    error?.code === 'NETWORK_ERROR' ||
    error instanceof TypeError && error.message === 'Failed to fetch'
  );
};

/**
 * Attempts to determine if the browser is currently offline
 * @returns True if the browser appears to be offline
 */
export const isBrowserOffline = (): boolean => {
  return typeof navigator !== 'undefined' && !navigator.onLine;
};

/**
 * Creates a backoff delay based on retry count
 * @param retryCount Current retry attempt number
 * @param baseDelayMs Base delay in milliseconds
 * @param maxDelayMs Maximum delay in milliseconds
 * @returns Delay time in milliseconds
 */
export const getBackoffDelay = (
  retryCount: number, 
  baseDelayMs = 1000, 
  maxDelayMs = 30000
): number => {
  return Math.min(baseDelayMs * Math.pow(2, retryCount), maxDelayMs);
};

/**
 * Checks connectivity by making a fetch request to a reliable endpoint
 * @param timeoutMs Timeout in milliseconds
 * @returns Promise that resolves to a boolean indicating if connection is available
 */
export const checkConnectivity = async (timeoutMs = 5000): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    await fetch('https://www.google.com/favicon.ico', { 
      mode: 'no-cors',
      signal: controller.signal,
      cache: 'no-cache',
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.error('Connectivity check failed:', error);
    return false;
  }
};
