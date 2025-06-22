from typing import Optional
from pydantic import BaseModel


class UserIngredientBase(BaseModel):
    user_id: int
    ingredient_id: int
    quantity: Optional[str] = None


class UserIngredientCreate(UserIngredientBase):
    pass


class UserIngredient(UserIngredientBase):
    id: int

    class Config:
        orm_mode = True
