"""Simple ingredient based recipe recommendation engine."""

from typing import List

from sqlalchemy.orm import Session

from models.user import User
from models.recipe import Recipe


def _recipe_score(recipe: Recipe, pantry_ids: set[int]) -> float:
    """Return the percentage of a recipe's ingredients present in the pantry."""
    if not recipe.ingredients:
        return 0.0
    recipe_ids = {ing.id for ing in recipe.ingredients}
    if not recipe_ids:
        return 0.0
    return len(recipe_ids & pantry_ids) / len(recipe_ids)


def suggest_recipes(user_id: int, db: Session, limit: int = 5) -> List[Recipe]:
    """Return recipes sorted by ingredient overlap with the user's pantry."""

    user: User | None = db.query(User).get(user_id)
    if user is None:
        return []

    pantry_ids = {item.ingredient_id for item in user.pantry}
    if not pantry_ids:
        return []

    recipes = db.query(Recipe).all()
    scored = [
        (recipe, _recipe_score(recipe, pantry_ids))
        for recipe in recipes
    ]
    scored.sort(key=lambda x: x[1], reverse=True)

    return [recipe for recipe, score in scored if score > 0][:limit]
