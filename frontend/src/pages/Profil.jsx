import React, { useEffect, useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import CaloriesBarChart from "../components/CaloriesBarChart";
import HistoryCalories from "../components/HistoryCalories";
import CaloriesGauge from "../components/CaloriesGauge";


const Profil = () => {
  const [profile, setProfile] = useState(null);
  const [newThreshold, setNewThreshold] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/users/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error("Erreur profil :", err);
        navigate("/login");
      });
  }, [navigate]);

  const updateThreshold = async () => {
    try {
      await axios.put(`/users/${profile.id}/threshold`, {
        calorie_threshold: parseFloat(newThreshold)
      });
      setProfile({ ...profile, calorie_threshold: parseFloat(newThreshold) });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setNewThreshold("");
    } catch (err) {
      console.error("Erreur de mise à jour du seuil :", err);
    }
  };

  if (!profile) return <p>Chargement...</p>;

  const isOverThreshold = profile.today_calories > profile.calorie_threshold;

  return (
    <div className="profile-container max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">👤 Profil utilisateur</h2>
      <p><strong>Email :</strong> {profile.email}</p>
      <p><strong>Nom d'utilisateur :</strong> {profile.username || "—"}</p>
      <p className={isOverThreshold ? "text-red-500 font-semibold" : ""}>
        <strong>Calories aujourd'hui :</strong> {profile.today_calories} kcal
      </p>
      <p><strong>Moyenne sur 30 jours :</strong> {profile.average_daily_calories} kcal</p>

      <div className="mt-4">
        <label className="block mb-1 font-medium">🔧 Seuil calorique journalier :</label>
        <p className="mb-2">Actuel : {profile.calorie_threshold} kcal</p>
        <input
          type="number"
          value={newThreshold}
          onChange={(e) => setNewThreshold(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Nouveau seuil"
        />
        <button onClick={updateThreshold} className="bg-blue-500 text-white px-4 py-2 rounded">
          Mettre à jour
        </button>
        {success && <p className="text-green-500 mt-2">✅ Seuil mis à jour avec succès</p>}
      </div>

      <CaloriesBarChart userId={profile.id} />
        <CaloriesGauge todayCalories={profile.today_calories} threshold={profile.calorie_threshold} />

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

      <HistoryCalories userId={profile.id} />
    </div>
  );
};

export default Profil;
