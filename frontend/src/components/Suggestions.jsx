import { useEffect, useState } from "react";
import api from "../api.js";

export default function Suggestions() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("Utilisateur non connecté");
            return;
        }
        api.get("/recipes/suggested", { params: { user_id: userId } })
            .then((res) => setRecipes(res.data))
            .catch((err) =>
                setError(err.response?.data?.detail || err.message)
            );
    }, []);

    return (
        <div>
            <h2>Suggestions</h2>
            {error && <p>{error}</p>}
            <ul>
                {recipes.map((r) => (
                    <li key={r.id}>{r.title}</li>
                ))}
            </ul>
        </div>
    );
}
