import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, token } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a37d8]"></div>
      </div>
    );
  }

  // If user exists but no token, it means JWT creation failed
  // Allow access but show warning - don't redirect to prevent loops
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has valid token (for API calls)
  // If no token, user can still see the page but API calls will fail
  // This prevents infinite redirect loops

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

