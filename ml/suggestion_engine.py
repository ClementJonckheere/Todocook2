from typing import List, Dict
from collections import defaultdict

from sqlalchemy.orm import Session
from models.recipe import Recipe
from models.recipe_ingredient import RecipeIngredient
from models.user_inventory import UserInventory
from models.consumption_log import ConsumptionLog
from models.product_cache import ProductCache



def get_user_stock(db: Session, user_id: int) -> set:
    """
    Retourne l'ensemble des IDs de produits présents dans le stock utilisateur.
    """
    inventory = db.query(UserInventory).filter(UserInventory.user_id == user_id).all()
    return {item.product_id for item in inventory}


def get_user_history(db: Session, user_id: int) -> Dict[int, int]:
    """
    Retourne un dictionnaire {recipe_id: fréquence} basé sur l'historique de consommation.
    """
    history = defaultdict(int)
    logs = db.query(ConsumptionLog).filter(ConsumptionLog.user_id == user_id).all()
    for log in logs:
        if log.recipe_id:
            history[log.recipe_id] += 1
    return history


def get_all_recipes_with_ingredients(db: Session) -> List[Dict]:
    """
    Récupère toutes les recettes avec leurs ingrédients associés.
    """
    recipes = db.query(Recipe).all()
    results = []

    for recipe in recipes:
        ingredients = db.query(RecipeIngredient).filter(
            RecipeIngredient.recipe_id == recipe.id
        ).all()
        ingredient_ids = {ing.product_id for ing in ingredients}

        results.append({
            "recipe": recipe,
            "ingredient_ids": ingredient_ids
        })

    return results


def score_recipe(ingredient_ids, user_stock, user_history, recipe_id):
    """
    Calcule un score de pertinence pour une recette donnée.
    """
    nb_in_stock = len(ingredient_ids & user_stock)
    nb_missing = len(ingredient_ids - user_stock)
    total_ingredients = len(ingredient_ids)
    history_score = user_history.get(recipe_id, 0)

    is_easy = total_ingredients <= 5

    score = (
        3 * nb_in_stock
        - 2 * nb_missing
        + (1 if is_easy else 0)
        + 2 * history_score
    )

    return score


def suggest_recipes(user_id: int, db: Session, max_missing: int = 2) -> List[Dict]:
    """
    Suggère des recettes selon les produits en stock utilisateur.
    Traduit automatiquement les noms des produits manquants ou non nommés.
    """
    inventory = db.query(UserInventory).filter(UserInventory.user_id == user_id).all()
    inventory_ids = {item.product_cache_id for item in inventory if item.product_cache_id}

    recipes = db.query(Recipe).all()
    suggestions = []

    for recipe in recipes:
        ingredients = db.query(RecipeIngredient).filter(RecipeIngredient.recipe_id == recipe.id).all()
        required_ids = {ing.product_cache_id for ing in ingredients if ing.product_cache_id}

        missing_ids = required_ids - inventory_ids
        available_ids = required_ids & inventory_ids

        match_score = (len(required_ids) - len(missing_ids)) / len(required_ids) if required_ids else 0.0

        if len(missing_ids) <= max_missing:
            # 🔄 Récupération des noms manquants
            missing_names = []
            for pid in missing_ids:
                product = db.query(ProductCache).filter(ProductCache.id == pid).first()
                if not product:
                    name = fetch_product_name_from_api(pid)
                    product = ProductCache(id=pid, name=name)
                    db.add(product)
                    db.commit()
                elif not product.name:
                    product.name = fetch_product_name_from_api(pid)
                    db.commit()
                missing_names.append(product.name)

            # 🔄 Récupération des noms disponibles
            available_names = []
            for pid in available_ids:
                product = db.query(ProductCache).filter(ProductCache.id == pid).first()
                if not product:
                    name = fetch_product_name_from_api(pid)
                    product = ProductCache(id=pid, name=name)
                    db.add(product)
                    db.commit()
                elif not product.name:
                    product.name = fetch_product_name_from_api(pid)
                    db.commit()
                available_names.append(product.name)

            suggestions.append({
                "recipe_id": recipe.id,
                "title": recipe.title,
                "match_score": round(match_score, 2),
                "missing_ingredients": missing_names,
                "available_ingredients": available_names,
                "score": int(match_score * 10) + len(available_names)  # optionnel
            })

    suggestions.sort(key=lambda x: (-x["match_score"], len(x["missing_ingredients"])))
    return suggestions
