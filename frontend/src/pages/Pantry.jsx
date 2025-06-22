import { useEffect, useState } from "react";
import api from "../api";

export default function Pantry() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("Utilisateur non connecté");
            return;
        }
        api.get(`/users/${userId}/pantry`)
            .then((res) => setItems(res.data))
            .catch((err) =>
                setError(err.response?.data?.detail || err.message)
            );
    }, []);

    return (
        <div>
            <h2>Mon garde-manger</h2>
            {error && <p>{error}</p>}
            <ul>
                {items.map((it) => (
                    <li key={it.ingredient_id}>
                        {it.ingredient_id} : {it.quantity_grams}g
                    </li>
                ))}
            </ul>
        </div>
    );
}
