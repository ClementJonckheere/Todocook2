import React, { useEffect, useState } from "react";
import axios from "../api";

const HistoryCalories = ({ userId }) => {
  const [history, setHistory] = useState({});

  useEffect(() => {
    axios.get(`/consumption/history?user_id=${userId}`)
      .then(res => {
        const grouped = {};
        res.data.forEach(entry => {
          if (!grouped[entry.date]) grouped[entry.date] = [];
          grouped[entry.date].push(entry);
        });
        setHistory(grouped);
      })
      .catch(err => console.error("Erreur historique :", err));
  }, [userId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">🕓 Historique de consommation</h3>
      {Object.keys(history).length === 0 ? (
        <p>Aucune donnée disponible.</p>
      ) : (
        Object.entries(history).map(([date, items]) => {
          const total = items.reduce((sum, i) => sum + i.calories, 0);
          return (
            <div key={date} className="mb-4">
              <h4 className="font-semibold text-gray-700">{date} – Total : {Math.round(total)} kcal</h4>
              <ul className="ml-4 list-disc text-sm">
                {items.map((item, i) => (
                  <li key={i}>
                    {item.quantity}× {item.name} – {Math.round(item.calories)} kcal
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HistoryCalories;
