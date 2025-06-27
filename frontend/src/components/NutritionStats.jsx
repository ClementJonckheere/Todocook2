import { useEffect, useState } from "react";
import axios from "axios";

export default function NutritionStats() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");
    const userId = 1;

    useEffect(() => {
        axios
            .get(`/api/v1/consumption/stats?user_id=${userId}`)
            .then((res) => setStats(res.data))
            .catch(() => setError("Erreur lors du chargement des statistiques."));
    }, []);

    if (error) return <p>{error}</p>;

    return stats ? (
        <div>
            <p><strong>Calories consommées aujourd’hui :</strong> {stats.calories_today} kcal</p>
            <p><strong>Moyenne sur les 30 derniers jours :</strong> {stats.average_last_30_days} kcal</p>
        </div>
    ) : (
        <p>Chargement des statistiques...</p>
    );
}
