from sqlalchemy.orm import Session
from models.planned_recipe import PlannedRecipe
from schemas.planned_recipe import PlannedRecipeCreate

def create_planned_recipe(db: Session, user_id: int, data: PlannedRecipeCreate):
    plan = PlannedRecipe(
        user_id=user_id,
        recipe_id=data.recipe_id,
        planned_date=data.planned_date
    )
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan

def get_user_planned_recipes_last_month(db: Session, user_id: int):
    from datetime import date, timedelta
    today = date.today()
    one_month_ago = today - timedelta(days=30)
    return db.query(PlannedRecipe).filter(
        PlannedRecipe.user_id == user_id,
        PlannedRecipe.planned_date >= one_month_ago,
        PlannedRecipe.planned_date <= today
    ).all()
