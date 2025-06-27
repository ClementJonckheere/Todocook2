import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toast.success("Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
      🔓 Déconnexion
    </button>
  );
};

export default LogoutButton;
