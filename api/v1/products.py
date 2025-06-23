# api/v1/products.py

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from db.session import get_db
from services.product_search import get_product_by_name

router = APIRouter()

@router.get("/products/search")
def search_product(name: str = Query(..., min_length=2), db: Session = Depends(get_db)):
    return get_product_by_name(db, name)
