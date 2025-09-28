import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Apni Dukaan
        </Typography>
        {user ? (
          <>
            <Typography sx={{ mr: 2 }}>{user.name}</Typography>
            <Button color="inherit" onClick={() => { logout(); navigate("/"); }}>
              Logout
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
