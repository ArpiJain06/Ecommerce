from models.category import CategoryModel
from database import category_collection
from bson import ObjectId

class CategoryController:
    @staticmethod
    async def create_category(data: dict):
        category = CategoryModel(**data)
        result = await category_collection.insert_one(category.dict())
        return str(result.inserted_id)

    @staticmethod
    async def get_all_categories():
        categories = await category_collection.find().to_list(100)
        return categories

    @staticmethod
    async def get_category_by_id(category_id: str):
        category = await category_collection.find_one({"_id": ObjectId(category_id)})
        return category

    @staticmethod
    async def update_category(category_id: str, data: dict):
        result = await category_collection.update_one(
            {"_id": ObjectId(category_id)}, {"$set": data}
        )
        return result.modified_count > 0

    @staticmethod
    async def delete_category(category_id: str):
        result = await category_collection.delete_one({"_id": ObjectId(category_id)})
        return result.deleted_count > 0
