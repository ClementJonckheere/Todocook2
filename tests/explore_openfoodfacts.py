from utils.nutrition import search_ingredient
import json

def print_all_fields(ingredient_name: str):
    # Appel de la fonction existante
    url = "https://world.openfoodfacts.org/cgi/search.pl"
    import requests
    params = {
        "search_terms": ingredient_name,
        "search_simple": 1,
        "action": "process",
        "json": 1
    }

    response = requests.get(url, params=params)
    data = response.json()
    products = data.get("products", [])

    if not products:
        print("❌ Aucun produit trouvé.")
        return

    product = products[0]
    print(f"\n🧾 Premier produit trouvé pour : '{ingredient_name}'\n")

    for key in sorted(product.keys()):
        value = product[key]
        print(f"{key}: {type(value).__name__} {'✔' if value else ''}")

if __name__ == "__main__":
    print_all_fields("coca cola")
