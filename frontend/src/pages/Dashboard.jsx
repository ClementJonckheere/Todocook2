import React, { useEffect, useState } from "react";
import axios from "../api";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/users/profile")
      .then(res => setProfile(res.data))
      .catch(err => console.error("Erreur chargement profil :", err));
  }, []);

  if (!profile) return <p className="text-center">Chargement...</p>;

  const seuilDepasse = profile.today_calories > profile.calorie_threshold;
  const percent = Math.min((profile.today_calories / profile.calorie_threshold) * 100, 150);

  // Détermine la couleur en fonction du % du seuil atteint
  const getColor = () => {
    if (percent >= 100) return "bg-red-500";
    if (percent >= 75) return "bg-orange-400";
    return "bg-green-500";
  };

  return (
    <div className="dashboard-container max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      {seuilDepasse && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          🔥 <strong>Attention :</strong> Vous avez dépassé votre seuil de {profile.calorie_threshold} kcal !
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">👋 Bonjour, {profile.username || profile.email}</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded shadow">
          <p className="text-sm text-gray-600">Calories aujourd’hui</p>
          <p className="text-xl font-semibold text-blue-600">{profile.today_calories} kcal</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <p className="text-sm text-gray-600">Seuil journalier</p>
          <p className="text-xl font-semibold text-gray-800">{profile.calorie_threshold} kcal</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm mb-1">Progression quotidienne :</p>
        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`${getColor()} h-5 transition-all duration-500`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{Math.round(percent)}% du seuil atteint</p>
      </div>

      {/* Place pour d’autres composants */}
      <p className="text-center text-sm text-gray-400 mt-8">
        Dashboard personnalisé – version beta
      </p>
    </div>
  );
};

export default Dashboard;
