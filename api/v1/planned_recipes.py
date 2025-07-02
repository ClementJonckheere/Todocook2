from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api.deps import get_db, get_current_user
from schemas.planned_recipe import PlannedRecipeCreate, PlannedRecipeRead
from crud.planned_recipe import create_planned_recipe, get_user_planned_recipes_last_month
from typing import List
from models.recipe import Recipe
from models.planned_recipe import PlannedRecipe
from models.consumption_log import ConsumptionLog

router = APIRouter(prefix="/planned", tags=["planned"])

@router.post("/", response_model=PlannedRecipeRead)
def plan_recipe(data: PlannedRecipeCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return create_planned_recipe(db, user_id=current_user.id, data=data)

@router.get("/", response_model=List[PlannedRecipeRead])
def get_last_month_plans(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return get_user_planned_recipes_last_month(db, user_id=current_user.id)

@router.get("/with_titles", response_model=List[dict])
def get_planned_recipes_with_titles(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    plans = db.query(PlannedRecipe).filter(PlannedRecipe.user_id == current_user.id).all()

    results = []
    for plan in plans:
        recipe = db.query(Recipe).filter(Recipe.id == plan.recipe_id).first()
        if recipe:
            results.append({
                "recipe_id": recipe.id,
                "title": recipe.title,
                "planned_date": plan.planned_date.isoformat()
            })

    return results

@router.delete("/{plan_id}", status_code=204)
def delete_planned_recipe(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    plan = db.query(PlannedRecipe).filter(
        PlannedRecipe.id == plan_id,
        PlannedRecipe.user_id == current_user.id
    ).first()

    if not plan:
        raise HTTPException(status_code=404, detail="Planification non trouvée")

    # 🔁 Retirer calories correspondantes
    recipe = db.query(Recipe).filter(Recipe.id == plan.recipe_id).first()
    if recipe:
        log = db.query(ConsumptionLog).filter_by(
            user_id=current_user.id,
            date=plan.planned_date
        ).first()

        if log:
            log.calories -= recipe.calories
            if log.calories <= 0:
                db.delete(log)
            else:
                db.add(log)

    db.delete(plan)
    db.commit()
    return
