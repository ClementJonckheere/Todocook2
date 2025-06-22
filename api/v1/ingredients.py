from fastapi import APIRouter, HTTPException

from utils.nutrition import search_ingredient

router = APIRouter()


@router.get("/search")
def search(name: str):
    """Search nutrition info for an ingredient by name."""
    try:
        return search_ingredient(name)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))