from pydantic import BaseModel
from typing import Optional

class UserProductCreate(BaseModel):
    user_id: int
    name: str
    brand: Optional[str] = None
    calories: float
