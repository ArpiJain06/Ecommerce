import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const AddProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // productId from /edit-product/:id
  const location = useLocation();
  const editingProduct = location.state?.product || null;

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
    imageUrl: "",
  });

  // Autofill in edit mode
  useEffect(() => {
    if (editingProduct) {
      setNewProduct({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        description: editingProduct.description,
        image: null,
        imageUrl: editingProduct.image || "",
      });
    }
  }, [editingProduct]);

  const uploadImage = async () => {
    if (!newProduct.image) return newProduct.imageUrl || null;

    const formData = new FormData();
    formData.append("file", newProduct.image);

    try {
      const response = await axios.post(`${API_URL}/upload-image`, formData);
      return response.data.url;
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
      return null;
    }
  };

  const handleSave = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description) {
      alert("All fields are required");
      return;
    }

    let imageUrl = await uploadImage();

    const productData = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category_id: newProduct.category,
      description: newProduct.description,
      image: imageUrl || "",
    };

    try {
      if (editingProduct) {
        // Update existing product
        console.log("clicked")
        await axios.put(`${API_URL}/products/${id}`, productData);
        alert("Product updated!");
      } else {
        // Add new product
        await axios.post(`${API_URL}/products`, productData);
        alert("Product added!");
      }

      navigate(-1); 
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  };

  return (
    <Box sx={{ mt: 5, maxWidth: 600, mx: "auto", p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h4" gutterBottom>
        {editingProduct ? "Edit Product" : "Add New Product"}
      </Typography>

      <TextField
        label="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />

      <TextField
        label="Price"
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />

      <TextField
        label="Category"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        multiline
        rows={3}
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      />

      {/* Image Upload */}
      <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
        {newProduct.image ? "Change Image" : "Upload Image"}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
        />
      </Button>

      {/* Preview */}
      {(newProduct.image || newProduct.imageUrl) && (
        <Box sx={{ mb: 2 }}>
          <img
            src={newProduct.image ? URL.createObjectURL(newProduct.image) : `${API_URL}${newProduct.imageUrl}`}
            alt="preview"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
          />
        </Box>
      )}

      <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
        {editingProduct ? "Update Product" : "Add Product"}
      </Button>
    </Box>
  );
};

export default AddProductForm;
