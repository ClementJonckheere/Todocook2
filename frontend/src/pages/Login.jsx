// src/pages/Login.jsx
import { useState } from "react";
import api from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/users", { email, name });
            setMessage("Utilisateur créé : " + res.data.name);
        } catch (err) {
            setMessage("Erreur : " + err.response?.data?.detail || err.message);
        }
    };

    return (
        <div>
            <h2>Créer un utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Envoyer</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
