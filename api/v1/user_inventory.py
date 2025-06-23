from fastapi import APIRouter, Depends, Query, HTTPException, Path
from sqlalchemy.orm import Session
from db.session import get_db
from models.user_inventory import UserInventory
from models.product_cache import ProductCache
from models.user_product import UserProduct
from schemas.user_inventory import InventoryAdd

router = APIRouter()

@router.post("/user-inventory/")
def add_to_inventory(payload: InventoryAdd, db: Session = Depends(get_db)):
    if not payload.product_cache_id and not payload.user_product_id:
        return {"error": "Un produit doit être spécifié."}

    item = UserInventory(
        user_id=payload.user_id,
        product_cache_id=payload.product_cache_id,
        user_product_id=payload.user_product_id,
        quantity=payload.quantity,
        unit=payload.unit
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"message": "Produit ajouté au stock", "id": item.id}


@router.delete("/user-inventory/{inventory_id}")
def delete_from_inventory(inventory_id: int = Path(...), db: Session = Depends(get_db)):
    item = db.query(UserInventory).filter(UserInventory.id == inventory_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Produit en stock non trouvé")

    db.delete(item)
    db.commit()
    return {"message": "Produit supprimé du stock"}