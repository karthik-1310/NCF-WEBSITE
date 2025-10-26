import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getStatesAndDistricts } from "../services/api";

const RegionSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      loadDistricts(selectedState);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState]);

  const loadStates = async () => {
    try {
      setLoading(true);
      const response = await getStatesAndDistricts();
      const uniqueStates = [
        ...new Set(response.map((item) => item.state)),
      ].sort();
      setStates(uniqueStates);
      setError(null);
    } catch (err) {
      console.error("Error loading states:", err);
      setError("Failed to load location data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadDistricts = async (state) => {
    try {
      const response = await getStatesAndDistricts();
      const stateDistricts = response
        .filter((item) => item.state === state)
        .map((item) => item.district)
        .filter((district) => district && district.trim() !== "")
        .sort();
      const uniqueDistricts = [...new Set(stateDistricts)];
      setDistricts(uniqueDistricts);
    } catch (err) {
      console.error("Error loading districts:", err);
      setError("Failed to load districts. Please try again.");
    }
  };

  const handleContinue = () => {
    if (selectedState && selectedDistrict) {
      // Store selection in localStorage or context
      localStorage.setItem(
        "selectedLocation",
        JSON.stringify({
          state: selectedState,
          district: selectedDistrict,
        })
      );
      navigate("/create-guide");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#c5ebe0" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 700,
              color: "#111816",
              mb: 3,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              letterSpacing: "-0.02em",
            }}
          >
            Select your region
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#6b7280",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Choose your state and district to get birds specific to your area
            with accurate frequency data.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}

        <Box sx={{ maxWidth: "600px", mx: "auto", mb: 8 }}>
          <Card
            sx={{
              p: 6,
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              boxShadow: "none",
            }}
          >
            <Stack spacing={4}>
              <FormControl fullWidth>
                <InputLabel
                  id="state-select-label"
                  sx={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: "16px",
                  }}
                >
                  State
                </InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={selectedState}
                  label="State"
                  onChange={(e) => setSelectedState(e.target.value)}
                  sx={{
                    borderRadius: "12px",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#c5ebe0",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#c5ebe0",
                    },
                  }}
                >
                  {states.map((state) => (
                    <MenuItem
                      key={state}
                      value={state}
                      sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                disabled={!selectedState || districts.length === 0}
              >
                <InputLabel
                  id="district-select-label"
                  sx={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: "16px",
                  }}
                >
                  District
                </InputLabel>
                <Select
                  labelId="district-select-label"
                  id="district-select"
                  value={selectedDistrict}
                  label="District"
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  sx={{
                    borderRadius: "12px",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#c5ebe0",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#c5ebe0",
                    },
                  }}
                >
                  {districts.map((district) => (
                    <MenuItem
                      key={district}
                      value={district}
                      sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedState && districts.length === 0 && (
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#6b7280",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    textAlign: "center",
                  }}
                >
                  No districts available for {selectedState}
                </Typography>
              )}
            </Stack>
          </Card>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Button
            onClick={() => navigate("/select-taxa")}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#e5e7eb",
              color: "#111816",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f9fafb",
                borderColor: "#d1d5db",
              },
            }}
          >
            Back
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!selectedState || !selectedDistrict}
            variant="contained"
            size="large"
            sx={{
              backgroundColor:
                selectedState && selectedDistrict ? "#c5ebe0" : "#f3f4f6",
              color: "#111816",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor:
                  selectedState && selectedDistrict ? "#12e7ab" : "#f3f4f6",
                boxShadow: "none",
              },
              "&:disabled": {
                color: "#9ca3af",
                backgroundColor: "#f3f4f6",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RegionSelectionPage;
