import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import axios from 'axios';

dayjs.locale('fr');

const CalendarPage = () => {
  const today = dayjs();
  const [currentWeek, setCurrentWeek] = useState(today.startOf('week').add(1, 'day')); // Commence lundi
  const [plannedRecipes, setPlannedRecipes] = useState({}); // { '2025-07-02': [ { id, title } ] }

  const loadPlannedRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/v1/planned/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const grouped = {};
      res.data.forEach((item) => {
        const date = dayjs(item.planned_date).format("YYYY-MM-DD");
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push({
          id: item.id,
          title: item.recipe_title
        });
      });

      setPlannedRecipes(grouped);
    } catch (err) {
      console.error("Erreur récupération recettes planifiées :", err);
    }
  };

  useEffect(() => {
    loadPlannedRecipes();
  }, []);

  const handleDelete = async (planId) => {
    if (!window.confirm("Supprimer cette recette planifiée ?")) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8000/api/v1/planned/${planId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        alert("Recette supprimée !");
        loadPlannedRecipes(); // recharge les données
      } else {
        const data = await res.json();
        alert(data.detail || "Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau lors de la suppression");
    }
  };

  const startOfWeek = currentWeek;
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  const canGoPrev = today.diff(startOfWeek, 'week') <= 0;
  const canGoNext = startOfWeek.diff(today, 'week') <= 4;

  const handlePrevWeek = () => {
    if (canGoPrev) setCurrentWeek(currentWeek.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    if (canGoNext) setCurrentWeek(currentWeek.add(1, 'week'));
  };

  return (
    <div className="min-h-screen pb-24 bg-white px-4 pt-4">
      {/* Header flèches + jours */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <button onClick={handlePrevWeek} disabled={!canGoPrev} className="text-xl font-bold disabled:opacity-30">←</button>
        <div className="flex-1 flex justify-around text-center text-sm">
          {days.map((day, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-medium text-xs">{day.format('dd').charAt(0)}</span>
              <span className="text-xs">{day.format('D')}</span>
              {day.isSame(today, 'day') && <span className="text-xs text-green-600">●</span>}
            </div>
          ))}
        </div>
        <button onClick={handleNextWeek} disabled={!canGoNext} className="text-xl font-bold disabled:opacity-30">→</button>
      </div>

      {/* Liste jour par jour */}
      {days.map((day) => {
        const key = day.format('YYYY-MM-DD');
        const recettes = plannedRecipes[key] || [];

        return (
          <div key={key} className="mb-3">
            <h2 className="font-bold text-sm text-gray-700">
              {day.format('D MMMM').toUpperCase()} <span className="text-gray-400">{day.format('dddd')}</span>
              {day.isSame(today, 'day') && <span className="text-green-600 ml-2">- Aujourd’hui</span>}
            </h2>
            <ul className="ml-4 list-disc text-sm text-gray-600">
              {recettes.map((recette, i) => (
                <li key={i} className="flex items-center justify-between pr-2">
                  <span>{recette.title}</span>
                  <button
                    onClick={() => handleDelete(recette.id)}
                    className="text-red-600 text-xs ml-2"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
