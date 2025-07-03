from typing import List
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session

from api.deps import get_db, get_current_user
from models.user import User as UserModel
from schemas.user import User, UserCreate, UserOut
from utils.security import hash_password
from crud.nutrition import get_nutrition_stats
from models.user import User as DBUser
from schemas.user import ThresholdUpdate

router = APIRouter()


# ✅ Cette route DOIT être avant /{user_id}
@router.get("/profile", response_model=UserOut)
def read_profile(
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    avg, today = get_nutrition_stats(current_user.id, db)
    current_user.average_daily_calories = avg
    current_user.today_calories = today
    return current_user

@router.get("/", response_model=List[User])
def read_users(db: Session = Depends(get_db)):
    return db.query(UserModel).all()


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed = hash_password(user.password)
    db_user = UserModel(email=user.email, username=user.username, hashed_password=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).get(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/{user_id}", response_model=User)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).get(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user.dict().items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).get(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"ok": True}

@router.put("/threshold")
def update_calorie_threshold(
    threshold: float = Body(...),
    db: Session = Depends(get_db),
    current_user: DBUser = Depends(get_current_user)
):
    current_user.calorie_threshold = threshold
    db.commit()
    db.refresh(current_user)
    return {"message": "Seuil calorique mis à jour", "threshold": threshold}

@router.put("/{user_id}/threshold")
def update_threshold(user_id: int, data: ThresholdUpdate, db: Session = Depends(get_db)):
    user = db.query(UserModel).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.calorie_threshold = data.calorie_threshold
    db.commit()
    db.refresh(user)
    return {"message": "Seuil mis à jour", "calorie_threshold": user.calorie_threshold}
