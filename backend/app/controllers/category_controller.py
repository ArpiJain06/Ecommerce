from ..database import product_collection
from bson import ObjectId

async def get_categories():
    # Get all distinct category names from products
    categories = await product_collection.distinct("category_id")
    
    # Filter out None or empty strings
    categories = [c for c in categories if c]

    # Return as list of objects with pseudo _id
    return [{"_id": str(i), "name": c} for i, c in enumerate(categories)]
