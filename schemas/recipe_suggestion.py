from typing import Optional
from pydantic import BaseModel


class RecipeSuggestionBase(BaseModel):
    user_id: int
    recipe_id: int
    score: Optional[float] = None


class RecipeSuggestionCreate(RecipeSuggestionBase):
    pass


class RecipeSuggestion(RecipeSuggestionBase):
    id: int

    class Config:
        orm_mode = True
