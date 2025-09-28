from fastapi import APIRouter
from ..controllers.cart_controller import get_cart, add_to_cart, remove_from_cart

router = APIRouter()

@router.get("/cart/{user_id}")
async def get_cart_route(user_id: str):
    return await get_cart(user_id)

@router.post("/cart/{user_id}/{product_id}")
async def add_to_cart_route(user_id: str, product_id: str):
    await add_to_cart(user_id, product_id)
    return {"detail": "Added to cart"}

@router.delete("/cart/{user_id}/{product_id}")
async def remove_from_cart_route(user_id: str, product_id: str):
    await remove_from_cart(user_id, product_id)
    return {"detail": "Removed from cart"}
