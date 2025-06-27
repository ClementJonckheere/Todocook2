from typing import List, Dict
from sqlalchemy.orm import Session
from models.recipe import Recipe
from models.recipe_ingredient import RecipeIngredient
from models.user_inventory import UserInventory
from models.product_cache import ProductCache

def suggest_recipes(user_id: int, db: Session, max_missing: int = 2) -> List[Dict]:
    # Récupération de l'inventaire utilisateur
    inventory = db.query(UserInventory).filter(UserInventory.user_id == user_id).all()
    inventory_ids = {item.product_cache_id for item in inventory if item.product_cache_id}

    # Préparation des suggestions
    recipes = db.query(Recipe).all()
    suggestions = []

    for recipe in recipes:
        ingredients = db.query(RecipeIngredient).filter(RecipeIngredient.recipe_id == recipe.id).all()
        required_ids = {ing.product_cache_id for ing in ingredients}

        missing_ids = required_ids - inventory_ids
        match_score = (len(required_ids) - len(missing_ids)) / len(required_ids) if required_ids else 0.0

        if len(missing_ids) <= max_missing:
            missing_names = []
            if missing_ids:
                missing_products = db.query(ProductCache).filter(ProductCache.id.in_(missing_ids)).all()
                missing_names = [p.name for p in missing_products]

            suggestions.append({
                "recipe_id": recipe.id,
                "title": recipe.title,
                "match_score": round(match_score, 2),
                "missing_ingredients": missing_names
            })

    # Tri par score décroissant, puis par nombre d’ingrédients manquants
    suggestions.sort(key=lambda x: (-x["match_score"], len(x["missing_ingredients"])))
    return suggestions
