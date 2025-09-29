from ..database import category_collection
from bson import ObjectId

async def get_categories():
    categories = []
    async for cat in category_collection.find():
        cat["_id"] = str(cat["_id"])
        categories.append(cat)
    return categories

async def create_category(name: str):
    result = await category_collection.insert_one({"name": name})
    return {"_id": str(result.inserted_id), "name": name}

async def update_category(category_id: str, name: str):
    await category_collection.update_one(
        {"_id": ObjectId(category_id)},
        {"$set": {"name": name}}
    )
    return {"_id": category_id, "name": name}

async def delete_category(category_id: str):
    await category_collection.delete_one({"_id": ObjectId(category_id)})
    return {"detail": "Category deleted"}
