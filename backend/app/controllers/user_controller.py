from models.user import UserModel
from database import user_collection
from bson import ObjectId

class UserController:
    @staticmethod
    async def create_user(data: dict):
        user = UserModel(**data)
        result = await user_collection.insert_one(user.dict())
        return str(result.inserted_id) 

    @staticmethod
    async def get_user_by_id(user_id: str):
        user = await user_collection.find_one({"_id": ObjectId(user_id)})
        return user

    @staticmethod
    async def get_user_by_email(email: str):
        user = await user_collection.find_one({"email": email})
        return user

    @staticmethod
    async def verify_user(email: str, password: str):
        user = await user_collection.find_one({"email": email})
        if user and user["password"] == password: 
            return str(user["_id"])
        return None

    @staticmethod
    async def get_all_users():
        users = await user_collection.find().to_list(100)
        return users
