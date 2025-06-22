from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from db.base import Base


class RecipeSuggestion(Base):
    __tablename__ = "recipe_suggestions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    recipe_id = Column(Integer, ForeignKey("recipes.id"), nullable=False)
    score = Column(Float, nullable=True)

    user = relationship("User", back_populates="suggestions")
    recipe = relationship("Recipe")
