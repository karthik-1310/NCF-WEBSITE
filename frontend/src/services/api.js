import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: "/api", // This will use the proxy setup in package.json in development
  headers: {
    "Content-Type": "application/json",
  },
});

// Bird API endpoints
export const birdService = {
  // Get birds grouped by taxonomic order with optional filtering
  getBirdsGrouped: async (filters = {}) => {
    try {
      // Build query parameters from filters
      const params = {};
      if (filters.state) params.state = filters.state;
      if (filters.district) params.district = filters.district;
      if (filters.frequencyRank) params.frequency_rank = filters.frequencyRank;

      const response = await api.get("/birds/grouped", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching grouped birds:", error);
      throw error;
    }
  },

  // Get states and districts for filtering
  getLocations: async () => {
    try {
      const response = await api.get("/birds/locations");
      return response.data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  },
};

// Admin API endpoints
export const adminService = {
  // Get all species with detailed information
  getAllSpecies: async () => {
    try {
      const response = await api.get("/admin/species");
      return response.data;
    } catch (error) {
      console.error("Error fetching all species:", error);
      throw error;
    }
  },

  // Get detailed information for a specific species
  getSpeciesDetail: async (englishName) => {
    try {
      const response = await api.get(
        `/admin/species/${encodeURIComponent(englishName)}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching species detail for ${englishName}:`, error);
      throw error;
    }
  },

  // Get database statistics
  getStatistics: async () => {
    try {
      const response = await api.get("/admin/statistics");
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      throw error;
    }
  },
};

// Export the API instance for direct use if needed
export default api;

// Additional utility functions
export const getStatesAndDistricts = async () => {
  try {
    return await birdService.getLocations();
  } catch (error) {
    console.error("Error fetching states and districts:", error);
    throw error;
  }
};
