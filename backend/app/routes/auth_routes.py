from fastapi import APIRouter, HTTPException
from ..controllers.auth_controller import login
from ..schemas.auth_schema import LoginRequest

router = APIRouter()

@router.post("/login")
async def login_route(req: LoginRequest):
    user = await login(req.login, req.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user
