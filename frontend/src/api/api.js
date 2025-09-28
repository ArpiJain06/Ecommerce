import axios from "axios";

const API_URL = "http://localhost:8000"; // Your FastAPI URL

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // { token, role, name }
};

export const getProducts = async (token) => {
  const res = await axios.get(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addProduct = async (token, product) => {
  const res = await axios.post(`${API_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProduct = async (token, id, product) => {
  const res = await axios.put(`${API_URL}/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProduct = async (token, id) => {
  const res = await axios.delete(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
