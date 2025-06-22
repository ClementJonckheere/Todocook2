from fastapi import FastAPI

from api.v1.users import router as users_router
from api.v1.recipes import router as recipes_router
from api.v1.ingredients import router as ingredients_router
from models import user_ingredient, recipe_suggestion  # ensure tables are created
from db.base import Base
from db.session import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Healthy Recipe API")

app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(recipes_router, prefix="/api/v1/recipes", tags=["Recipes"])
app.include_router(
    ingredients_router, prefix="/api/v1/ingredients", tags=["Ingredients"]
)