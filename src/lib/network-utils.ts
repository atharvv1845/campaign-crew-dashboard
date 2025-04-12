
/**
 * Utility functions for network status detection and handling
 */

/**
 * Checks if an error is a network-related error
 * @param error The error to check
 * @returns True if the error appears to be network related
 */
export const isNetworkError = (error: any): boolean => {
  return (
    error?.message === 'Failed to fetch' ||
    error?.message?.includes('NetworkError') ||
    error?.message?.includes('network') ||
    error?.name === 'AbortError' ||
    error?.code === 'NETWORK_ERROR'
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
