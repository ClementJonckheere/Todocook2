import { useEffect, useState } from "react";
import api from "../api.js";

export default function RecipesList() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");

    const fetchRecipes = () => {
        api.get("/recipes")
            .then((res) => setRecipes(res.data))
            .catch((err) =>
                setError(err.response?.data?.detail || err.message)
            );
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div>
            <h2>Recipes List</h2>
            {error && <p>{error}</p>}
            <button onClick={fetchRecipes}>Refresh</button>
            <ul>
                {recipes.map((r) => (
                    <li key={r.id}>{r.title}</li>
                ))}
            </ul>
        </div>
    );
}
