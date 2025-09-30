from fastapi import APIRouter
from ..controllers.product_controller import get_products, create_product, update_product, delete_product, upload_image, get_image
from ..schemas.product_schema import ProductCreate
from bson import ObjectId
from fastapi import UploadFile, HTTPException

router = APIRouter()

@router.get("/images/{file_id}")
async def get_image_route(file_id: str):
    return await get_image(file_id)

@router.post("/upload-image")
async def upload_image_route(file : UploadFile):
    return await upload_image(file)

@router.get("/products")
async def get_products_route(search: str = None):
    return await get_products(search)

@router.post("/products")
async def create_product_route(product: ProductCreate):
    return await create_product(product.dict())

@router.put("/products/{product_id}")
async def update_product_route(product_id: str, product: ProductCreate):
    return await update_product(product_id, product.dict())

@router.delete("/products/{product_id}")
async def delete_product_route(product_id: str):
    return await delete_product(product_id)
