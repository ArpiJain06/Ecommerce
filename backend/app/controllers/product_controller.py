from ..database import product_collection

async def get_products(search: str = None):
    query = {}
    if search:
        query = {"$or": [{"name": {"$regex": search, "$options": "i"}}, {"category": {"$regex": search, "$options": "i"}}]}
    products = []
    async for p in product_collection.find(query):
        p["_id"] = str(p["_id"])
        products.append(p)
    return products

async def create_product(product_data):
    result = await product_collection.insert_one(product_data)
    product_data["_id"] = str(result.inserted_id)
    return product_data

async def update_product(product_id, product_data):
    await product_collection.update_one({"_id": product_id}, {"$set": product_data})
    product_data["_id"] = product_id
    return product_data

async def delete_product(product_id):
    await product_collection.delete_one({"_id": product_id})
    return {"detail": "Product deleted"}
