from ..database import product_collection
from bson import ObjectId
from fastapi import HTTPException

async def get_products(search: str = None):
    query = {}
    if search:
        query = {
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
                {"category": {"$regex": search, "$options": "i"}}
            ]
        }
    products = []
    async for p in product_collection.find(query):
        p["_id"] = str(p["_id"])
        if "category_id" in p:
            p["category_id"] = str(p["category_id"])
        products.append(p)
    return products

async def create_product(product_data):
    try:
        result = await product_collection.insert_one(product_data)
        print("Insert result:", result)
        product_data["_id"] = str(result.inserted_id)
        print("Product after insert:", product_data)
        return product_data
    except Exception as e:
        print("Error inserting product:", e)
        raise HTTPException(status_code=500, detail=f"Failed to create product: {e}")

async def update_product(product_id: str, product_data):
    try:
        await product_collection.update_one({"_id": ObjectId(product_id)}, {"$set": product_data})
        product_data["_id"] = product_id
        return product_data
    except Exception as e:
        print("Error updating product:", e)
        raise HTTPException(status_code=500, detail=f"Failed to update product: {e}")

async def delete_product(product_id: str):
    try:
        await product_collection.delete_one({"_id": ObjectId(product_id)})
        return {"detail": "Product deleted"}
    except Exception as e:
        print("Error deleting product:", e)
        raise HTTPException(status_code=500, detail=f"Failed to delete product: {e}")
