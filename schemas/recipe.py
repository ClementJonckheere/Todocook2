"""Pydantic models for recipe endpoints."""

from typing import List, Optional

from pydantic import BaseModel

from .ingredient import Ingredient, IngredientCreate


class RecipeBase(BaseModel):
    """Common attributes shared by recipe schemas."""

    title: str
    description: Optional[str] = None


class RecipeCreate(RecipeBase):
    """Schema for creating a new recipe."""

    ingredients: List[IngredientCreate] = []


class Recipe(RecipeBase):
    """Schema returned from the API."""

    id: int
    owner_id: Optional[int] = None
    ingredients: List[Ingredient] = []

    class Config:
        from_attributes = True
