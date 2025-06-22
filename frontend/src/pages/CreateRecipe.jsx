import { useState } from "react";
import api from "../api";

export default function CreateRecipe() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/recipes", { title, description, ingredients: [] });
            setMessage("Recette créée");
            setTitle("");
            setDescription("");
        } catch (err) {
            setMessage(err.response?.data?.detail || err.message);
        }
    };

    return (
        <div>
            <h2>Créer une recette</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Envoyer</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
