import unittest
from utils.security import hash_password, verify_password

class SecurityTestCase(unittest.TestCase):
    def test_hash_and_verify(self):
        plain = "s3cret"
        hashed = hash_password(plain)
        self.assertNotEqual(plain, hashed)
        self.assertTrue(verify_password(plain, hashed))

if __name__ == '__main__':
    unittest.main()
