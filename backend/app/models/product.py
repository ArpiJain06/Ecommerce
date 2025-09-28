from pydantic import BaseModel
from typing import Optional

class ProductModel(BaseModel):
    name: str
    price: float
    category: str
    description: Optional[str]
    quantity : int