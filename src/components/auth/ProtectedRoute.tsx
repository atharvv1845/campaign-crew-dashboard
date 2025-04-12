
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole
}) => {
  const { user, loading, isInternalTeam, userRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is part of the internal team
  if (!isInternalTeam) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-destructive/10 p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold text-destructive">Access Restricted</h2>
          <p className="mb-4">This application is for Leveraged Growth team members only.</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // If a specific role is required, check if user has permission
  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-destructive/10 p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold text-destructive">Insufficient Permissions</h2>
          <p className="mb-4">
            You don't have the required permissions to access this page.
            {userRole && (
              <span className="block mt-2 font-medium">
                Your role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            )}
          </p>
          <button 
            onClick={() => window.location.href = '/dashboard'} 
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
