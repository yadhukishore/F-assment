// src/routes/ProtectedRoute.jsx

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Navigate } from 'react-router-dom';
import { isAuthenticatedAtom, userAtom } from '../atom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isAuthenticated) {

      setIsAuthenticated(true);

    }
  }, [isAuthenticated, setIsAuthenticated, setUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;