from sqlalchemy import Column, Integer, ForeignKey, Float, String
from db.base import Base


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"

    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipe.id", ondelete="CASCADE"), nullable=False)
    product_cache_id = Column(Integer, ForeignKey("product_cache.id", ondelete="CASCADE"), nullable=False)

    quantity = Column(Float, default=1.0, nullable=False)
    unit = Column(String, default="unit", nullable=False)
