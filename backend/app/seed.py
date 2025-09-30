import asyncio
from .database import user_collection, category_collection, product_collection

async def seed():
    users = [
        {"username": "admin1", "email": "admin1@apnidukaan.com", "password": "admin@123", "role": "admin"},
        {"username": "user1", "email": "user1@apnidukaan.com", "password": "user@123", "role": "user"},
    ]
    await user_collection.delete_many({})
    await user_collection.insert_many(users)
    print("✅ Users inserted")

    categories = ["Electronics", "Clothing", "Books", "Toys", "Sports"]
    await category_collection.delete_many({})
    category_docs = [{"name": cat} for cat in categories]
    result = await category_collection.insert_many(category_docs)
    inserted_ids = result.inserted_ids
    print("✅ Categories inserted")

    await product_collection.delete_many({})
    products = []
    for cat_id, cat_name in zip(inserted_ids, categories):
        for i in range(1, 6):
            products.append({
                "name": f"{cat_name} Product {i}",
                "category_id": cat_id,
                "price": i * 10,
                "description": f"Description for {cat_name} Product {i}"
            })
    await product_collection.insert_many(products)
    print("✅ Products inserted")

asyncio.run(seed())
