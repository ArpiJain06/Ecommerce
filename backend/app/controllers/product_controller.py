from ..database import product_collection, database, fs_files, fs_chunks
from bson import ObjectId
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse
import io

async def get_image(file_id: str):
    file_doc = await fs_files.find_one({"_id": ObjectId(file_id)})
    return StreamingResponse(io.BytesIO(file_doc["data"]), media_type=file_doc["contentType"])

async def upload_image(file: UploadFile):
    try:
        contents = await file.read()
        # Save in GridFS
        result = await fs_files.insert_one({
            "filename": file.filename,
            "contentType": file.content_type,
            "data": contents
        })
        file_id = str(result.inserted_id)
        # Return URL to fetch the image
        return {"file_id": file_id, "url": f"/images/{file_id}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {e}")

async def get_products(search: str = None):
    query = {}

    if search:
        # Search by product name or category string
        query = {
            "$or": [
                {"name": {"$regex": search, "$options": "i"}},
                {"category_id": {"$regex": search, "$options": "i"}}
            ]
        }

    products = []
    async for p in product_collection.find(query):
        p["_id"] = str(p["_id"])
        products.append(p)

    return products


# Create Product (with optional image)
async def create_product(
    product_data: dict,          # Can be JSON or Form fields
    image: UploadFile = None      # Optional file
):
    try:
        # Handle image upload
        if image:
            # Save locally
            file_path = os.path.join(UPLOAD_DIR, image.filename)
            with open(file_path, "wb") as f:
                f.write(await image.read())
            product_data["image"] = file_path
            # Or save to MongoDB GridFS instead of filesystem if you want

        # Insert product into MongoDB
        result = await product_collection.insert_one(product_data)
        product_data["_id"] = str(result.inserted_id)
        return product_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create product: {e}")

async def update_product(product_id: str, product_data):
    try:
        await product_collection.update_one({"_id": ObjectId(product_id)}, {"$set": product_data})
        product_data["_id"] = product_id
        return product_data
    except Exception as e:
        print("Error updating product:", e)
        raise HTTPException(status_code=500, detail=f"Failed to update product: {e}")

async def delete_product(product_id: str):
    try:
        await product_collection.delete_one({"_id": ObjectId(product_id)})
        return {"detail": "Product deleted"}
    except Exception as e:
        print("Error deleting product:", e)
        raise HTTPException(status_code=500, detail=f"Failed to delete product: {e}")
