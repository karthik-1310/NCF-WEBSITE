import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          sx={{ fontSize: "5rem", fontWeight: 700 }}
        >
          404
        </Typography>

        <Typography variant="h4" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          align="center"
        >
          The page you're looking for doesn't exist or has been moved. Please
          check the URL or return to the homepage.
        </Typography>

        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Return Home
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
