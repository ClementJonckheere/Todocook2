from pydantic import BaseModel


class UserIngredientBase(BaseModel):
    user_id: int
    ingredient_id: int
    quantity_grams: float


class UserIngredientCreate(UserIngredientBase):
    pass


class UserIngredient(UserIngredientBase):
    class Config:
        from_attributes = True

