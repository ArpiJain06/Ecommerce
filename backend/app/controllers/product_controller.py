# Handles product creation, update, deletion for the admin
# Handles product retrieval for the user

from app.database import db
from app.models.product import Product
from bson import ObjectId

product_collection = db["products"]

def product_helper(product) -> dict:
    return {
        "id": str(product["_id"]),
        "name": product["name"],
        "description": product.get("description"),
        "price": product["price"],
        "quantity": product["quantity"]
    }

async def create_product(product: Product):
    result = await product_collection.insert_one(product.dict())
    new_product = await product_collection.find_one({"_id": result.inserted_id})
    return product_helper(new_product)

async def get_products():
    products = []
    async for product in product_collection.find():
        products.append(product_helper(product))
    return products

async def get_product_by_id(product_id: str):
    product = await product_collection.find_one({"_id": ObjectId(product_id)})
    if product:
        return product_helper(product)
    return None

async def update_product(product_id: str, data: dict):
    await product_collection.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": data}
    )
    updated_product = await product_collection.find_one({"_id": ObjectId(product_id)})
    if updated_product:
        return product_helper(updated_product)
    return None

async def delete_product(product_id: str):
    result = await product_collection.delete_one({"_id": ObjectId(product_id)})
    return result.deleted_count > 0
