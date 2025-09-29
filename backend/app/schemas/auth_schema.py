from pydantic import BaseModel

class LoginRequest(BaseModel):
    login: str       # username or email
    password: str
