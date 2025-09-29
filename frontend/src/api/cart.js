// src/api/cart.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Get user's cart
export const getCart = async (userId) => {
  if (!userId) return { user_id: userId, items: [] }; // fallback
  const res = await axios.get(`${API_URL}/cart/${userId}`);
  return res.data;
};

// Add item to cart
export const addToCart = async (userId, productId) => {
  if (!userId) return { items: [] };
  const res = await axios.post(`${API_URL}/cart/${userId}/${productId}`);
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (userId, productId) => {
  if (!userId) return { items: [] };
  const res = await axios.delete(`${API_URL}/cart/${userId}/${productId}`);
  return res.data;
};
