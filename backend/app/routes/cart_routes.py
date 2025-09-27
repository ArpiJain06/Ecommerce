from fastapi import APIRouter, HTTPException
from ..database import cart_collection
from ..schemas.cart_schema import CartSchema

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post("/")
async def add_to_cart(item: CartSchema):
    result = await cart_collection.insert_one(item.dict())
    return {"id": str(result.inserted_id)}

@router.get("/{user_id}")
async def get_cart(user_id: str):
    items = []
    cursor = cart_collection.find({"user_id": user_id})
    async for item in cursor:
        item["_id"] = str(item["_id"])
        items.append(item)
    return items

@router.delete("/{cart_item_id}")
async def remove_from_cart(cart_item_id: str):
    result = await cart_collection.delete_one({"_id": cart_item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"status": "removed"}
