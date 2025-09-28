import { useEffect, useState } from "react";
import { Container, Typography, Button, TextField, Box } from "@mui/material";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const fetchProducts = async () => {
    const data = await getProducts(user.token);
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async () => {
    await addProduct(user.token, newProduct);
    setNewProduct({ name: "", price: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(user.token, id);
    fetchProducts();
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Box sx={{ mt: 3, mb: 3 }}>
        <TextField
          label="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAdd}>Add Product</Button>
      </Box>
      {products.map((p) => (
        <Box key={p.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography>{p.name} - ${p.price}</Typography>
          <Button variant="outlined" color="error" onClick={() => handleDelete(p.id)}>Delete</Button>
        </Box>
      ))}
    </Container>
  );
};

export default AdminDashboard;
