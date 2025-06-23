from sqlalchemy import Column, Integer, String, Float, ForeignKey
from db.base_class import Base

class UserProduct(Base):
    __tablename__ = "user_products"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    custom_name = Column(String, nullable=False)
    custom_brand = Column(String, nullable=True)
    custom_calories = Column(Float, nullable=False)
