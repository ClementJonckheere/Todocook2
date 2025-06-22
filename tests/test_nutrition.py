import json
from pathlib import Path
import unittest
from unittest.mock import patch

from utils import nutrition

class NutritionTestCase(unittest.TestCase):
    def tearDown(self):
        data_dir = Path('data')
        if data_dir.exists():
            for f in data_dir.glob('*.json'):
                f.unlink()

    def test_search_ingredient_stores_result(self):
        mock_response = {
            "products": [
                {
                    "product_name": "Banana",
                    "nutriments": {
                        "energy-kcal_100g": 89.0,
                        "proteins_100g": 1.1,
                    },
                }
            ]
        }
        with patch('utils.nutrition._fetch_json', return_value=mock_response):
            result = nutrition.search_ingredient('Banana')

        self.assertEqual(result['name'], 'Banana')
        self.assertIn('nutriments', result)
        expected_file = Path('data/banana.json')
        self.assertTrue(expected_file.exists())
        with expected_file.open() as f:
            saved = json.load(f)
        self.assertEqual(saved, result)

if __name__ == '__main__':
    unittest.main()
