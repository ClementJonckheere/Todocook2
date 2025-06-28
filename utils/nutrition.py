"""Nutrition related helper functions."""

# TODO: integrate with nutrition data provider APIs

import json
from pathlib import Path
from typing import Dict

from api.v1 import products

try:  # pragma: no cover - optional dependency
    import requests
except Exception:  # pragma: no cover - requests may be unavailable
    requests = None

import urllib.parse
import urllib.request


DATA_DIR = Path("data")


def _fetch_json(url: str, params: Dict, timeout: int) -> Dict:
    """Return JSON from HTTP GET using requests or urllib."""
    if requests is not None:
        response = requests.get(url, params=params, timeout=timeout)
        response.raise_for_status()
        return response.json()

    query = urllib.parse.urlencode(params)
    with urllib.request.urlopen(f"{url}?{query}", timeout=timeout) as resp:
        if resp.status >= 400:
            raise RuntimeError(f"HTTP {resp.status}")
        return json.loads(resp.read().decode())


def search_ingredient(name: str, timeout: int = 10) -> Dict:
    """Query the OpenFoodFacts API for a product and return its nutriments."""
    url = "https://world.openfoodfacts.org/cgi/search.pl"
    params = {
        "search_terms": name,
        "search_simple": 1,
        "action": "process",
        "json": 1,
    }
    try:
        data = _fetch_json(url, params, timeout)
        print("📦 Données brutes reçues d’OpenFoodFacts :", json.dumps(data, indent=2))
    except Exception as exc:  # pragma: no cover - network failures
        raise RuntimeError(f"Failed to fetch nutrition data: {exc}")

    product = products[0]
    result = {
        "name": product.get("product_name", name),
        "brand": product.get("brands"),
        "categories": product.get("categories"),
        "image_url": product.get("image_url"),
        "nutriments": {
            "energy": product["nutriments"].get("energy-kcal_100g"),
            "fat": product["nutriments"].get("fat_100g"),
            "saturated_fat": product["nutriments"].get("saturated-fat_100g"),
            "carbohydrates": product["nutriments"].get("carbohydrates_100g"),
            "sugars": product["nutriments"].get("sugars_100g"),
            "fiber": product["nutriments"].get("fiber_100g"),
            "proteins": product["nutriments"].get("proteins_100g"),
            "salt": product["nutriments"].get("salt_100g"),
        }
    }
    if not products:
        print("⚠️ Aucun produit trouvé pour :", name)
        return {}

    product = products[0]
    result = {
        "name": product.get("product_name", name),
        "nutriments": product.get("nutriments", {}),
    }

    DATA_DIR.mkdir(exist_ok=True)
    file_name = name.replace(" ", "_").lower() + ".json"
    with (DATA_DIR / file_name).open("w") as f:
        json.dump(result, f)

    return result
