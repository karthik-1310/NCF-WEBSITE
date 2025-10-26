import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Page components
import HomePage from "./pages/HomePage";
import BirdExplorerPage from "./pages/BirdExplorerPage";
import GuideCreatorPage from "./pages/GuideCreatorPage";
import GuidePreviewPage from "./pages/GuidePreviewPage";
import TaxaSelectionPage from "./pages/TaxaSelectionPage";
import RegionSelectionPage from "./pages/RegionSelectionPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

// Create light theme with mint green accents to match your Figma design
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#12e7ab", // Bright mint green from your design
      light: "#c5ebe0",
      dark: "#0d9488",
    },
    secondary: {
      main: "#c5ebe0", // Light mint green
      light: "#eaf1ef",
      dark: "#4c9a84",
    },
    background: {
      default: "#ffffff", // Pure white background to match Figma
      paper: "#f9fafb", // Very light gray for cards
    },
    text: {
      primary: "#111816", // Dark text
      secondary: "#6b7280", // Medium gray text to match Figma
    },
    divider: "#e5e7eb", // Light gray borders to match Figma
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: "3rem",
      letterSpacing: "-0.015em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.015em",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      letterSpacing: "-0.015em",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
      letterSpacing: "-0.015em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.015em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px", // Fully rounded buttons like in your design
          textTransform: "none",
          fontWeight: 700,
          letterSpacing: "0.015em",
          padding: "10px 16px",
          fontSize: "14px",
        },
        contained: {
          backgroundColor: "#c5ebe0",
          color: "#111816",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#12e7ab",
            boxShadow: "none",
          },
        },
        outlined: {
          borderColor: "#eaf1ef",
          color: "#111816",
          backgroundColor: "#eaf1ef",
          "&:hover": {
            borderColor: "#c5ebe0",
            backgroundColor: "#c5ebe0",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: "#f9fbfa",
          border: "1px solid #d5e2de",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "#eaf1ef",
            border: "none",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f8fcfb",
          fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
        }}
      >
        <Header />

        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<BirdExplorerPage />} />
            <Route path="/select-taxa" element={<TaxaSelectionPage />} />
            <Route path="/select-region" element={<RegionSelectionPage />} />
            <Route path="/create-guide" element={<GuideCreatorPage />} />
            <Route path="/guide-preview" element={<GuidePreviewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
