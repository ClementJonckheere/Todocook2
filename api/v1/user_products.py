from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.deps import get_db
from models.user_product import UserProduct
from schemas.user_product import UserProductCreate

router = APIRouter()

@router.post("/user-products/")
def create_user_product(payload: UserProductCreate, db: Session = Depends(get_db)):
    user_product = UserProduct(
        user_id=payload.user_id,
        custom_name=payload.name,
        custom_brand=payload.brand,
        custom_calories=payload.calories,
    )
    db.add(user_product)
    db.commit()
    db.refresh(user_product)
    return {"message": "Produit enregistré", "id": user_product.id}
