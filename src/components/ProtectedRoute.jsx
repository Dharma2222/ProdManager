// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute guards its child routes (via <Outlet />) based on auth state.
 * If no valid token/user, it redirects to the specified path (e.g. /login).
 */
export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
