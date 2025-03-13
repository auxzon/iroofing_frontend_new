/* eslint-disable react/prop-types */
// ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from '../redux/slices/auth';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const location = useLocation();

  // Not authenticated - redirect to login`
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/" 
        state={{ 
          from: location.pathname,
          message: "Please log in to access this page" 
        }} 
        replace 
      />
    );
  }

  // Check if role is valid and included in allowedRoles
  const isRoleValid = userRole && 
    Array.isArray(allowedRoles) && 
    allowedRoles.includes(userRole);

  // Role not authorized - redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !isRoleValid) {
    let fallbackPath;
    
    switch (userRole) {
      case 'admin':
        fallbackPath = '/admin/';
        break;
      case 'sales':
        fallbackPath = '/sales/';
        break;
        case 'rates':
          fallbackPath = '/rates/materials';
          break;
      default:
        fallbackPath = '/';
    }

    return (
      <Navigate 
        to={fallbackPath} 
        state={{ 
          from: location.pathname,
          message: "You don't have permission to access this page" 
        }} 
        replace 
      />
    );
  }

  return children;
};