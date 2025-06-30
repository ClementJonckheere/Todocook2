import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  // Temporairement, on considère que l'utilisateur est toujours connecté
  const isLoggedIn = true;

  return isLoggedIn ? children : <div>Non autorisé (à remplacer plus tard)</div>;
}
