import { useState } from "react";
import axios from "axios";

export default function ProductSearch() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [manual, setManual] = useState({ name: "", calories: "", brand: "" });
    const [message, setMessage] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await axios.get(`/api/v1/products/search?name=${query}`);
            setResult(res.data);
        } catch (err) {
            setMessage("Erreur lors de la recherche.");
        }
    };

const handleManualSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        const response = await axios.post("/api/v1/user-products/", {
            user_id: 1,
            name: manual.name,
            brand: manual.brand,
            calories: parseFloat(manual.calories),
        });
        setMessage("Produit ajouté avec succès !");
        setManual({ name: "", brand: "", calories: "" });
    } catch (error) {
        setMessage("Erreur lors de l'ajout du produit personnalisé.");
    }
};


    return (
        <div>
            <h2>Rechercher un produit</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Nom du produit"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                />
                <button type="submit">Rechercher</button>
            </form>

            {message && <p>{message}</p>}

            {result && result.found && (
                <div>
                    <h3>Produit trouvé ({result.source === "cache" ? "en cache" : "via API"})</h3>
                    <p><strong>Nom :</strong> {result.name}</p>
                    <p><strong>Calories :</strong> {result.calories}</p>
                </div>
            )}

            {result && !result.found && (
                <div>
                    <h3>Aucun produit trouvé. Ajouter manuellement :</h3>
                    <form onSubmit={handleManualSubmit}>
                        <input
                            type="text"
                            placeholder="Nom"
                            value={manual.name}
                            onChange={(e) => setManual({ ...manual, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Marque"
                            value={manual.brand}
                            onChange={(e) => setManual({ ...manual, brand: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Calories"
                            value={manual.calories}
                            onChange={(e) => setManual({ ...manual, calories: e.target.value })}
                            required
                        />
                        <button type="submit">Ajouter</button>
                    </form>
                </div>
            )}
        </div>
    );
}
