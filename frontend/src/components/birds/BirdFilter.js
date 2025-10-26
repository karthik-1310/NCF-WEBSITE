import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Typography,
  Autocomplete,
  Paper,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useGuideContext } from "../../contexts/GuideContext";
import { birdService } from "../../services/api";

const BirdFilter = ({ onApplyFilters }) => {
  const { filters, updateFilters, resetFilters } = useGuideContext();
  const [expanded, setExpanded] = useState(false);
  const [locations, setLocations] = useState({ states: [], districts: {} });
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(filters.state || "");

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const locationsData = await birdService.getLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Reset district when state changes
  useEffect(() => {
    if (filters.state !== selectedState) {
      updateFilters({ district: "" });
    }
  }, [filters.state, selectedState, updateFilters]);

  // Toggle expanded state
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (field === "state") {
      setSelectedState(value);
      // Clear district when state changes
      updateFilters({ [field]: value, district: "" });
    } else {
      updateFilters({ [field]: value });
    }
  };

  // Handle search input
  const handleSearchChange = (event) => {
    updateFilters({ searchTerm: event.target.value });
  };

  // Apply filters
  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    resetFilters();
    setSelectedState("");
    if (onApplyFilters) {
      onApplyFilters({
        searchTerm: "",
        birdType: "all",
        state: "",
        district: "",
        frequencyRank: "",
        sortBy: "name",
      });
    }
  };

  const birdTypes = [
    { value: "all", label: "All Types" },
    { value: "Raptor", label: "Raptors" },
    { value: "Waterbird", label: "Waterbirds" },
    { value: "Passerine", label: "Passerines" },
    { value: "Wader", label: "Waders" },
    { value: "Other", label: "Other" },
  ];

  const frequencyOptions = [
    { value: "", label: "All Frequencies" },
    { value: "1", label: "Very Common" },
    { value: "2", label: "Common" },
    { value: "3", label: "Uncommon" },
    { value: "4", label: "Rare" },
    { value: "5", label: "Very Rare" },
  ];

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "scientific", label: "Scientific Name" },
    { value: "size", label: "Size (Small to Large)" },
    { value: "frequency", label: "Frequency" },
  ];

  return (
    <Paper elevation={1} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterListIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Filter Birds
          </Typography>
        </Box>

        <Button size="small" onClick={handleToggleExpand} color="primary">
          {expanded ? "Less Filters" : "More Filters"}
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* Search field - always visible */}
        <Grid item xs={12} md={expanded ? 6 : 9}>
          <TextField
            fullWidth
            label="Search Birds"
            variant="outlined"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon color="action" />,
            }}
            size="small"
          />
        </Grid>

        {/* Sort option - always visible */}
        <Grid item xs={12} md={expanded ? 6 : 3}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) => handleInputChange("sortBy", e.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {expanded && (
          <>
            {/* Bird type filter */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Bird Type</InputLabel>
                <Select
                  value={filters.birdType}
                  label="Bird Type"
                  onChange={(e) =>
                    handleInputChange("birdType", e.target.value)
                  }
                >
                  {birdTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* State filter */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>State</InputLabel>
                <Select
                  value={selectedState}
                  label="State"
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  disabled={loading || locations.states.length === 0}
                >
                  <MenuItem value="">
                    <em>All States</em>
                  </MenuItem>
                  {locations.states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* District filter */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>District</InputLabel>
                <Select
                  value={filters.district}
                  label="District"
                  onChange={(e) =>
                    handleInputChange("district", e.target.value)
                  }
                  disabled={
                    loading ||
                    !selectedState ||
                    !locations.districts[selectedState]
                  }
                >
                  <MenuItem value="">
                    <em>All Districts</em>
                  </MenuItem>
                  {selectedState &&
                    locations.districts[selectedState] &&
                    locations.districts[selectedState].map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Frequency filter */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={filters.frequencyRank}
                  label="Frequency"
                  onChange={(e) =>
                    handleInputChange("frequencyRank", e.target.value)
                  }
                >
                  {frequencyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
        <Button variant="outlined" onClick={handleResetFilters}>
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          disableElevation
        >
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default BirdFilter;
