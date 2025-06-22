"""Utility functions for recipe data access."""

from sqlalchemy.orm import Session

from models.recipe import Recipe

# TODO: expand with create, update and delete helpers

def get_recipe(db: Session, recipe_id: int) -> Recipe | None:
    """Retrieve a recipe by ID."""
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()