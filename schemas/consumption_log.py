from pydantic import BaseModel
from typing import Optional
from datetime import date
from pydantic import BaseModel
from typing import List

class ConsumptionCreate(BaseModel):
    user_id: int
    product_cache_id: Optional[int] = None
    user_product_id: Optional[int] = None
    quantity: float = 1.0
    date: Optional[date] = None

class StatResponse(BaseModel):
    calories_today: float
    average_last_30_days: float

class HistoryEntry(BaseModel):
    name: str
    quantity: float
    calories: float
    unit: str
    date: str

class HistoryList(BaseModel):
    __root__: List[HistoryEntry]

