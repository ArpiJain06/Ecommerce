from pydantic import BaseModel

class UserSchema(BaseModel):
    email: str
    password: str
    role: str  # "admin" or "user"
