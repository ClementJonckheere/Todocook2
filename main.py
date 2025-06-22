from fastapi import FastAPI

from api.v1.users import router as users_router
from api.v1.recipes import router as recipes_router

app = FastAPI(title="Healthy Recipe API")

app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(recipes_router, prefix="/api/v1/recipes", tags=["Recipes"])
