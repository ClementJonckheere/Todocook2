import { useEffect, useState } from "react";
import axios from "axios";

export default function UserInventory() {
    const [inventory, setInventory] = useState([]);
    const [message, setMessage] = useState("");

    const userId = 1; // À remplacer par l'utilisateur connecté si tu gères l'auth

    const fetchInventory = async () => {
        try {
            const res = await axios.get(`/api/v1/user-inventory/?user_id=${userId}`);
            setInventory(res.data);
        } catch (err) {
            setMessage("Erreur lors du chargement du stock.");
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`/api/v1/user-inventory/${id}`);
            setMessage("Produit supprimé.");
            fetchInventory(); // Rafraîchir la liste
        } catch (err) {
            setMessage("Erreur lors de la suppression.");
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <div>
            <h2>Mon stock</h2>
            {message && <p>{message}</p>}
            {inventory.length === 0 ? (
                <p>Aucun produit en stock.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Marque</th>
                            <th>Calories</th>
                            <th>Quantité</th>
                            <th>Unité</th>
                            <th>Source</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.brand || "-"}</td>
                                <td>{item.calories}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit}</td>
                                <td>{item.source}</td>
                                <td>
                                    <button onClick={() => deleteItem(item.id)}>❌ Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
