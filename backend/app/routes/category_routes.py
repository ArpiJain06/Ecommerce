from fastapi import APIRouter
from ..controllers.category_controller import get_categories, create_category

router = APIRouter()

@router.get("/categories")
async def get_categories_route():
    return await get_categories()

@router.post("/categories")
async def create_category_route(name: str):
    return await create_category(name)
