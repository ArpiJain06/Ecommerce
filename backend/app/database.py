from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://arpitajainworkid_db_user:nC4u6pm0n5kPBHwy@cluster0.adlc6az.mongodb.net/ecommerce?retryWrites=true&w=majority"
client = AsyncIOMotorClient(MONGO_URI)
database = client.ecommerce

category_collection = database.get_collection("categories")
product_collection = database.get_collection("products")
user_collection = database.get_collection("users")
cart_collection = database.get_collection("carts")