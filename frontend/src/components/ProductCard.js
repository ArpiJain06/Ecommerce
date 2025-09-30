import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";
const PLACEHOLDER_IMG = "/placeholder.jpg"

const ProductCard = ({
  product,
  onDelete,
  onAddToCart,
  onRemoveFromCart,
  inCart,
  userRole,
}) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!product.image) return;

    const fetchImage = async () => {
      try {
        const response = await axios.get(`${API_BASE}${product.image}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: response.data.type });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };

    fetchImage();

    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [product.image]);

  const handleToggleCart = () => {
    if (inCart) {
      onRemoveFromCart(product._id);
    } else {
      onAddToCart(product._id);
    }
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Box
          sx={{
            mb: 2,
            textAlign: "center",
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 2,
            bgcolor: "#f5f5f5",
          }}
        >
          <img
            src={imageSrc || PLACEHOLDER_IMG}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // use "contain" if you want full image without crop
              borderRadius: 8,
            }}
          />
        </Box>

        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">${product.price}</Typography>
        {product.category && (
          <Typography>Category: {product.category}</Typography>
        )}
        {product.description && <Typography>{product.description}</Typography>}
      </CardContent>

      <CardActions sx={{ gap: 1 }}>
        {userRole === "admin" && (
          <>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => onDelete(product._id)}
          >
            Delete
          </Button>
      
          <Button
            variant="outlined"
            color="warning"
            fullWidth
            onClick={() => navigate(`/edit-product/${product._id}`, { state: { product } })}
          >
            Update
          </Button>
        </>
        )}

        {userRole === "user" && (
          <Button
            variant={inCart ? "contained" : "outlined"}
            color={inCart ? "success" : "primary"}
            fullWidth
            onClick={handleToggleCart}
          >
            {inCart ? "Remove from Cart" : "Add to Cart"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
