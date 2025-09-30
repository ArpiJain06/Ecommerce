import { useEffect, useState, useCallback, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";
import { getCart, removeFromCart } from "../api/cart";
import CartGrid from "../components/CartGrid";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const [loadingCart, setLoadingCart] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!user || !user.userId) {
      setCartItems([]);
      setLoadingCart(false);
      return;
    }
    setLoadingCart(true);
    try {
      const data = await getCart(user.userId);
      setCartItems(data?.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]);
    } finally {
      setLoadingCart(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    if (!user?.userId) return;
    try {
      const updatedCart = await removeFromCart(user.userId, productId);
      setCartItems(updatedCart.items || []);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Cart
      </Typography>

      {loadingCart ? (
        <Typography align="center">Loading...</Typography>
      ) : cartItems.length === 0 ? (
        <Typography align="center" sx={{ mt: 3 }}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <CartGrid cartItems={cartItems} onRemove={handleRemove} />
          <Typography variant="h6" align="right" sx={{ mt: 3, mr: 3 }}>
            Total: ${total.toFixed(2)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Cart;
