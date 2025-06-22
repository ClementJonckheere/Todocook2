from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db
from ml.recommender import suggest_recipes
from models.ingredient import Ingredient as IngredientModel
from models.recipe import Recipe as RecipeModel
from schemas.recipe import Recipe, RecipeCreate

router = APIRouter()


@router.get("/", response_model=List[Recipe])
def read_recipes(db: Session = Depends(get_db)):
    return db.query(RecipeModel).all()


@router.post("/", response_model=Recipe)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = RecipeModel(title=recipe.title, description=recipe.description)
    for ing in recipe.ingredients:
        db_recipe.ingredients.append(IngredientModel(**ing.dict()))
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


@router.get("/suggested", response_model=List[Recipe])
def suggested_recipes(user_id: int, db: Session = Depends(get_db)):
    """Return recipes recommended for the given user."""
    return suggest_recipes(user_id, db)


@router.get("/{recipe_id}", response_model=Recipe)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = db.query(RecipeModel).get(recipe_id)
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe


@router.put("/{recipe_id}", response_model=Recipe)
def update_recipe(recipe_id: int, recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = db.query(RecipeModel).get(recipe_id)
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db_recipe.title = recipe.title
    db_recipe.description = recipe.description
    db_recipe.ingredients = [IngredientModel(**ing.dict()) for ing in recipe.ingredients]
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


@router.delete("/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = db.query(RecipeModel).get(recipe_id)
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(db_recipe)
    db.commit()
    return {"ok": True}
