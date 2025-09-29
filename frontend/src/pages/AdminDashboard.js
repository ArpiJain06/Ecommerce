import { useEffect, useState, useContext } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Masonry from "react-masonry-css";
import { getProducts, addProduct, deleteProduct } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description) {
    alert("All fields are required");
    return;
    }
    try {
      const productToSend = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category_id: newProduct.category,
        description: newProduct.description,
      };
      console.log("aaaaaaa", productToSend);
      console.log("aa", newProduct);
      
      await addProduct( productToSend);

      setNewProduct({ name: "", price: "", category: "", description: "" });
      fetchProducts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add product. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 5,
          maxWidth: 600,
          mx: "auto",
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6">Add New Product</Typography>
        <TextField
          label="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          size="small"
        />
        <TextField
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          size="small"
        />
        <TextField
          label="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          size="small"
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Product
        </Button>
      </Box>

      {/* Masonry Product Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((p) => (
          <Card
            key={p._id}
            sx={{
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography variant="h6">{p.name}</Typography>
              <Typography color="text.secondary" sx={{ mb: 1 }}>
                ${p.price}
              </Typography>
              {p.category && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Category: {p.category}
                </Typography>
              )}
              {p.description && (
                <Typography variant="body2">{p.description}</Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Masonry>

      {/* Masonry CSS */}
      <style>{`
        .my-masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }
        .my-masonry-grid_column > div {
          margin-bottom: 16px;
        }
      `}</style>
    </Box>
  );
};

export default AdminDashboard;
