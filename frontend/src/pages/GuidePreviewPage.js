import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stack,
} from "@mui/material";

const GuidePreviewPage = () => {
  const navigate = useNavigate();
  const [selectedQuality, setSelectedQuality] = useState("low");

  const handleQualityChange = (event) => {
    setSelectedQuality(event.target.value);
  };

  const handleDownload = () => {
    alert("PDF download would start here!");
  };

  const handleEditGuide = () => {
    navigate("/create-guide");
  };

  const handleShareGuide = () => {
    alert("Share functionality coming soon!");
  };

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#111827",
              mb: 2,
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            Guide Preview
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#10b981",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            Review your guide before downloading or sharing.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={6}>
          {/* Guide Preview */}
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                backgroundColor: "#f3f4f6",
                borderRadius: "16px",
                p: 6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "600px",
                boxShadow: "none",
                border: "1px solid #e5e7eb",
              }}
            >
              {/* Guide Cover Preview */}
              <Box
                sx={{
                  width: "320px",
                  height: "480px",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Cover Image */}
                <Box
                  sx={{
                    height: "100%",
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&crop=center")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(6, 95, 70, 0.9) 100%)",
                    }}
                  />

                  {/* Title */}
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      textAlign: "center",
                      color: "white",
                      px: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: 700,
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        mb: 2,
                      }}
                    >
                      Nature Guide Core
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                    >
                      Birds Species of [Region]
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>

          {/* Options Sidebar */}
          <Box sx={{ width: { xs: "100%", md: "320px" } }}>
            {/* Download Options */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111827",
                  mb: 3,
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                Download Options
              </Typography>

              <FormControl component="fieldset">
                <RadioGroup
                  value={selectedQuality}
                  onChange={handleQualityChange}
                >
                  <FormControlLabel
                    value="low"
                    control={
                      <Radio
                        sx={{
                          color: "#e5e7eb",
                          "&.Mui-checked": {
                            color: "#10b981",
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#111827",
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                          }}
                        >
                          Low Quality (1.5MB)
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="medium"
                    control={
                      <Radio
                        sx={{
                          color: "#e5e7eb",
                          "&.Mui-checked": {
                            color: "#10b981",
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#111827",
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                          }}
                        >
                          Medium Quality (3.2MB)
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="high"
                    control={
                      <Radio
                        sx={{
                          color: "#e5e7eb",
                          "&.Mui-checked": {
                            color: "#10b981",
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#111827",
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                          }}
                        >
                          High Quality (6.8MB)
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "12px",
                py: 2,
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                boxShadow: "none",
                mb: 4,
                "&:hover": {
                  backgroundColor: "#059669",
                  boxShadow: "none",
                },
              }}
            >
              Download PDF
            </Button>

            {/* Action Buttons */}
            <Stack spacing={2}>
              <Button
                onClick={handleEditGuide}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#e5e7eb",
                  color: "#6b7280",
                  borderRadius: "12px",
                  py: 1.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  "&:hover": {
                    borderColor: "#10b981",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Edit Guide
              </Button>

              <Button
                onClick={handleShareGuide}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: "#e5e7eb",
                  color: "#6b7280",
                  borderRadius: "12px",
                  py: 1.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  textTransform: "none",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  "&:hover": {
                    borderColor: "#10b981",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Share Guide
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default GuidePreviewPage;
