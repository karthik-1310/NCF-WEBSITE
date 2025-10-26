import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  Paper,
  Divider,
  Snackbar,
} from "@mui/material";
import { birdService } from "../services/api";
import { useGuideContext } from "../contexts/GuideContext";
import BirdFilter from "../components/birds/BirdFilter";
import BirdList from "../components/birds/BirdList";
import { sortBirds } from "../utils/helpers";

const BirdExplorerPage = () => {
  const { filters } = useGuideContext();
  const [groupedBirds, setGroupedBirds] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Fetch birds on component mount and when filters change
  useEffect(() => {
    fetchBirds();
  }, []);

  // Fetch birds with the specified filters
  const fetchBirds = async (filterParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Combine current filters with any new filter parameters
      const params = { ...filters, ...filterParams };

      // Only include necessary filter params
      const apiParams = {};
      if (params.state) apiParams.state = params.state;
      if (params.district) apiParams.district = params.district;
      if (params.frequencyRank) apiParams.frequency_rank = params.frequencyRank;

      // Fetch birds from API
      const data = await birdService.getBirdsGrouped(apiParams);

      // Apply local filtering and sorting
      const filteredData = {};

      Object.entries(data).forEach(([group, birds]) => {
        // Filter by search term and bird type
        let filteredBirds = birds;

        if (params.searchTerm) {
          const searchTerm = params.searchTerm.toLowerCase();
          filteredBirds = filteredBirds.filter(
            (bird) =>
              bird.english_name.toLowerCase().includes(searchTerm) ||
              bird.scientific_name.toLowerCase().includes(searchTerm) ||
              (bird.names &&
                bird.names.some((name) =>
                  name.name.toLowerCase().includes(searchTerm)
                ))
          );
        }

        if (params.birdType && params.birdType !== "all") {
          filteredBirds = filteredBirds.filter(
            (bird) => bird.type === params.birdType
          );
        }

        // Sort birds
        filteredBirds = sortBirds(filteredBirds, params.sortBy);

        // Only add the group if it has birds after filtering
        if (filteredBirds.length > 0) {
          filteredData[group] = filteredBirds;
        }
      });

      setGroupedBirds(filteredData);

      // Count total birds
      const totalBirds = Object.values(filteredData).reduce(
        (acc, birds) => acc + birds.length,
        0
      );

      // Show notification if no birds found
      if (totalBirds === 0) {
        setNotificationMessage("No birds found matching your filters.");
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error("Error fetching birds:", error);
      setError("Failed to fetch birds. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle applying filters
  const handleApplyFilters = (filterParams) => {
    fetchBirds(filterParams);
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Explore Birds
      </Typography>

      <Typography variant="body1" paragraph>
        Browse and filter birds to add to your custom field guide. You can
        search by name, filter by type, location, and frequency to find the
        birds you're interested in.
      </Typography>

      <BirdFilter onApplyFilters={handleApplyFilters} />

      <BirdList
        groupedBirds={groupedBirds}
        loading={loading}
        error={error}
        showScientificNames={true}
      />

      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message={notificationMessage}
      />
    </Box>
  );
};

export default BirdExplorerPage;
