import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // classic blue
      contrastText: "#fff",
    },
    secondary: {
      main: "#90caf9", // light blue accent
      contrastText: "#000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    error: {
      main: "#d32f2f",
    },
    text: {
      primary: "#212121",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, padding: "8px 16px" },
        containedPrimary: {
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#115293" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: 4,
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
});

export default theme;
