import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { login as fetchLogin } from "./api/auth"; 
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
import { getCart } from "./api/cart";
import Login from "./pages/Login"; 

// <-- Add these imports
import AddProductForm from "./pages/AddProductForm";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginWrapper />} />
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/user" element={
            <ProtectedRoute role="user">
              <UserDashboardWithCart />
            </ProtectedRoute>
          } />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product/:id" element={<AddProductForm />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Wrapper for Login page to set user in context
const LoginWrapper = () => {
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (loginData) => {
    try {
      const loginResponse = await fetchLogin(loginData); // your API call
      setUser({
        userId: loginResponse.user_id,
        role: loginResponse.role,
      });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return <Login onLogin={handleLogin} />;
};

// User Dashboard with cart fetching
const UserDashboardWithCart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      if (!user) return;
      try {
        const cartData = await getCart(user.userId);
        setCart(cartData.items);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };
    fetchCartData();
  }, [user]);

  return <UserDashboard cart={cart} />;
};

// Protected Route
const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  if (user.role !== role) return <Navigate to="/" />;
  return children;
};

export default App;
