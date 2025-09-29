import asyncio
from app.database import user_collection

async def test():
    user = await user_collection.find_one({})
    print("Sample user:", user)

asyncio.run(test())
