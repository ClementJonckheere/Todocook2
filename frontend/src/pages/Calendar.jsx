import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

const fakeData = {
  '2025-06-23': ['Pâtes carbonara', 'Pâtes carbonara'],
  '2025-06-24': ['Pâtes carbonara', 'Pâtes carbonara'],
  '2025-06-25': ['Pâtes carbonara', 'Pâtes carbonara'],
  '2025-06-26': ['Pâtes carbonara'],
  '2025-06-27': ['Pâtes carbonara', 'Pâtes carbonara'],
  '2025-06-28': ['Pâtes carbonara'],
  '2025-06-29': ['Pâtes carbonara']
};

const CalendarPage = () => {
  const today = dayjs();
  const [currentWeek, setCurrentWeek] = useState(today.startOf('week').add(1, 'day')); // Commence le lundi

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
        const recettes = fakeData[key] || [];
        return (
          <div key={key} className="mb-3">
            <h2 className="font-bold text-sm text-gray-700">
              {day.format('D MMMM').toUpperCase()} <span className="text-gray-400">{day.format('dddd')}</span>
              {day.isSame(today, 'day') && <span className="text-green-600 ml-2">- Aujourd’hui</span>}
            </h2>
            <ul className="ml-4 list-disc text-sm text-gray-600">
              {recettes.map((recette, i) => (
                <li key={i}>{recette}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
