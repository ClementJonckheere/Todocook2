import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    toast.error("Vous devez être connecté pour accéder à cette page.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
