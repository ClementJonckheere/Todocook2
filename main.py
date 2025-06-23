from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.users import router as users_router
from api.v1.recipes import router as recipes_router
from api.v1 import user_products
from db.base import Base
from db.session import engine
from db.base import Base
from api.v1 import user_inventory



app = FastAPI(title="Healthy Recipe API")

Base.metadata.create_all(bind=engine)

app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
app.include_router(recipes_router, prefix="/api/v1/recipes", tags=["Recipes"])
app.include_router(user_products.router, prefix="/api/v1")
app.include_router(user_inventory.router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
