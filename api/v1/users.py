from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.deps import get_db
from models.user import User as UserModel
from models.user_ingredient import UserIngredient as UserIngredientModel
from models.ingredient import Ingredient as IngredientModel
from schemas.user import User, UserCreate
from schemas.user_ingredient import UserIngredient, UserIngredientCreate

router = APIRouter()


@router.get("/", response_model=List[User])
def read_users(db: Session = Depends(get_db)):
    return db.query(UserModel).all()


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed = hash(user.password)  # ou une vraie fonction de hash (e.g. bcrypt.hashpw)
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


@router.get("/{user_id}/pantry", response_model=List[UserIngredient])
def read_user_pantry(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return db.query(UserIngredientModel).filter_by(user_id=user_id).all()


@router.post("/{user_id}/pantry", response_model=UserIngredient)
def add_user_ingredient(
    user_id: int,
    item: UserIngredientCreate,
    db: Session = Depends(get_db),
):
    if user_id != item.user_id:
        raise HTTPException(status_code=400, detail="Mismatched user id")
    user = db.query(UserModel).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    ing = db.query(IngredientModel).get(item.ingredient_id)
    if not ing:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    db_item = (
        db.query(UserIngredientModel)
        .filter_by(user_id=user_id, ingredient_id=item.ingredient_id)
        .first()
    )
    if db_item:
        db_item.quantity_grams = item.quantity_grams
    else:
        db_item = UserIngredientModel(**item.dict())
        db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{user_id}/pantry/{ingredient_id}")
def delete_user_ingredient(user_id: int, ingredient_id: int, db: Session = Depends(get_db)):
    item = (
        db.query(UserIngredientModel)
        .filter_by(user_id=user_id, ingredient_id=ingredient_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Ingredient not in pantry")
    db.delete(item)
    db.commit()
    return {"ok": True}
