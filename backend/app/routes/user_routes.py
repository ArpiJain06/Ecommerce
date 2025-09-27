from fastapi import APIRouter, HTTPException
from ..database import user_collection
from ..schemas.user_schema import UserSchema

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
async def register_user(user: UserSchema):
    existing_user = await user_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    result = await user_collection.insert_one(user.dict())
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_users():
    users = []
    cursor = user_collection.find({})
    async for user in cursor:
        user["_id"] = str(user["_id"])
        users.append(user)
    return users
