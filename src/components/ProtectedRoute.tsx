import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RoutePaths } from '../config/routes';

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <>Loading...</>;
  } else if (!isAuthenticated) {
    return <Navigate to={RoutePaths.Info} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
