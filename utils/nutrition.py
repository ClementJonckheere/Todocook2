"""Nutrition related helper functions."""

# TODO: integrate with nutrition data provider APIs

import json
from pathlib import Path
from typing import Dict

import requests


DATA_DIR = Path("data")


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
        response = requests.get(url, params=params, timeout=timeout)
        response.raise_for_status()
    except requests.RequestException as exc:
        raise RuntimeError(f"Failed to fetch nutrition data: {exc}")
    data = response.json()
    products = data.get("products") or []
    if not products:
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