from fastapi import APIRouter

router = APIRouter()

fake_users_db = {}

@router.get("/")
def read_users():
    return list(fake_users_db.values())

@router.post("/")
def create_user(user: dict):
    user_id = len(fake_users_db) + 1
    user["id"] = user_id
    fake_users_db[user_id] = user
    return user

@router.get("/{user_id}")
def read_user(user_id: int):
    return fake_users_db.get(user_id)

@router.put("/{user_id}")
def update_user(user_id: int, user: dict):
    user["id"] = user_id
    fake_users_db[user_id] = user
    return user

@router.delete("/{user_id}")
def delete_user(user_id: int):
    return fake_users_db.pop(user_id, None)
