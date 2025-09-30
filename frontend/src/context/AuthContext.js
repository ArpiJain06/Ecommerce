import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (data) => {
    // Ensure we store userId (not user_id)
    setUser({
      userId: data.user_id, // must match backend param
      name: data.username,
      role: data.role,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: data.user_id,
        name: data.username,
        role: data.role,
      })
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
