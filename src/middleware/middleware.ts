import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TokenService from '../lib/localStorageService';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC = () => {
  const token = TokenService.getToken();

  // If token exists, render the child route; otherwise, redirect to login
  return token
    ? React.createElement(typeof Outlet)
    : React.createElement(typeof Navigate);
};

export default ProtectedRoute;
