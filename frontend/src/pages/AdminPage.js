import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PieChartIcon from "@mui/icons-material/PieChart";
import { adminService } from "../services/api";

// Helper component for tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [statistics, setStatistics] = useState(null);
  const [species, setSpecies] = useState([]);
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [speciesDetail, setSpeciesDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch statistics on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsData = await adminService.getStatistics();
        setStatistics(statsData);

        const speciesData = await adminService.getAllSpecies();
        setSpecies(speciesData);
        setFilteredSpecies(speciesData);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredSpecies(species);
    } else {
      const filtered = species.filter(
        (s) =>
          s.english_name.toLowerCase().includes(value) ||
          s.scientific_name.toLowerCase().includes(value)
      );
      setFilteredSpecies(filtered);
    }
  };

  // View species detail
  const handleViewSpecies = async (englishName) => {
    setDetailLoading(true);
    setSelectedSpecies(englishName);

    try {
      const detail = await adminService.getSpeciesDetail(englishName);
      setSpeciesDetail(detail);
    } catch (error) {
      console.error(`Error fetching detail for ${englishName}:`, error);
      setError(`Failed to load details for ${englishName}`);
    } finally {
      setDetailLoading(false);
    }
  };

  // Handle file upload (placeholder)
  const handleFileUpload = (event) => {
    // This would be replaced with actual file upload logic
    alert("File upload functionality is not yet implemented.");
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Dashboard" />
          <Tab label="Species" />
          <Tab label="Data Management" />
        </Tabs>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={0}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          ) : statistics ? (
            <>
              <Typography variant="h6" gutterBottom>
                Database Statistics
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Total Species
                      </Typography>
                      <Typography variant="h4">
                        {statistics.counts.species}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Illustrations
                      </Typography>
                      <Typography variant="h4">
                        {statistics.counts.illustrations}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Local Names
                      </Typography>
                      <Typography variant="h4">
                        {statistics.counts.names}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="text.secondary" gutterBottom>
                        Frequency Records
                      </Typography>
                      <Typography variant="h4">
                        {statistics.counts.frequency}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>
                Data Coverage
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Species with Illustrations
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-flex",
                            mr: 2,
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={statistics.coverage.illustrations.percentage}
                            size={80}
                            thickness={5}
                            color="primary"
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              component="div"
                              color="text.secondary"
                            >
                              {`${Math.round(
                                statistics.coverage.illustrations.percentage
                              )}%`}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {statistics.coverage.illustrations.count} out of{" "}
                          {statistics.counts.species} species have
                          illustrations.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Species with Local Names
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-flex",
                            mr: 2,
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={statistics.coverage.names.percentage}
                            size={80}
                            thickness={5}
                            color="secondary"
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              component="div"
                              color="text.secondary"
                            >
                              {`${Math.round(
                                statistics.coverage.names.percentage
                              )}%`}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {statistics.coverage.names.count} out of{" "}
                          {statistics.counts.species} species have local names.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : null}
        </TabPanel>

        {/* Species Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Search Species"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>English Name</TableCell>
                    <TableCell>Scientific Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="center">Images</TableCell>
                    <TableCell align="center">Names</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSpecies.slice(0, 100).map((species) => (
                    <TableRow key={species.english_name}>
                      <TableCell component="th" scope="row">
                        {species.english_name}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: "italic" }}
                        >
                          {species.scientific_name}
                        </Typography>
                      </TableCell>
                      <TableCell>{species.type}</TableCell>
                      <TableCell>{species.size || "N/A"}</TableCell>
                      <TableCell align="center">
                        {species.illustrations?.length || 0}
                      </TableCell>
                      <TableCell align="center">
                        {species.names?.length || 0}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleViewSpecies(species.english_name)
                          }
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredSpecies.length > 100 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Showing 100 of {filteredSpecies.length} results. Please
                        refine your search.
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredSpecies.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No species found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Species Detail Dialog would be added here */}
        </TabPanel>

        {/* Data Management Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Upload Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Upload CSV files to update species data, illustrations,
                    names, or frequency data.
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <input
                      type="file"
                      id="contained-button-file"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Select File
                      </Button>
                    </label>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Data Validation
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Run validation checks on the database to identify missing or
                    inconsistent data.
                  </Typography>

                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PieChartIcon />}
                    sx={{ mt: 2 }}
                  >
                    Run Validation
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AdminPage;
