from pydantic import BaseModel
from typing import Optional

class InventoryAdd(BaseModel):
    user_id: int
    product_cache_id: Optional[int] = None
    user_product_id: Optional[int] = None
    quantity: float = 1.0
    unit: str = "unit"
