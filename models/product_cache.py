from sqlalchemy import Column, Integer, String, Float
from db.base_class import Base

class ProductCache(Base):
    __tablename__ = "product_cache"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    calories = Column(Float)
    brand = Column(String, nullable=True)
