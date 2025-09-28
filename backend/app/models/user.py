from pydantic import BaseModel

class UserModel(BaseModel):
    username: str
    password: str
    role: str  # "admin" or "user"
