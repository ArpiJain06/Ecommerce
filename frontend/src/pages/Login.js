import { useState, useContext } from "react";
import { Button, TextField, Container, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginInput, password);
      login(data);

      if (data.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      setError("Invalid username/email or password");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Apni Dukaan Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username or Email"
          fullWidth
          required
          margin="normal"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          required
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
