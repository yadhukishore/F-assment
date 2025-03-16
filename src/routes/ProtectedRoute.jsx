
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Navigate } from 'react-router-dom';
import { isAuthenticatedAtom, userAtom } from '../atom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    // Check if we have tokens in localStorage to restore session
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isAuthenticated) {
      // If we have a token but not authenticated in state, restore the auth state
      setIsAuthenticated(true);
      
      // Optional: You could fetch user data here to restore the full user state
      // This depends on if your API has an endpoint to get the current user
    }
  }, [isAuthenticated, setIsAuthenticated, setUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;