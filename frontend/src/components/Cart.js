import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Box, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  if (cart.length === 0) return <Typography sx={{ mt: 2 }}>Cart is empty</Typography>;

  return (
    <Box sx={{ mt: 3, border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
      <Typography variant="h6">Cart</Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <Button color="error" onClick={() => removeFromCart(item.id)}>Remove</Button>
          }>
            <ListItemText primary={`${item.name} - $${item.price}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={clearCart} sx={{ mt: 2 }}>
        Clear Cart
      </Button>
    </Box>
  );
};

export default Cart;
