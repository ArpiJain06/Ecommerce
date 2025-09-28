from pydantic import BaseModel

class CartSchema(BaseModel):
    user_id: str
    product_id: str
    quantity: int
