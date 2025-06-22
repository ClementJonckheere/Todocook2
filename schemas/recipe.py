from typing import List, Optional
from pydantic import BaseModel
from .ingredient import Ingredient, IngredientCreate

class RecipeBase(BaseModel):
    title: str
    description: Optional[str] = None

class RecipeCreate(RecipeBase):
    ingredients: List[IngredientCreate] = []

class Recipe(RecipeBase):
    id: int
    owner_id: Optional[int] = None
    ingredients: List[Ingredient] = []

    class Config:
        from_attributes = True
