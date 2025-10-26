import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Guides", path: "/guides" },
    { label: "Explore", path: "/explore" },
    { label: "Create", path: "/select-taxa" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        color: "#111816",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, minHeight: "64px" }}>
          {/* Logo and site title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 6 }}>
            {/* Logo SVG as per your Figma design */}
            <Box
              sx={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%" }}
              >
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="#111816"
                />
              </svg>
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "-0.01em",
                color: "#111816",
                textDecoration: "none",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
              }}
            >
              <RouterLink
                to="/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Nature Guide
              </RouterLink>
            </Typography>
          </Box>

          {/* Desktop navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: "flex", gap: 8 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: isActive(item.path) ? "#111816" : "#6b7280",
                    fontSize: "16px",
                    fontWeight: isActive(item.path) ? 600 : 500,
                    textTransform: "none",
                    padding: 0,
                    minWidth: "auto",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#111816",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Create a Guide Button - matching Figma design */}
          <Button
            component={RouterLink}
            to="/select-taxa"
            variant="contained"
            sx={{
              backgroundColor: "#10b981",
              color: "white",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0em",
              px: 3,
              py: 1.5,
              mr: 3,
              textTransform: "none",
              boxShadow: "none",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              "&:hover": {
                backgroundColor: "#059669",
                boxShadow: "none",
              },
            }}
          >
            Create a Guide
          </Button>

          {/* User Avatar */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "#f3f4f6",
              border: "1px solid #e5e7eb",
            }}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />

          {/* Mobile menu icon */}
          {isMobile && (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Mobile menu dropdown */}
          <Menu
            id="mobile-menu"
            anchorEl={mobileAnchorEl}
            keepMounted
            open={Boolean(mobileAnchorEl)}
            onClose={handleMobileMenuClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                mt: 1,
              },
            }}
          >
            {navigationItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={handleMobileMenuClose}
                component={RouterLink}
                to={item.path}
                selected={isActive(item.path)}
                sx={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: 500,
                  color: "#111816",
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
