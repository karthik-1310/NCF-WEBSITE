import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { convertDriveLink } from "../../utils/helpers";

// Constants for frequency rank display
const FREQUENCY_COLORS = {
  1: "#d9534f", // Very common - Red
  2: "#f0ad4e", // Common - Orange
  3: "#5bc0de", // Uncommon - Blue
  4: "#5cb85c", // Rare - Green
  5: "#777777", // Very rare - Gray
};

const FREQUENCY_LABELS = {
  1: "Very Common",
  2: "Common",
  3: "Uncommon",
  4: "Rare",
  5: "Very Rare",
};

const BirdCard = ({
  bird,
  isInGuide = false,
  onClick,
  onAddToGuide,
  onRemoveFromGuide,
  showScientificName = true,
  showLocalName = false,
  localLanguage = "",
  compact = false,
  elevation = 1,
}) => {
  // Find default illustration or use the first one
  const defaultIllustration =
    (bird.illustrations && bird.illustrations.find((i) => i.is_default)) ||
    (bird.illustrations && bird.illustrations[0]);

  // Get image URL, converting from Google Drive if needed
  const imageUrl = defaultIllustration
    ? convertDriveLink(defaultIllustration.image_link)
    : "";

  // Get local name if requested
  const localName =
    showLocalName && bird.names && localLanguage
      ? bird.names.find((n) => n.language === localLanguage)?.name || ""
      : "";

  // Handle click on the card
  const handleCardClick = () => {
    if (onClick) onClick(bird);
  };

  // Prevent event propagation when clicking buttons
  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    callback(bird);
  };

  return (
    <Card
      sx={{
        height: compact ? "auto" : "100%",
        display: "flex",
        flexDirection: "column",
        cursor: onClick ? "pointer" : "default",
      }}
      elevation={elevation}
      className="bird-card"
      onClick={handleCardClick}
    >
      {imageUrl && (
        <CardMedia
          component="img"
          height={compact ? 120 : 180}
          image={imageUrl}
          alt={bird.english_name}
          sx={{ objectFit: "cover" }}
        />
      )}

      <CardContent
        sx={{
          flexGrow: 1,
          pt: 1.5,
          pb: compact ? 1 : 1.5,
          px: compact ? 1.5 : 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 0.5,
          }}
        >
          <Typography
            variant={compact ? "subtitle1" : "h6"}
            component="h2"
            gutterBottom={!compact}
            noWrap
          >
            {bird.english_name}
          </Typography>

          {bird.frequency_rank && (
            <Chip
              label={
                compact
                  ? bird.frequency_rank
                  : FREQUENCY_LABELS[bird.frequency_rank]
              }
              size="small"
              sx={{
                bgcolor: FREQUENCY_COLORS[bird.frequency_rank],
                color: "white",
                fontWeight: 500,
                fontSize: compact ? "0.7rem" : "0.75rem",
              }}
            />
          )}
        </Box>

        {showScientificName && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontStyle: "italic",
              mb: 1,
              fontSize: compact ? "0.8rem" : "0.875rem",
            }}
            noWrap
          >
            {bird.scientific_name}
          </Typography>
        )}

        {showLocalName && localName && (
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: compact ? "0.8rem" : "0.875rem" }}
            noWrap
          >
            {localName} ({localLanguage})
          </Typography>
        )}

        {!compact && (
          <Typography variant="body2" color="text.secondary">
            {bird.type || "Bird"} • {bird.size || "Unknown size"}
          </Typography>
        )}
      </CardContent>

      {(onAddToGuide || onRemoveFromGuide) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            pt: 0,
            mt: "auto",
          }}
        >
          {isInGuide ? (
            <IconButton
              size="small"
              color="error"
              onClick={(e) => handleButtonClick(e, onRemoveFromGuide)}
              className="remove-button"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              color="primary"
              onClick={(e) => handleButtonClick(e, onAddToGuide)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
    </Card>
  );
};

export default BirdCard;
