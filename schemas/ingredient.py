from typing import Optional
from pydantic import BaseModel

class IngredientBase(BaseModel):
    name: str
    quantity: Optional[str] = None

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: int

    class Config:
        orm_mode = True
