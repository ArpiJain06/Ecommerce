import { useEffect, useState, useContext } from "react";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from "@mui/material";
import { getProducts } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import Cart from "../components/Cart";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await getProducts(user.token);
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" onClick={() => addToCart(product)}>Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Cart />
    </Container>
  );
};

export default UserDashboard;
