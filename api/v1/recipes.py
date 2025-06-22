from fastapi import APIRouter

router = APIRouter()

fake_recipes_db = {}

@router.get("/")
def read_recipes():
    return list(fake_recipes_db.values())

@router.post("/")
def create_recipe(recipe: dict):
    recipe_id = len(fake_recipes_db) + 1
    recipe["id"] = recipe_id
    fake_recipes_db[recipe_id] = recipe
    return recipe

@router.get("/{recipe_id}")
def read_recipe(recipe_id: int):
    return fake_recipes_db.get(recipe_id)

@router.put("/{recipe_id}")
def update_recipe(recipe_id: int, recipe: dict):
    recipe["id"] = recipe_id
    fake_recipes_db[recipe_id] = recipe
    return recipe

@router.delete("/{recipe_id}")
def delete_recipe(recipe_id: int):
    return fake_recipes_db.pop(recipe_id, None)
