# api/v1/recipes.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db
from ml.recommender import suggest_recipes
from models.recipe import Recipe as RecipeModel
from models.recipe_ingredient import RecipeIngredient
from schemas.recipe import Recipe, RecipeCreate, RecipeUpdate
from schemas.recipe_ingredient import RecipeIngredientCreate, RecipeIngredientRead
from schemas.user import User
from api.deps import get_db, get_current_user
from crud.recommender import suggest_recipes
router = APIRouter()


@router.get("/", response_model=List[Recipe])
def read_recipes(db: Session = Depends(get_db)):
    return db.query(RecipeModel).all()


@router.post("/", response_model=Recipe, status_code=201)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = RecipeModel(title=recipe.title, description=recipe.description)
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


@router.get("/suggested", response_model=List[Recipe])
def suggested_recipes(user_id: int, db: Session = Depends(get_db)):
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
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


@router.delete("/{recipe_id}", status_code=204)
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = db.query(RecipeModel).get(recipe_id)
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(db_recipe)
    db.commit()
    return


@router.post("/{recipe_id}/ingredients", response_model=RecipeIngredientRead, status_code=201)
def add_ingredient_to_recipe(recipe_id: int, ingredient: RecipeIngredientCreate, db: Session = Depends(get_db)):
    recipe = db.query(RecipeModel).filter(RecipeModel.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recette non trouvée")

    new_ingredient = RecipeIngredient(
        recipe_id=recipe_id,
        product_cache_id=ingredient.product_cache_id,
        quantity=ingredient.quantity,
        unit=ingredient.unit,
    )
    db.add(new_ingredient)
    db.commit()
    db.refresh(new_ingredient)
    return new_ingredient


@router.put("/{recipe_id}", response_model=Recipe)
def update_recipe(recipe_id: int, recipe: RecipeUpdate, db: Session = Depends(get_db)):
    db_recipe = db.query(RecipeModel).get(recipe_id)
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    if recipe.title is not None:
        db_recipe.title = recipe.title
    if recipe.description is not None:
        db_recipe.description = recipe.description
    if recipe.owner_id is not None:
        db_recipe.owner_id = recipe.owner_id
    if recipe.ingredients is not None:
        db.query(RecipeIngredient).filter_by(recipe_id=recipe_id).delete()
        for ing in recipe.ingredients:
            new_ingredient = RecipeIngredient(
                recipe_id=recipe_id,
                product_cache_id=ing.product_cache_id,
                quantity=ing.quantity,
                unit=ing.unit,
            )
            db.add(new_ingredient)

    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@router.get("/recipes/suggestions", summary="Liste des recettes suggérées en fonction du stock")
def get_suggestions(
    max_missing: int = 2,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[dict]:
    """
    Retourne une liste de recettes suggérées pour l'utilisateur connecté,
    en fonction de son inventaire actuel. Par défaut, jusqu’à 2 ingrédients manquants.
    """
    return suggest_recipes(user_id=current_user.id, db=db, max_missing=max_missing)

@router.get("/suggestions/")
def get_recipe_suggestions(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    suggestions = suggest_recipes(db, current_user.id)
    return [
        {
            "recipe_id": r["recipe"].id,
            "title": r["recipe"].title,
            "score": r["score"],
            "missing_products": r["missing"],
            "available_products": r["available"]
        }
        for r in suggestions
    ]