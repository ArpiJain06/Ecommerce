// src/components/CartGrid.js
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

const CartGrid = ({ cartItems, onRemove }) => {
  if (!cartItems || cartItems.length === 0) {
    return <Typography variant="h6" align="center">Your cart is empty</Typography>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        marginTop: "16px",
      }}
    >
      {cartItems.map((item) => (
        <Card key={item._id} sx={{ width: 250, borderRadius: 2, boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h6">{item.name}</Typography>
            <Typography color="text.secondary">${item.price}</Typography>
            {item.category && (
              <Typography variant="body2">Category: {item.category}</Typography>
            )}
            {item.description && (
              <Typography variant="body2">{item.description}</Typography>
            )}
            {item.quantity && (
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => onRemove(item._id)}
            >
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CartGrid;
