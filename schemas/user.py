from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    calorie_threshold: Optional[float] = 2000

    class Config:
        orm_mode = True

class UserRegister(BaseModel):
    email: EmailStr
    password: str


class RecipeSummary(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

    class Config:
        orm_mode = True

class UserOut(BaseModel):
    id: int
    email: EmailStr
    username: Optional[str] = None
    recipes: List[RecipeSummary] = []

    average_daily_calories: Optional[float] = None
    today_calories: Optional[float] = None
    calorie_threshold: Optional[float] = 2000

    class Config:
        orm_mode = True

class ThresholdUpdate(BaseModel):
    calorie_threshold: float