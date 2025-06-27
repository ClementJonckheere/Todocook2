from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_test():
    response = client.get("/test")
    assert response.status_code == 200
    assert response.json() == {
        "message": "API opérationnelle",
        "status": "OK"
    }
