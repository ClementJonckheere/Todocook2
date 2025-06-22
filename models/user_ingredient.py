from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from db.base import Base


class UserIngredient(Base):
    __tablename__ = "user_ingredients"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey("ingredients.id"), primary_key=True)
    quantity_grams = Column(Float, nullable=False)

    user = relationship("User", back_populates="pantry")
    ingredient = relationship("Ingredient")
