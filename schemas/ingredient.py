from typing import Optional
from pydantic import BaseModel

class IngredientBase(BaseModel):
    name: str
    quantity: Optional[str] = None
    calories: Optional[float] = None
    proteins: Optional[float] = None
    carbs: Optional[float] = None
    fats: Optional[float] = None

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: int

    class Config:
        from_attributes = True
