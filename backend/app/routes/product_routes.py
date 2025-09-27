from fastapi import APIRouter, HTTPException
from ..database import product_collection
from ..schemas.product_schema import ProductSchema

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/")
async def create_product(product: ProductSchema):
    result = await product_collection.insert_one(product.dict())
    return {"id": str(result.inserted_id)}

@router.get("/")
async def get_products():
    products = []
    cursor = product_collection.find({})
    async for product in cursor:
        product["_id"] = str(product["_id"])
        products.append(product)
    return products

@router.put("/{product_id}")
async def update_product(product_id: str, product: ProductSchema):
    result = await product_collection.update_one(
        {"_id": product_id},
        {"$set": product.dict()}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "updated"}

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    result = await product_collection.delete_one({"_id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"status": "deleted"}
