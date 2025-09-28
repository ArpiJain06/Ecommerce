import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <Card sx={{ maxWidth: 250, m: 2 }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>${product.price}</Typography>
        <Typography variant="body2">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
