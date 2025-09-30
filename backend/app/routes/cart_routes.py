from fastapi import APIRouter, HTTPException
from ..database import cart_collection, product_collection
from bson import ObjectId

router = APIRouter(prefix="/cart", tags=["Cart"])

# Get cart for a user
@router.get("/{user_id}")
async def get_cart_route(user_id: str):
    cart = await cart_collection.find_one({"user_id": user_id})
    if not cart:
        return {"user_id": user_id, "items": []}
    return {"user_id": user_id, "items": cart["items"]}

# Add product to cart
@router.post("/{user_id}/{product_id}")
async def add_to_cart_route(user_id: str, product_id: str):
    product = await product_collection.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart = await cart_collection.find_one({"user_id": user_id})
    if not cart:
        cart_data = {
            "user_id": user_id,
            "items": [
                {
                    "_id": str(product["_id"]),
                    "name": product["name"],
                    "price": product["price"],
                    "quantity": 1,
                }
            ],
        }
        await cart_collection.insert_one(cart_data)
        updated_cart = cart_data
    else:
        updated_items = cart["items"]
        for item in updated_items:
            if item["_id"] == str(product["_id"]):
                item["quantity"] += 1
                break
        else:
            updated_items.append({
                "_id": str(product["_id"]),
                "name": product["name"],
                "price": product["price"],
                "quantity": 1,
            })
        await cart_collection.update_one({"user_id": user_id}, {"$set": {"items": updated_items}})
        updated_cart = {"user_id": user_id, "items": updated_items}

    return updated_cart  



# @router.post("/{user_id}/{product_id}")
# async def add_to_cart_route(user_id: str, product_id: str):
#     # Validate product_id
#     try:
#         prod_oid = ObjectId(product_id)
#     except:
#         raise HTTPException(status_code=400, detail="Invalid product ID")

#     product = await product_collection.find_one({"_id": prod_oid})
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")

#     cart = await cart_collection.find_one({"user_id": user_id})
#     if not cart:
#         cart_data = {
#             "user_id": user_id,
#             "items": [{
#                 "_id": str(product["_id"]),
#                 "name": product["name"],
#                 "price": product["price"],
#                 "quantity": 1
#             }],
#         }
#         await cart_collection.insert_one(cart_data)
#         updated_cart = cart_data
#     else:
#         updated_items = cart.get("items")
#         for item in updated_items:
#             if item["_id"] == str(product["_id"]):
#                 item["quantity"] += 1
#                 break
#         else:
#             updated_items.append({
#                 "_id": str(product["_id"]),
#                 "name": product["name"],
#                 "price": product["price"],
#                 "quantity": 1
#             })
#         await cart_collection.update_one({"user_id": user_id}, {"$set": {"items": updated_items}})
#         updated_cart = {"user_id": user_id, "items": updated_items}
    
#     # Return updated cart
#     return updated_cart 



# Remove product from cart

@router.delete("/{user_id}/{product_id}")
async def remove_from_cart_route(user_id: str, product_id: str):
    cart = await cart_collection.find_one({"user_id": user_id})
    if not cart:
        return {"user_id": user_id, "items": []}

    updated_items = [
        item for item in cart["items"] if item["_id"] != product_id
    ]
    await cart_collection.update_one({"user_id": user_id}, {"$set": {"items": updated_items}})
    return {"user_id": user_id, "items": updated_items}  # ✅ Return updated cart



# @router.delete("/{user_id}/{product_id}")
# async def remove_from_cart_route(user_id: str, product_id: str):
#     cart = await cart_collection.find_one({"user_id": user_id})
#     if not cart:
#         raise HTTPException(status_code=404, detail="Cart not found")

#     updated_items = [item for item in cart["items"] if item["_id"] != product_id]
#     await cart_collection.update_one({"user_id": user_id}, {"$set": {"items": updated_items}})
#     return {"detail": "Removed from cart"}
