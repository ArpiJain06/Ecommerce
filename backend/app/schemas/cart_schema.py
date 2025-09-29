from pydantic import BaseModel
from typing import List

class CartItemSchema(BaseModel):
    product_id: str
    quantity: int = 1

class CartSchema(BaseModel):
    user_id: str
    items: List[CartItemSchema]
