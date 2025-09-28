from pydantic import BaseModel

class LoginRequest(BaseModel):
    login: str  # username or email
    password: str

class LoginResponse(BaseModel):
    username: str
    role: str
