import { Navigate } from 'react-router-dom';

export default function ProtectedRoute ({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
