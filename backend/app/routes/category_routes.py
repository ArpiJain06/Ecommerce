from fastapi import APIRouter, HTTPException
from ..database import category_collection
from ..schemas.category_schema import CategorySchema

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/")
async def create_category(category: CategorySchema):
    category_exist = await category_collection.find_one({"name": category.name})
    if category_exist:
        raise HTTPException(status_code=400, detail="Category already exists")
    result = await category_collection.insert_one(category.dict())
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_categories():
    categories = []
    cursor = category_collection.find({})
    async for category in cursor:
        category["_id"] = str(category["_id"])
        categories.append(category)
    return categories

@router.put("/{category_id}")
async def update_category(category_id: str, category: CategorySchema):
    result = await category_collection.update_one(
        {"_id": category_id},
        {"$set": category.dict()}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"status": "updated"}

@router.delete("/{category_id}")
async def delete_category(category_id: str):
    result = await category_collection.delete_one({"_id": category_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"status": "deleted"}
