from sqlalchemy.orm import declarative_base
from models.product_cache import ProductCache
from models.user_product import UserProduct
from models.user_inventory import UserInventory
from models.consumption_log import ConsumptionLog


Base = declarative_base()

