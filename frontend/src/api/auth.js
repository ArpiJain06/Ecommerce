// src/api/auth.js
import axios from "axios";

export const API_URL = "http://127.0.0.1:8000";

export const login = async (login, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    login,
    password,
  });
  return res.data;
};
