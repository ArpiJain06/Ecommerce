from pydantic import BaseModel

class CartItemModel(BaseModel):
    user_id: str
    product_id: str
    quantity: int
