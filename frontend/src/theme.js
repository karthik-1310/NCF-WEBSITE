import { createTheme } from "@mui/material/styles";

// NCF dark theme colors matching the CSS variables
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#22C55E", // --primary
      light: "#4ADE80",
      dark: "#16A34A",
      contrastText: "#0E1412", // --bg
    },
    secondary: {
      main: "#10B981", // --accent
      light: "#34D399",
      dark: "#059669",
      contrastText: "#0E1412",
    },
    background: {
      default: "#0E1412", // --bg
      paper: "#111A16", // --surface
    },
    surface: {
      main: "#111A16", // --surface
      elevated: "#1A2920", // --surface-elev
    },
    text: {
      primary: "#E7F2ED", // --text
      secondary: "#94A3B8", // --text-dim
      disabled: "#64748B",
    },
    divider: "#27362F", // --border
    grey: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 600,
      fontSize: "3rem", // 48px
      color: "#E7F2ED",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem", // 32px
      color: "#E7F2ED",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem", // 24px
      color: "#E7F2ED",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem", // 20px
      color: "#E7F2ED",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem", // 18px
      color: "#E7F2ED",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem", // 16px
      color: "#E7F2ED",
    },
    body1: {
      fontSize: "1rem", // 16px
      color: "#E7F2ED",
    },
    body2: {
      fontSize: "0.875rem", // 14px
      color: "#94A3B8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12, // var(--radius-card)
          fontWeight: 500,
        },
        contained: {
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
        outlined: {
          borderColor: "#27362F",
          color: "#E7F2ED",
          "&:hover": {
            backgroundColor: "#1A2920",
            borderColor: "#27362F",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // var(--radius-card)
          backgroundColor: "#111A16", // --surface
          border: "1px solid #27362F", // --border
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#111A16", // --surface
          border: "1px solid #27362F", // --border
          borderRadius: 12,
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#0E1412", // --bg
            "& fieldset": {
              borderColor: "#27362F", // --border
            },
            "&:hover fieldset": {
              borderColor: "#22C55E", // --primary
            },
            "&.Mui-focused fieldset": {
              borderColor: "#22C55E", // --primary
            },
          },
          "& .MuiInputLabel-root": {
            color: "#94A3B8", // --text-dim
            "&.Mui-focused": {
              color: "#22C55E", // --primary
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "#E7F2ED", // --text
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#0E1412", // --bg
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#27362F", // --border
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#22C55E", // --primary
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#22C55E", // --primary
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#E7F2ED", // --text
          "&:hover": {
            backgroundColor: "#1A2920", // --surface-elev
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(34, 197, 94, 0.1)", // --primary with opacity
            "&:hover": {
              backgroundColor: "rgba(34, 197, 94, 0.15)",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A2920", // --surface-elev
          color: "#E7F2ED", // --text
          border: "1px solid #27362F", // --border
        },
        colorPrimary: {
          backgroundColor: "rgba(34, 197, 94, 0.1)", // --primary with opacity
          color: "#22C55E", // --primary
          border: "1px solid rgba(34, 197, 94, 0.2)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#111A16", // --surface
          borderBottom: "1px solid #27362F", // --border
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#E7F2ED", // --text
        },
        colorTextSecondary: {
          color: "#94A3B8", // --text-dim
        },
      },
    },
  },
});

export default theme;
