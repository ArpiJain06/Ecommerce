from ..database import user_collection
from bson import ObjectId 

async def login(login: str, password: str):
    user = await user_collection.find_one({
        "$or": [{"username": login}, {"email": login}]
    })
    if not user or user["password"] != password:
        return None

    return {
        "username": user["username"],
        "email": user.get("email"),
        "role": user["role"],
        "user_id": str(user["_id"])
    }
