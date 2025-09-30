import { useEffect, useState, useContext, useCallback } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import Masonry from "react-masonry-css";
import ProductCard from "../components/ProductCard";
import { getCart, addToCart, removeFromCart } from "../api/cart";
import { getProducts } from "../api/product";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products from API
  const fetchProducts = useCallback(async (search = "") => {
    setLoadingProducts(true);
    try {
      const data = await getProducts(search);
      setProducts(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch cart for user
  const fetchCart = useCallback(async () => {
    if (!user?.userId) {
      setCart([]);
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

  // Handle add/remove cart
  const handleAddToCart = async (productId) => {
    if (!user?.userId) return;
    try {
      const updatedCart = await addToCart(user.userId, productId);
      setCart(updatedCart.items || []);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user?.userId) return;
    try {
      const updatedCart = await removeFromCart(user.userId, productId);
      setCart(updatedCart.items || []);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const isInCart = (productId) => cart.some((item) => item._id === productId);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  if (!user) return <Typography>Loading user info...</Typography>;
  if (loadingProducts)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
        Welcome, {user.name || user.userId}
      </Typography>

      {/* Search Bar */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center", gap: 1 }}>
        <TextField
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => fetchProducts(searchQuery)}
        >
          Search
        </Button>
      </Box>

      {/* Products Masonry */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            inCart={isInCart(product._id)}
            userRole="user"
          />
        ))}
      </Masonry>

      <style>{`
        .my-masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }
        .my-masonry-grid_column > div {
          margin-bottom: 16px;
        }
      `}</style>
    </Box>
  );
};

export default UserDashboard;
