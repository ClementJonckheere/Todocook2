// src/pages/ScannerPage.jsx
import { useState } from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import { toast } from "react-toastify";

function ScannerPage() {
  const [product, setProduct] = useState(null);

  const handleScan = async (barcode) => {
    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await res.json();

      if (data.status === 1) {
        setProduct(data.product);
        toast.success("Produit trouvé !");
        // TODO : envoyer à l'API pour ajout dans le garde-manger
      } else {
        toast.error("Produit non trouvé dans la base OpenFoodFacts.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du produit", error);
      toast.error("Erreur lors de la récupération.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Scanner un produit</h2>
      <BarcodeScanner onScanSuccess={handleScan} />

      {product && (
        <div style={{ marginTop: "1rem" }}>
          <h3>{product.product_name}</h3>
          <p>{product.brands}</p>
          <p>Calories pour 100g : {product.nutriments?.energy_kcal_100g || "?"}</p>
        </div>
      )}
    </div>
  );
}

export default ScannerPage;
