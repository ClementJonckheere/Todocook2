from db.base_class import Base

# Import de tous les modèles pour les enregistrer dans Base.metadata
from models.user import User
from models.recipe import Recipe
from models.recipe_ingredient import RecipeIngredient
from models.product_cache import ProductCache
from models.user_product import UserProduct
from models.user_inventory import UserInventory
from models.consumption_log import ConsumptionLog
