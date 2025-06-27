from utils.nutrition import search_ingredient
import json

if __name__ == "__main__":
    query = "coca cola"  # essaie aussi "nutella", "banane", "pâtes"
    data = search_ingredient(query)

    print("Produit trouvé :")
    print(json.dumps(data, indent=2))
