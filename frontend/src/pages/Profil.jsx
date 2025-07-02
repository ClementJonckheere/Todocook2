import React, { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import CaloriesBarChart from "../components/CaloriesBarChart";

const Profil = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/users/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error("Erreur profil :", err);
        navigate("/login");
      });
  }, [navigate]);

  if (!profile) return <p>Chargement...</p>;

  return (
    <div className="profile-container max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">👤 Profil utilisateur</h2>
      <p><strong>Email :</strong> {profile.email}</p>
      <p><strong>Nom d'utilisateur :</strong> {profile.username || "—"}</p>
      <p><strong>Calories aujourd'hui :</strong> {profile.today_calories} kcal</p>
      <p><strong>Moyenne sur 30 jours :</strong> {profile.average_daily_calories} kcal</p>

      <CaloriesBarChart userId={profile.id} />

      <h3 className="text-lg font-semibold mt-6 mb-2">Recettes créées :</h3>
      {profile.recipes.length === 0 ? (
        <p>Aucune recette enregistrée.</p>
      ) : (
        <ul className="list-disc list-inside">
          {profile.recipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.title}</strong> – {recipe.description || "Pas de description"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profil;
