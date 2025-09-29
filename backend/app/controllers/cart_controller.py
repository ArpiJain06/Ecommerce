from ..database import cart_collection, product_collection
from bson import ObjectId

async def get_cart(user_id: str):
    cart = await cart_collection.find_one({"user_id": user_id})
    if not cart:
        return {"user_id": user_id, "items": []}

    items = []
    for item in cart.get("items", []):
        product = await product_collection.find_one({"_id": ObjectId(item["product_id"])})
        if product:
            product["_id"] = str(product["_id"])
            items.append({"product": product, "quantity": item["quantity"]})
    return {"user_id": user_id, "items": items}

async def add_to_cart(user_id: str, product_id: str):
    cart = await cart_collection.find_one({"user_id": user_id})
    
    if not cart:
        await cart_collection.insert_one({
            "user_id": user_id,
            "items": [{"product_id": product_id, "quantity": 1}]
        })
        return {"message": "Added to cart"}

    # Check if product already exists in cart
    found = False
    for item in cart["items"]:
        if item["product_id"] == product_id:
            item["quantity"] += 1
            found = True 
            break
        
    if not found:
        cart["items"].append({"product_id": product_id, "quantity": 1})

    await cart_collection.update_one(
        {"user_id": user_id},
        {"$set": {"items": cart["items"]}}
    )
    
    return {"message": "Added to cart"}


async def remove_from_cart(user_id: str, product_id: str):
    cart = await cart_collection.find_one({"user_id": user_id})
    if not cart:
        return {"message": "Cart is empty"}

    cart["items"] = [item for item in cart["items"] if item["product_id"] != product_id]
    await cart_collection.update_one({"user_id": user_id}, {"$set": {"items": cart["items"]}})
    return {"message": "Removed from cart"}
