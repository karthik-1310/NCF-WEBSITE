import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";

function TestFrontend() {
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testApiConnection = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/test");
        console.log("API response:", response.data);
        setApiStatus(response.data);
        setLoading(false);
      } catch (error) {
        console.error("API connection error:", error);
        setError(error.message || "Failed to connect to API");
        setLoading(false);
      }
    };

    testApiConnection();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        API Connection Test
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : (
        <Box mt={4}>
          <Alert severity="success">API connection successful!</Alert>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Response:
          </Typography>
          <Typography
            component="pre"
            sx={{
              backgroundColor: "#f5f5f5",
              p: 2,
              borderRadius: 1,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(apiStatus, null, 2)}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default TestFrontend;
