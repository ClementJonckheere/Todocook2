from typing import List, Optional
from pydantic import BaseModel
from schemas.recipe_ingredient import RecipeIngredientCreate, RecipeIngredientRead

class RecipeBase(BaseModel):
    title: str
    description: Optional[str] = None

class RecipeCreate(RecipeBase):
    owner_id: int
    ingredients: List[RecipeIngredientCreate] = []

class RecipeUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    owner_id: Optional[int] = None
    ingredients: Optional[List[RecipeIngredientCreate]] = None

class Recipe(RecipeBase):
    id: int
    owner_id: Optional[int]
    ingredients: List[RecipeIngredientRead] = []

    class Config:
        orm_mode = True
