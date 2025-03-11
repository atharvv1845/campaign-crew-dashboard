
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSmoothTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayLocation, setDisplayLocation] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== displayLocation) {
      setIsAnimating(true);
      
      // Wait for exit animation
      const timer = setTimeout(() => {
        setDisplayLocation(location.pathname);
        setIsAnimating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return { isAnimating, displayLocation: displayLocation || location.pathname };
};

export default useSmoothTransition;
