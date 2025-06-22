import unittest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db.base import Base
from models.user import User
from models.ingredient import Ingredient
from models.recipe import Recipe
from models.user_ingredient import UserIngredient

from ml.recommender import suggest_recipes


class RecommenderTestCase(unittest.TestCase):
    def setUp(self):
        engine = create_engine(
            "sqlite:///:memory:", connect_args={"check_same_thread": False}
        )
        TestingSessionLocal = sessionmaker(bind=engine)
        Base.metadata.create_all(engine)
        self.db = TestingSessionLocal()

        self.user = User(email="test@example.com", name="Test User")
        self.db.add(self.user)
        self.db.commit()
        self.db.refresh(self.user)

    def tearDown(self):
        self.db.close()

    def test_suggest_recipes_basic(self):
        ing1 = Ingredient(name="Apple")
        ing2 = Ingredient(name="Banana")
        ing3 = Ingredient(name="Carrot")
        self.db.add_all([ing1, ing2, ing3])
        self.db.commit()

        ui1 = UserIngredient(
            user_id=self.user.id, ingredient_id=ing1.id, quantity_grams=100
        )
        ui2 = UserIngredient(
            user_id=self.user.id, ingredient_id=ing2.id, quantity_grams=50
        )
        self.db.add_all([ui1, ui2])
        self.db.commit()

        r1 = Recipe(title="Fruit Salad", description="Delicious")
        r1.ingredients.append(ing1)
        r2 = Recipe(title="Carrot Soup", description="Yummy")
        r2.ingredients.append(ing3)
        self.db.add_all([r1, r2])
        self.db.commit()

        suggestions = suggest_recipes(self.user.id, self.db)

        self.assertEqual(len(suggestions), 1)
        self.assertEqual(suggestions[0].title, "Fruit Salad")


if __name__ == "__main__":
    unittest.main()

