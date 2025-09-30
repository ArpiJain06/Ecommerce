import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const getProducts = async (query = "") => {
  try {
    console.log(query)
    const url = query ? `${API_URL}/products?${query}` : `${API_URL}/products`;
    const res = await axios.get(url);
    return res.data.map((p) => ({ ...p, _id: String(p._id) }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const addProduct = async (product) => {
  // const res = await axios.post(`${API_URL}/products`, product);
  const res = axios.post(`${API_URL}/products`, product, {
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
