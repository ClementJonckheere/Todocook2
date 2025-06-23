from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from db.base_class import Base

# Import models referenced in relationships so SQLAlchemy can resolve them
from .recipe_suggestion import RecipeSuggestion  # noqa: F401

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)

    recipes = relationship("Recipe", back_populates="owner")
    suggestions = relationship(
        "RecipeSuggestion", back_populates="user", cascade="all, delete-orphan"
    )
