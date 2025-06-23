from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db.base import Base

# Import model referenced in relationships so SQLAlchemy registers it
from .recipe_suggestion import RecipeSuggestion  # noqa: F401

class Recipe(Base):
    __tablename__ = "recipe"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="recipes")
    ingredients = relationship(
        "Ingredient", back_populates="recipe", cascade="all, delete-orphan"
    )
    suggestions = relationship(
        "RecipeSuggestion", back_populates="recipe", cascade="all, delete-orphan"
    )
