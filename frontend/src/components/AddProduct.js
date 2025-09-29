import { useState } from "react";
import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      category_id: categoryId,
      price: parseFloat(price),
      ...(description && { description })
    };

    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post(`API_URL`, payload);
      console.log("Product added:", response.data);
      
      setName("");
      setCategoryId("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
