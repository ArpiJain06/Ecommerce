from ..database import category_collection

async def get_categories():
    categories = []
    async for cat in category_collection.find():
        cat["_id"] = str(cat["_id"])
        categories.append(cat)
    return categories

async def create_category(name: str):
    result = await category_collection.insert_one({"name": name})
    return {"id": str(result.inserted_id), "name": name}
