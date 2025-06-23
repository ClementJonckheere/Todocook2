import { useState, useEffect } from "react";
import axios from "axios";

export default function ConsumptionForm() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productType, setProductType] = useState(null); // "cache" ou "custom"
    const [quantity, setQuantity] = useState(1);
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    const userId = 1; // à remplacer si authentification

    useEffect(() => {
        axios
            .get(`/api/v1/user-inventory/?user_id=${userId}`)
            .then((res) => setProducts(res.data))
            .catch(() => setMessage("Erreur lors du chargement du stock."));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!selectedProductId || !productType) {
            setMessage("Veuillez sélectionner un produit.");
            return;
        }

        const payload = {
            user_id: userId,
            quantity: parseFloat(quantity),
            date: date || undefined,
            product_cache_id: productType === "cache" ? selectedProductId : null,
            user_product_id: productType === "custom" ? selectedProductId : null,
        };

        try {
            await axios.post("/api/v1/consumption/", payload);
            setMessage("Consommation enregistrée !");
            setSelectedProductId(null);
            setQuantity(1);
            setDate("");
        } catch {
            setMessage("Erreur lors de l'enregistrement.");
        }
    };

    return (
        <div>
            <h2>Ajouter une consommation</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Produit :</label>
                <select
                    value={selectedProductId || ""}
                    onChange={(e) => {
                        const [id, type] = e.target.value.split("-");
                        setSelectedProductId(parseInt(id));
                        setProductType(type);
                    }}
                    required
                >
                    <option value="">-- Sélectionner un produit --</option>
                    {products.map((prod, index) => (
                        <option key={index} value={`${prod.id}-${prod.source}`}>
                            {prod.name} ({prod.source})
                        </option>
                    ))}
                </select>

                <label>Quantité :</label>
                <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />

                <label>Date :</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}
