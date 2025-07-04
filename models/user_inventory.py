from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base

class UserInventory(Base):
    __tablename__ = "user_inventory"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    product_cache_id = Column(Integer, ForeignKey("product_cache.id"), nullable=True)
    user_product_id = Column(Integer, ForeignKey("user_products.id"), nullable=True)

    quantity = Column(Float, default=1.0)
    unit = Column(String, default="unit")

    user = relationship("User", back_populates="inventory")
