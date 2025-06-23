from pydantic import BaseModel
from typing import Optional

class RecipeIngredientBase(BaseModel):
    product_cache_id: int
    quantity: float
    unit: str = "unit"

class RecipeIngredientCreate(RecipeIngredientBase):
    pass

class RecipeIngredientRead(RecipeIngredientBase):
    id: int
    recipe_id: int

    class Config:
        orm_mode = True
