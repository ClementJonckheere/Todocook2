import unittest
from datetime import date
from models.user_product import UserProduct
from models.product_cache import ProductCache
from models.user_inventory import UserInventory
from models.user import User
from models.recipe import Recipe
from sqlalchemy.orm import Session
from db.session import SessionLocal

class TestRecommenderLogic(unittest.TestCase):

    def setUp(self):
        self.db: Session = SessionLocal()
        self.user = User(email="testuser@example.com", hashed_password="fake")
        self.db.add(self.user)
        self.db.commit()
        self.db.refresh(self.user)

        # Simuler un produit cache
        self.product = ProductCache(name="Tomate", brand="Bio", calories=18)
        self.db.add(self.product)
        self.db.commit()
        self.db.refresh(self.product)

        # Ajouter au stock de l'utilisateur
        self.inventory = UserInventory(
            user_id=self.user.id,
            product_cache_id=self.product.id,
            quantity=2,
            unit="unit"
        )
        self.db.add(self.inventory)
        self.db.commit()

        # Simuler une recette avec tomate
        self.recipe = Recipe(title="Salade de tomate", description="Simple et efficace")
        self.db.add(self.recipe)
        self.db.commit()

    def test_product_in_inventory(self):
        """Vérifie que le produit est bien dans le stock utilisateur"""
        stock = self.db.query(UserInventory).filter_by(user_id=self.user.id).all()
        self.assertEqual(len(stock), 1)
        self.assertEqual(stock[0].product_cache_id, self.product.id)

    def test_recipe_placeholder(self):
        """Placeholder pour logique future de suggestion"""
        self.assertEqual(self.recipe.title, "Salade de tomate")

    def tearDown(self):
        self.db.query(UserInventory).delete()
        self.db.query(Recipe).delete()
        self.db.query(ProductCache).delete()
        self.db.query(User).delete()
        self.db.commit()
        self.db.close()

if __name__ == "__main__":
    unittest.main()

