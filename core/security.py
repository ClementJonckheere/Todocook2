"""Security utilities for the application."""

# TODO: implement password hashing and authentication helpers
import jwt
from datetime import datetime
from typing import Optional
from core.config import settings

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("exp") and datetime.utcfromtimestamp(payload["exp"]) < datetime.utcnow():
            return None
        return payload
    except jwt.PyJWTError:
        return None
