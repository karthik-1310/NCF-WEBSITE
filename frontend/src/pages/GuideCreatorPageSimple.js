import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  Card,
  CircularProgress,
  Alert,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { birdService } from "../services/api";

const GuideCreatorPageSimple = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [availableBirds, setAvailableBirds] = useState([]);
  const [selectedBirds, setSelectedBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Get location from localStorage
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      const locationData = JSON.parse(savedLocation);
      setLocation(locationData);
      loadBirds(locationData);
    } else {
      navigate("/select-taxa");
    }
  }, [navigate]);

  const loadBirds = async (locationData) => {
    try {
      setLoading(true);
      const response = await birdService.getBirdsGrouped({
        state: locationData.state,
        district: locationData.district,
      });

      // Flatten the grouped data into a single array
      const allBirds = [];
      Object.values(response).forEach((group) => {
        if (Array.isArray(group)) {
          allBirds.push(...group);
        }
      });

      setAvailableBirds(allBirds);
      setError(null);
    } catch (err) {
      console.error("Error loading birds:", err);
      setError("Failed to load birds. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredBirds = availableBirds.filter(
    (bird) =>
      bird.english_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bird.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBird = (bird) => {
    if (!selectedBirds.find((b) => b.id === bird.id)) {
      setSelectedBirds([...selectedBirds, bird]);
    }
  };

  const handleRemoveBird = (birdId) => {
    setSelectedBirds(selectedBirds.filter((bird) => bird.id !== birdId));
  };

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#10b981" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Sidebar - Selected Species */}
          <Grid item xs={12} md={3}>
            <Box sx={{ position: "sticky", top: 20 }}>
              {/* Search Box */}
              <TextField
                fullWidth
                placeholder="Search species"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    fontSize: "14px",
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#10b981",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#10b981",
                    },
                  },
                }}
              />

              {/* Selected Species List */}
              <Typography
                variant="h3"
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111827",
                  mb: 2,
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                Selected Species
              </Typography>

              <Stack spacing={2}>
                {selectedBirds.map((bird, index) => (
                  <Card
                    key={bird.id}
                    sx={{
                      p: 2,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {/* Bird Image */}
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "6px",
                        backgroundColor: "#6b7c3b",
                        backgroundImage:
                          'url("https://images.unsplash.com/photo-1444464666168-49d633b86797?w=40&h=40&fit=crop&crop=center")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#111827",
                          mb: 0.5,
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {bird.english_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#10b981",
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                        }}
                      >
                        Size: Small
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => handleRemoveBird(bird.id)}
                      size="small"
                      sx={{
                        color: "#ef4444",
                        "&:hover": {
                          backgroundColor: "#fef2f2",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Card>
                ))}
              </Stack>

              {selectedBirds.length === 0 && (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 4,
                    color: "#9ca3af",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                    }}
                  >
                    No species selected yet
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Main Content - Layout Editor */}
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#111827",
                    mb: 1,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  Layout Editor
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#10b981",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  Click species to add them to your guide layout
                </Typography>
              </Box>

              {selectedBirds.length > 0 && (
                <Button
                  onClick={() => navigate("/guide-preview")}
                  variant="contained"
                  sx={{
                    backgroundColor: "#10b981",
                    color: "white",
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    fontSize: "14px",
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#059669",
                      boxShadow: "none",
                    },
                  }}
                >
                  Preview Guide
                </Button>
              )}
            </Box>

            {/* Available Species to Add */}
            {filteredBirds.length > 0 && (
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111827",
                    mb: 3,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                >
                  Available Species ({filteredBirds.length})
                </Typography>

                <Grid container spacing={2}>
                  {filteredBirds.slice(0, 12).map((bird) => (
                    <Grid item xs={6} sm={4} md={3} key={bird.id}>
                      <Card
                        onClick={() => handleAddBird(bird)}
                        sx={{
                          p: 2,
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "#10b981",
                            boxShadow: "0 2px 8px rgba(16, 185, 129, 0.2)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#111827",
                            mb: 1,
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                          }}
                        >
                          {bird.english_name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#6b7280",
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                          }}
                        >
                          {bird.scientific_name}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 4, borderRadius: "12px" }}>
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GuideCreatorPageSimple;
