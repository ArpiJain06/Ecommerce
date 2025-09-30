import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CartProvider } from './context/CartContext';
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CartProvider>
      <App />
    </CartProvider>
  </ThemeProvider>
);
