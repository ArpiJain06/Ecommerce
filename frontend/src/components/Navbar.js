import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Apni Dukaan
        </Typography>

        {user && (
          <>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() =>
                navigate(user.role === "admin" ? "/admin" : "/user")
              }
            >
              Browse Products
            </Button>

            {user.role === "admin" && (
              <Button
                color="inherit"
                startIcon={<AddIcon />}
                onClick={() => navigate("/add-product")}
              >
                Add Product
              </Button>
            )}

            {user.role === "user" && (
              <Button
                color="inherit"
                startIcon={<ShoppingCartIcon />}
                onClick={() => navigate("/cart")}
              >
                Cart
              </Button>
            )}

            {/* User info with icon */}
            <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
              <AccountCircleIcon sx={{ mr: 1 }} />
              <Typography>{user.name}</Typography>
            </Box>

            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
