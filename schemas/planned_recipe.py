from datetime import date
from pydantic import BaseModel

class PlannedRecipeCreate(BaseModel):
    recipe_id: int
    planned_date: date

class PlannedRecipeRead(BaseModel):
    id: int
    recipe_id: int
    planned_date: date

    class Config:
        orm_mode = True
