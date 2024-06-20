import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const token = useSelector(state => state.authentication.token);
  console.log('PrivateRoute token:', token);
  return token ? <Outlet /> : <Navigate to="/Signin" replace />;
};

export default PrivateRoute;
