import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const getCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`);
    console.log(res)
    return res.data.map((c) => ({ ...c, _id: String(c._id) }));
  } catch (err) {
    console.error(err);
    return [];
  }
};