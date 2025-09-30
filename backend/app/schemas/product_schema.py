from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category_id: str
    image: Optional[str] = None  # New field for product image URL/path

class ProductCreate(ProductBase):
    pass  # Inherits all fields from ProductBase

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[str] = None
    image: Optional[str] = None  # Optional for updates

class ProductOut(ProductBase):
    id: str
