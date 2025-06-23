from sqlalchemy.orm import Session
from models.recipe import Recipe
from models.recipe_ingredient import RecipeIngredient
from models.user_inventory import UserInventory

def get_suggestions_for_user(user_id: int, db: Session, max_missing: int = 0):
    # Récupérer les produits en stock pour l'utilisateur
    stock_ids = db.query(UserInventory.product_cache_id).filter(
        UserInventory.user_id == user_id,
        UserInventory.product_cache_id.isnot(None)
    ).distinct()

    stock_set = {row[0] for row in stock_ids}

    # Récupérer toutes les recettes et leurs ingrédients
    recipes = db.query(Recipe).all()
    suggestions = []

    for recipe in recipes:
        ingredients = db.query(RecipeIngredient.product_cache_id).filter(
            RecipeIngredient.recipe_id == recipe.id
        ).all()

        ingredient_set = {row[0] for row in ingredients}
        missing = ingredient_set - stock_set

        if len(missing) <= max_missing:
            suggestions.append({
                "recipe_id": recipe.id,
                "title": recipe.title,
                "missing_count": len(missing),
                "missing": list(missing)
            })

    # Tri par nombre d’ingrédients manquants (les plus proches en premier)
    suggestions.sort(key=lambda x: x["missing_count"])
    return suggestions
