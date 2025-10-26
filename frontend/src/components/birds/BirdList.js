import React from "react";
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BirdCard from "./BirdCard";
import { useGuideContext } from "../../contexts/GuideContext";

const BirdList = ({
  groupedBirds,
  loading,
  error,
  showScientificNames = true,
  showLocalNames = false,
  selectedLocalLanguage = "",
  compact = false,
}) => {
  const { selectedBirds, addBirdToGuide, removeBirdFromGuide } =
    useGuideContext();

  // Handle adding a bird to the guide
  const handleAddBird = (bird) => {
    addBirdToGuide(bird);
  };

  // Handle removing a bird from the guide
  const handleRemoveBird = (bird) => {
    removeBirdFromGuide(bird.english_name);
  };

  // Check if a bird is in the guide
  const isInGuide = (englishName) => {
    return selectedBirds.some((bird) => bird.english_name === englishName);
  };

  // If loading, show loading indicator
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography color="error" variant="h6">
          Error loading birds
        </Typography>
        <Typography color="text.secondary">{error}</Typography>
      </Box>
    );
  }

  // If no birds found, show empty message
  if (!groupedBirds || Object.keys(groupedBirds).length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          my: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">No birds found</Typography>
        <Typography color="text.secondary">
          Try adjusting your filters to find more birds
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      {Object.entries(groupedBirds).map(([group, birds]) => (
        <Accordion key={group} defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${group}-content`}
            id={`${group}-header`}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              borderRadius: "4px 4px 0 0",
            }}
          >
            <Typography variant="h6" component="h3">
              {group} ({birds.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {birds.map((bird) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={compact ? 3 : 4}
                  key={bird.english_name}
                >
                  <BirdCard
                    bird={bird}
                    isInGuide={isInGuide(bird.english_name)}
                    onAddToGuide={handleAddBird}
                    onRemoveFromGuide={handleRemoveBird}
                    showScientificName={showScientificNames}
                    showLocalName={showLocalNames}
                    localLanguage={selectedLocalLanguage}
                    compact={compact}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default BirdList;
