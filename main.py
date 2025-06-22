from fastapi import FastAPI
from api.v1 import users, recipes

app = FastAPI(title="Healthy Recipe API")

app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])



app.include_router(recipes.router, prefix="/api/v1/recipes", tags=["Recipes"])
 # initialisation projet

