import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const RequireAuth = () => {
  const location = useLocation();
  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    user !== null ? <Outlet /> : <Navigate to="/user/login" state={{ from: location }} replace />
  )
}

export default RequireAuth