from fastapi import FastAPI
from .routes import category_routes, product_routes, cart_routes, user_routes

app = FastAPI(title="Ecommerce API")

app.include_router(category_routes.router)
app.include_router(product_routes.router)
app.include_router(cart_routes.router)
app.include_router(user_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Ecommerce API"}
