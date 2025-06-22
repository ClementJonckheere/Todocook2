"""Authentication endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/login")
def login() -> dict:
    """Placeholder login endpoint."""
    # TODO: replace with real authentication logic
    return {"detail": "Login endpoint not implemented"}