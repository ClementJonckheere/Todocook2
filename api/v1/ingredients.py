from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from utils.nutrition import search_ingredient
from models.ingredient import Ingredient as IngredientModel
from api.deps import get_db

router = APIRouter()

@router.post("/from-api")
def import_ingredient(name: str, db: Session = Depends(get_db)):
    existing = db.query(IngredientModel).filter(IngredientModel.name.ilike(name)).first()
    if existing:
        return existing

    data = search_ingredient(name)
    if not data:
        raise HTTPException(status_code=404, detail="Ingredient not found")

    nutriments = data.get("nutriments", {})
    ing = IngredientModel(
        name=data["name"],
        calories=nutriments.get("energy-kcal_100g"),
        proteins=nutriments.get("proteins_100g"),
        carbs=nutriments.get("carbohydrates_100g"),
        fats=nutriments.get("fat_100g"),
    )
    db.add(ing)
    db.commit()
    db.refresh(ing)
    return ing
