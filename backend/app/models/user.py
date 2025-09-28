from pydantic import BaseModel

class UserModel(BaseModel):
    email: str
    password: str
    role: str  # "admin" or "user"
