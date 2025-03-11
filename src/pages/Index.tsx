
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to dashboard
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-pulse">
        <h1 className="text-2xl font-medium">Redirecting to Dashboard...</h1>
      </div>
    </div>
  );
};

export default Index;
