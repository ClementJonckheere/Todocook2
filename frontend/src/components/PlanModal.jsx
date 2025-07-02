import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const PlanModal = ({ isOpen, onClose, onConfirm, recipeTitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsSuccess(false);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Merci de choisir une date");
      return;
    }
    onConfirm(selectedDate);
    setSelectedDate("");
    setIsSuccess(true);

    // Ferme automatiquement la modale après 2 secondes
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen && !isVisible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 backdrop-blur-sm ${
        isOpen ? "bg-black/40 opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md transform transition-all duration-200 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-green-500 text-4xl animate-bounce">✅</div>
            <p className="text-green-700 mt-2 font-semibold">Recette planifiée !</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">
              Planifier : <span className="text-blue-700">{recipeTitle}</span>
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                <span className="text-sm text-gray-700">Choisis une date</span>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]}
                  required
                />
              </label>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Planifier
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PlanModal;
