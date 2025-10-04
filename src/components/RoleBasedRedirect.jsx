import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleBasedRedirect = () => {
  const { userRole } = useAuth();

  // Redirect based on user role
  if (userRole === "pt") {
    return <Navigate to="/pt-home" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default RoleBasedRedirect;
