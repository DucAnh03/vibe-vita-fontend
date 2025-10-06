import React from "react";
import ReactDOM from "react-dom/client";
import PThome from "../pages/PThome";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainerProfile from "../pages/TrainerProfile.jsx";
("../pages/TrainerProfile");
import "../pages/Update";
const RoleBasedRedirect = () => {
  const { userRole } = useAuth();
  {
    path: "/pt-home";
    element: <PThome />;
  }
  {
    path: "/pt-profile";
    element: <TrainerProfile />;
  }
  // Redirect based on user role
  if (userRole === "pt") {
    return <Navigate to="/pt-home" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default RoleBasedRedirect;
