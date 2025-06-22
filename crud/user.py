"""Utility functions for user data access."""

from sqlalchemy.orm import Session

from models.user import User

# TODO: expand with create, update and delete helpers

def get_user(db: Session, user_id: int) -> User | None:
    """Retrieve a user by ID."""
    return db.query(User).filter(User.id == user_id).first()