from sqlalchemy.orm import Session
from models.planned_recipe import PlannedRecipe
from models.recipe import Recipe
from models.consumption_log import ConsumptionLog
from schemas.planned_recipe import PlannedRecipeCreate
from datetime import date


def create_planned_recipe(db: Session, user_id: int, data: PlannedRecipeCreate):
    planned = PlannedRecipe(user_id=user_id, **data.dict())
    db.add(planned)
    db.commit()
    db.refresh(planned)

    # 🔁 Ajouter calories à la date planifiée
    recipe = db.query(Recipe).filter(Recipe.id == data.recipe_id).first()
    if recipe:
        log = db.query(ConsumptionLog).filter_by(
            user_id=user_id,
            date=data.planned_date
        ).first()

        if log:
            log.calories += recipe.calories
        else:
            log = ConsumptionLog(
                user_id=user_id,
                date=data.planned_date,
                calories=recipe.calories
            )
            db.add(log)

        db.commit()

    return planned


def get_user_planned_recipes_last_month(db: Session, user_id: int):
    from datetime import datetime, timedelta
    today = datetime.today()
    last_month = today - timedelta(days=30)
    return db.query(PlannedRecipe).filter(
        PlannedRecipe.user_id == user_id,
        PlannedRecipe.planned_date >= last_month.date()
    ).all()
