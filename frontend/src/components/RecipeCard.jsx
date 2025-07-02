import { useState } from "react";
import PlanModal from "./PlanModal";
import axios from "axios";

const RecipeCard = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plannedDate, setPlannedDate] = useState(null);

  const handlePlanClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDate = async (date) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        "/api/v1/planned/",
        {
          recipe_id: recipe.recipe_id, // ou recipe.id selon la structure
          planned_date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlannedDate(date);
      setIsModalOpen(false);
      alert(`Recette "${recipe.title}" planifiée pour le ${date}`);
    } catch (error) {
      console.error("Erreur lors de la planification :", error);
      alert("Impossible de planifier la recette. Veuillez réessayer.");
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>

      <div className="text-sm text-gray-600 mb-1">
        Score de pertinence :{" "}
        <span className="font-bold">{(recipe.match_score * 100).toFixed(0)}%</span>
      </div>

      <div className="text-sm mb-1">
        Ingrédients manquants :{" "}
        <span
          className={
            recipe.missing_ingredients.length === 0
              ? "text-green-600 font-bold"
              : "text-red-600 font-semibold"
          }
        >
          {recipe.missing_ingredients.length}
        </span>
      </div>

      {recipe.available_ingredients?.length > 0 && (
        <div className="mt-2 text-sm text-gray-700">
          <span className="font-medium">Disponibles :</span>{" "}
          {recipe.available_ingredients.join(", ")}
        </div>
      )}

      {recipe.missing_ingredients?.length > 0 && (
        <div className="mt-1 text-sm text-gray-700">
          <span className="font-medium">Manquants :</span>{" "}
          {recipe.missing_ingredients.join(", ")}
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handlePlanClick}
          className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
        >
          {plannedDate ? `Planifiée le ${plannedDate}` : "Planifier cette recette"}
        </button>
      </div>

      <PlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDate}
        recipeTitle={recipe.title}
      />
    </div>
  );
};

export default RecipeCard;
