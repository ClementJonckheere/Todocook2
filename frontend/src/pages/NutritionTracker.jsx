import ConsumptionForm from "../components/ConsumptionForm";
import NutritionStats from "../components/NutritionStats";
import ConsumptionHistory from "../components/ConsumptionHistory";

export default function NutritionTracker() {
    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h1>Suivi nutritionnel</h1>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Ajouter une consommation</h2>
                <ConsumptionForm />
            </section>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Mes statistiques</h2>
                <NutritionStats />
            </section>

            <section>
                <ConsumptionHistory />
            </section>
        </div>
    );
}

