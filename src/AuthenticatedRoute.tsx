import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function AuthenticatedRoute({ children }: { children: JSX.Element }) {
  const { user } = useSelector((state: RootState) => state.core);
  const location = useLocation();
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
export default AuthenticatedRoute;
