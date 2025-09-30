from motor.motor_asyncio import AsyncIOMotorClient

from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

MONGO_URI = "mongodb+srv://arpitajainworkid_db_user:nC4u6pm0n5kPBHwy@cluster0.adlc6az.mongodb.net/ecommerce?retryWrites=true&w=majority"

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(MONGO_URI)
    app.database = app.mongodb_client.ecommerce
    app.category_collection = app.database.get_collection("categories")
    app.product_collection = app.database.get_collection("products")
    app.user_collection = app.database.get_collection("users")
    app.cart_collection = app.database.get_collection("carts")
    print("Connected to MongoDB!")

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
    print("MongoDB connection closed.")

client = AsyncIOMotorClient(MONGO_URI)
database = client.ecommerce
fs_files = database.fs.files       # GridFS file collection
fs_chunks = database.fs.chunks     # GridFS chunk collection

product_collection = database.get_collection("products")
user_collection = database.get_collection("users")
cart_collection = database.get_collection("carts")