"""Security utilities for the application."""

# TODO: implement password hashing and authentication helpers
import jwt
from datetime import datetime
from typing import Optional
from core.config import settings
from passlib.context import CryptContext

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("exp") and datetime.utcfromtimestamp(payload["exp"]) < datetime.utcnow():
            return None
        return payload
    except jwt.PyJWTError:
        return None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)