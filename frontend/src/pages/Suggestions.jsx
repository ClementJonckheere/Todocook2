import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const RecipeSuggestions = () => {
  const [recipes, setRecipes] = useState([]);
  const [missingFilter, setMissingFilter] = useState("0");

  useEffect(() => {
    axios.get("/recipes/suggestions/").then((res) => {
      setRecipes(res.data);
    });
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const nbMissing = recipe.missing_products.length;
    if (missingFilter === "0") return nbMissing === 0;
    if (missingFilter === "1") return nbMissing === 1;
    if (missingFilter === "2+") return nbMissing > 1;
    return true;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Suggestions de recettes</h2>

      <div className="mb-4 flex gap-4">
        <label>Filtrer par ingrédients manquants :</label>
        <select
          value={missingFilter}
          onChange={(e) => setMissingFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="0">0 ingrédient manquant</option>
          <option value="1">1 ingrédient manquant</option>
          <option value="2+">2 ou plus</option>
          <option value="all">Afficher tout</option>
        </select>
      </div>

      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.recipe_id} recipe={recipe} />
        ))
      ) : (
        <p>Aucune recette disponible pour ce filtre.</p>
      )}
    </div>
  );
};

export default RecipeSuggestions;
