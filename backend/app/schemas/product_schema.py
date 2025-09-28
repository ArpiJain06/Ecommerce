from pydantic import BaseModel
from typing import Optional

class ProductSchema(BaseModel):
    name: str
    price: float
    category: str
    description: Optional[str]
