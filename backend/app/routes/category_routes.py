from fastapi import APIRouter
from ..controllers.category_controller import get_categories

router = APIRouter()

@router.get("/categories")
async def get_categories_route():
    return await get_categories()
