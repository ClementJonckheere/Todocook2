from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base

class PlannedRecipe(Base):
    __tablename__ = "planned_recipes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    recipe_id = Column(Integer, ForeignKey("recipe.id"), nullable=False)
    planned_date = Column(Date, nullable=False)

    user = relationship("User", back_populates="planned_recipes")
    recipe = relationship("Recipe", back_populates="planned_recipes")
