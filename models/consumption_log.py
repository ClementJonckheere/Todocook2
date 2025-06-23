from sqlalchemy import Column, Integer, Float, ForeignKey, Date
from db.base_class import Base
import datetime

class ConsumptionLog(Base):
    __tablename__ = "consumption_log"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_cache_id = Column(Integer, ForeignKey("product_cache.id"), nullable=True)
    user_product_id = Column(Integer, ForeignKey("user_products.id"), nullable=True)

    quantity = Column(Float, default=1.0)
    date = Column(Date, default=datetime.date.today)
