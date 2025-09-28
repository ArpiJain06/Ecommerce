from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://localhost:27017" #mongo url
client = AsyncIOMotorClient(MONGO_URI)
database = client.ecommerce

category_collection = database.get_collection("categories")
product_collection = database.get_collection("products")
user_collection = database.get_collection("users")
cart_collection = database.get_collection("carts")