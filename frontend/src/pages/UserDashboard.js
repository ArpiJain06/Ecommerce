import { useEffect, useState, useCallback, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCart, addToCart, removeFromCart } from "../api/cart";
import { getProducts } from "../api/product";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext); 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter((p) => p.name.toLowerCase().includes(query))
      );
    }
  }, [searchQuery, products]);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!user || !user.userId) {
      setCart([]);
      setLoadingCart(false);
      return;
    }
    setLoadingCart(true);
    try {
      const data = await getCart(user.userId);
      setCart(data?.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCart([]);
    } finally {
      setLoadingCart(false);
    }
  }, [user]);

  const handleAddToCart = async (productId) => {
    if (!user || !user.userId) return;
    try {
      const updatedCart = await addToCart(user.userId, productId);
      setCart(updatedCart.items || []);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user || !user.userId) return;
    try {
      const updatedCart = await removeFromCart(user.userId, productId);
      setCart(updatedCart.items || []);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!user) return <Typography>Loading user info...</Typography>;

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name || user.userId}
      </Typography>

      <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: "8px", fontSize: "16px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setFilteredProducts(
              products.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
          }
        >
          Search
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cart Section */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, position: "sticky", top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Your Cart
            </Typography>

            {loadingCart ? (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            ) : cart.length === 0 ? (
              <Typography>Your cart is empty.</Typography>
            ) : (
              <List>
                {cart.map((item) => (
                  <ListItem
                    key={item._id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`$${item.price} x ${item.quantity || 1}`}
                    />
                  </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Total: ${cartTotal.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={cart.length === 0}
                >
                  Checkout
                </Button>
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboard;
