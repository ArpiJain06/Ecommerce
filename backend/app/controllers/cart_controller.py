from app.database import db
from app.models.cart import CartItem
from bson import ObjectId
from app.controllers.product_controller import get_product_by_id

cart_collection = db["cart"]

def cart_helper(item) -> dict:
    return {
        "id": str(item["_id"]),
        "product_id": item["product_id"],
        "quantity": item["quantity"]
    }

async def add_to_cart(cart_item: CartItem):
    # Check if product exists
    product = await get_product_by_id(cart_item.product_id)
    if not product:
        return None

    # Check if already in cart
    existing_item = await cart_collection.find_one({"product_id": cart_item.product_id})
    if existing_item:
        new_qty = existing_item["quantity"] + cart_item.quantity
        await cart_collection.update_one(
            {"_id": existing_item["_id"]},
            {"$set": {"quantity": new_qty}}
        )
        updated = await cart_collection.find_one({"_id": existing_item["_id"]})
        return cart_helper(updated)
    else:
        result = await cart_collection.insert_one(cart_item.dict())
        new_item = await cart_collection.find_one({"_id": result.inserted_id})
        return cart_helper(new_item)

async def remove_from_cart(product_id: str):
    result = await cart_collection.delete_one({"product_id": product_id})
    return result.deleted_count > 0

async def view_cart():
    items = []
    async for item in cart_collection.find():
        items.append(cart_helper(item))
    return items
