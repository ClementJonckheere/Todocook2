# services/product_search.py

from sqlalchemy.orm import Session
from models.product_cache import ProductCache
from utils.nutrition import search_ingredient

def get_product_by_name(db: Session, name: str):
    # 1. Recherche dans le cache
    cached = db.query(ProductCache).filter(ProductCache.name.ilike(f"%{name}%")).first()
    if cached:
        return {"found": True, "source": "cache", "name": cached.name, "calories": cached.calories, "brand": cached.brand}

    # 2. Sinon, appel à OpenFoodFacts
    try:
        result = search_ingredient(name)
        nutriments = result.get("nutriments", {})
        calories = nutriments.get("energy-kcal_100g") or nutriments.get("energy-kcal")

        if calories:
            # Mise en cache
            cache = ProductCache(name=result["name"], calories=calories)
            db.add(cache)
            db.commit()
            db.refresh(cache)

            return {"found": True, "source": "api", "name": result["name"], "calories": calories}
    except Exception as e:
        print(f"Erreur API : {e}")

    # 3. Fallback
    return {"found": False, "message": f"Aucun résultat trouvé pour '{name}'."}
