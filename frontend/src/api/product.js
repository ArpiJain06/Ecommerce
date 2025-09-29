import axios from "axios";

const API_URL = "http://localhost:8000";

// Fetch all products (no auth required)
export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    // Ensure _id is string for React keys
    return res.data.map((p) => ({ ...p, _id: String(p._id) }));
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return []; // fallback
  }
};

export const addProduct = async (product) => {
  console.log("ppp", product);
  // const res = await axios.post(`${API_URL}/products`, product);
  const res = axios.post("http://localhost:8000/products", product, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return res.data;
};

// Update a product (admin functionality)
export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/products/${id}`, product);
  return res.data;
};

// Delete a product (admin functionality)
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/products/${id}`);
  return res.data;
};

// Fetch categories
export const getCategories = async () => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};
