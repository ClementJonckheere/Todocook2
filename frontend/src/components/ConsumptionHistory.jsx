import { useEffect, useState } from "react";
import axios from "axios";

export default function ConsumptionHistory() {
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");
    const userId = 1;

    useEffect(() => {
        axios
            .get(`/api/v1/consumption/history?user_id=${userId}`)
            .then((res) => setHistory(res.data))
            .catch(() => setError("Erreur lors du chargement de l'historique."));
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h3>Historique des consommations</h3>
            {history.length === 0 ? (
                <p>Aucune consommation enregistrée.</p>
            ) : (
                <ul>
                    {history.map((log, index) => (
                        <li key={index}>
                            <strong>{log.name}</strong> - {log.quantity} {log.unit} - {log.calories} kcal ({log.date})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
