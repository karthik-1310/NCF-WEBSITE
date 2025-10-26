import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Container,
  LinearProgress,
} from "@mui/material";

const TaxaSelectionPage = () => {
  const navigate = useNavigate();

  const handleTaxaSelect = (taxa) => {
    if (taxa === "birds") {
      localStorage.setItem("selectedTaxa", "birds");
      navigate("/select-region");
    } else {
      // Show coming soon message for other taxa
      alert("Coming soon! Currently only bird guides are available.");
    }
  };

  const taxaOptions = [
    {
      id: "birds",
      name: "Birds",
      image:
        'url("https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=300&fit=crop&crop=center")',
      backgroundColor: "#6b7c3b",
      available: true,
    },
    {
      id: "butterflies",
      name: "Butterflies",
      image:
        'url("https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=300&fit=crop&crop=center")',
      backgroundColor: "#f3f4f6",
      available: false,
    },
    {
      id: "mammals",
      name: "Mammals",
      image:
        'url("https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=300&h=300&fit=crop&crop=center")',
      backgroundColor: "#374151",
      available: false,
    },
    {
      id: "reptiles",
      name: "Reptiles",
      image:
        'url("https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=300&fit=crop&crop=center")',
      backgroundColor: "#e5e0d1",
      available: false,
    },
    {
      id: "amphibians",
      name: "Amphibians",
      image:
        'url("https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=300&fit=crop&crop=center")',
      backgroundColor: "#e5e0d1",
      available: false,
    },
    {
      id: "insects",
      name: "Insects",
      image:
        'url("https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=300&fit=crop&crop=center")',
      backgroundColor: "#e5e0d1",
      available: false,
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Progress Indicator - matching your Figma design */}
        <Box sx={{ mb: 6 }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#6b7280",
              mb: 2,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            Step 1 of 5: Select Taxa
          </Typography>

          <LinearProgress
            variant="determinate"
            value={20} // 1 of 5 steps = 20%
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e5e7eb",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#10b981",
                borderRadius: 4,
              },
            }}
          />
        </Box>

        {/* Main Heading */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "28px", md: "40px" },
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.2,
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            letterSpacing: "-0.02em",
            mb: 8,
            maxWidth: "800px",
          }}
        >
          Choose the type of species you want to include in your guide.
        </Typography>

        {/* Taxa Selection Grid - matching your Figma layout */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {taxaOptions.map((taxa, index) => (
            <Grid item xs={12} sm={6} md={4} key={taxa.id}>
              <Card
                onClick={() => handleTaxaSelect(taxa.id)}
                sx={{
                  backgroundColor: taxa.backgroundColor,
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: taxa.available ? "pointer" : "not-allowed",
                  opacity: taxa.available ? 1 : 0.7,
                  transition: "all 0.2s ease",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  minHeight: "280px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  "&:hover": taxa.available
                    ? {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      }
                    : {},
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    height: "200px",
                    backgroundImage: taxa.image,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  {!taxa.available && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: "rgba(255,255,255,0.9)",
                        borderRadius: "6px",
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#6b7280",
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                        }}
                      >
                        Coming Soon
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Text Section */}
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color:
                        taxa.backgroundColor === "#f3f4f6" ||
                        taxa.backgroundColor === "#e5e0d1"
                          ? "#111827"
                          : "white",
                      textAlign: "center",
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                    }}
                  >
                    {taxa.name}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
            sx={{
              borderColor: "#e5e7eb",
              color: "#6b7280",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              "&:hover": {
                borderColor: "#d1d5db",
                backgroundColor: "transparent",
              },
            }}
          >
            Back
          </Button>

          <Button
            onClick={() => handleTaxaSelect("birds")}
            variant="contained"
            sx={{
              backgroundColor: "#10b981",
              color: "white",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              fontSize: "16px",
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
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TaxaSelectionPage;
