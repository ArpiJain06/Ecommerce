from fastapi import FastAPI
from .routes import auth_routes, category_routes, product_routes, cart_routes

app = FastAPI(title="Apni Dukaan Backend")

app.include_router(category_routes.router)
app.include_router(product_routes.router)
app.include_router(cart_routes.router)
app.include_router(auth_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Apni Dukaan"}
