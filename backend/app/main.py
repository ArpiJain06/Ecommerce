from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from .routes import auth_routes, category_routes, product_routes, cart_routes

app = FastAPI(title="Apni Dukaan Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(category_routes.router)
app.include_router(product_routes.router)
app.include_router(cart_routes.router)
app.include_router(auth_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Apni Dukaan"}

@app.get("/favicon.ico")
async def favicon():
    return FileResponse("path/to/favicon.ico")