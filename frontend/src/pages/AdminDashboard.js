import { useEffect, useState, useContext, useCallback } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Masonry from "react-masonry-css";
import ProductCard from "../components/ProductCard";
import { getProducts, deleteProduct } from "../api/product";
import { getCategories } from "../api/category.js"; // you'll need to create this API call
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

 // Fetch products from API
  const fetchProducts = useCallback(async (search = "", category = "") => {
    setLoadingProducts(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category_id", category);

      const data = await getProducts(params.toString()); 
      setProducts(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    }
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  if (loadingProducts)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Box sx={{ mt: 5, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Search and Category Filter */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center", gap: 1 }}>
        <TextField
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ width: 250 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => fetchProducts(searchQuery, selectedCategory)}
        >
          Search
        </Button>
      </Box>


      {/* Products Masonry */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            userRole={user?.role}
          />
        ))}
      </Masonry>

      <style>{`
        .my-masonry-grid { display: flex; margin-left: -16px; width: auto; }
        .my-masonry-grid_column { padding-left: 16px; background-clip: padding-box; }
        .my-masonry-grid_column > div { margin-bottom: 16px; }
      `}</style>
    </Box>
  );
};

export default AdminDashboard;
