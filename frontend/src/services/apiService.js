// API service for data integration with backend

class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

class APIService {
  constructor(baseURL = "/api") {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };

    // Request interceptor for adding auth tokens
    this.requestInterceptors = [];
    this.responseInterceptors = [];

    // Setup default response interceptor for error handling
    this.addResponseInterceptor(
      (response) => response,
      (error) => this.handleError(error)
    );
  }

  // Interceptor management
  addRequestInterceptor(onFulfilled, onRejected) {
    this.requestInterceptors.push({ onFulfilled, onRejected });
  }

  addResponseInterceptor(onFulfilled, onRejected) {
    this.responseInterceptors.push({ onFulfilled, onRejected });
  }

  // Core request method
  async request(url, options = {}) {
    const fullUrl = url.startsWith("http") ? url : `${this.baseURL}${url}`;

    // Prepare request config
    let config = {
      method: "GET",
      headers: { ...this.defaultHeaders },
      ...options,
    };

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      try {
        config = await interceptor.onFulfilled(config);
      } catch (error) {
        if (interceptor.onRejected) {
          config = await interceptor.onRejected(error);
        } else {
          throw error;
        }
      }
    }

    try {
      const response = await fetch(fullUrl, config);

      // Apply response interceptors
      let result = response;
      for (const interceptor of this.responseInterceptors) {
        try {
          result = await interceptor.onFulfilled(result);
        } catch (error) {
          if (interceptor.onRejected) {
            result = await interceptor.onRejected(error);
          } else {
            throw error;
          }
        }
      }

      return result;
    } catch (error) {
      throw new APIError(`Network error: ${error.message}`, 0, error);
    }
  }

  // HTTP method helpers
  async get(url, params = {}) {
    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await this.request(fullUrl);
    return response.json();
  }

  async post(url, data = null) {
    const response = await this.request(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : null,
    });
    return response.json();
  }

  async put(url, data = null) {
    const response = await this.request(url, {
      method: "PUT",
      body: data ? JSON.stringify(data) : null,
    });
    return response.json();
  }

  async delete(url) {
    const response = await this.request(url, {
      method: "DELETE",
    });
    return response.json();
  }

  async upload(url, formData) {
    const response = await this.request(url, {
      method: "POST",
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
    return response.json();
  }

  // Error handling
  async handleError(response) {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: response.statusText };
      }

      throw new APIError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }
    return response;
  }

  // Authentication helpers
  setAuthToken(token) {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  clearAuthToken() {
    delete this.defaultHeaders["Authorization"];
  }
}

// Create singleton instance
const apiService = new APIService();

// Species API endpoints
export const speciesAPI = {
  // Get all species with filtering and pagination
  getAll: (params = {}) => apiService.get("/species", params),

  // Get species by ID
  getById: (id) => apiService.get(`/species/${id}`),

  // Search species
  search: (query, filters = {}) =>
    apiService.get("/species/search", {
      q: query,
      ...filters,
    }),

  // Get species by region
  getByRegion: (country, state = null, district = null) =>
    apiService.get("/species/region", { country, state, district }),

  // Get species by taxonomy
  getByTaxonomy: (family = null, order = null) =>
    apiService.get("/species/taxonomy", { family, order }),

  // Create new species
  create: (speciesData) => apiService.post("/species", speciesData),

  // Update existing species
  update: (id, speciesData) => apiService.put(`/species/${id}`, speciesData),

  // Delete species
  delete: (id) => apiService.delete(`/species/${id}`),

  // Bulk operations
  bulkCreate: (speciesArray) =>
    apiService.post("/species/bulk", { species: speciesArray }),
  bulkUpdate: (updates) => apiService.put("/species/bulk", { updates }),

  // Image management
  uploadImage: (speciesId, imageFile, metadata = {}) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("metadata", JSON.stringify(metadata));
    return apiService.upload(`/species/${speciesId}/images`, formData);
  },

  deleteImage: (speciesId, imageId) =>
    apiService.delete(`/species/${speciesId}/images/${imageId}`),

  // Validation
  validate: (speciesData) => apiService.post("/species/validate", speciesData),
};

// Guides API endpoints
export const guidesAPI = {
  // Get all guides for current user
  getAll: (params = {}) => apiService.get("/guides", params),

  // Get guide by ID
  getById: (id) => apiService.get(`/guides/${id}`),

  // Create new guide
  create: (guideData) => apiService.post("/guides", guideData),

  // Update existing guide
  update: (id, guideData) => apiService.put(`/guides/${id}`, guideData),

  // Delete guide
  delete: (id) => apiService.delete(`/guides/${id}`),

  // Publishing
  publish: (id) => apiService.post(`/guides/${id}/publish`),
  unpublish: (id) => apiService.post(`/guides/${id}/unpublish`),

  // Duplication
  duplicate: (id, newTitle = null) =>
    apiService.post(`/guides/${id}/duplicate`, { title: newTitle }),

  // Export/Import
  export: (id, format = "json") =>
    apiService.get(`/guides/${id}/export`, { format }),

  import: (guideData) => apiService.post("/guides/import", guideData),

  // PDF Generation
  generatePDF: (id, options = {}) =>
    apiService.post(`/guides/${id}/pdf`, options),

  // Collaboration
  share: (id, email, permissions = "view") =>
    apiService.post(`/guides/${id}/share`, { email, permissions }),

  getCollaborators: (id) => apiService.get(`/guides/${id}/collaborators`),

  // Templates
  getTemplates: () => apiService.get("/guides/templates"),
  createFromTemplate: (templateId, guideData) =>
    apiService.post(`/guides/templates/${templateId}`, guideData),
};

// Regions API endpoints
export const regionsAPI = {
  // Get all countries
  getCountries: () => apiService.get("/regions/countries"),

  // Get states for a country
  getStates: (country) =>
    apiService.get(`/regions/countries/${country}/states`),

  // Get districts for a state
  getDistricts: (country, state) =>
    apiService.get(`/regions/countries/${country}/states/${state}/districts`),

  // Get region hierarchy
  getHierarchy: () => apiService.get("/regions/hierarchy"),

  // Search regions
  search: (query) => apiService.get("/regions/search", { q: query }),
};

// Taxonomy API endpoints
export const taxonomyAPI = {
  // Get taxonomy hierarchy
  getHierarchy: () => apiService.get("/taxonomy/hierarchy"),

  // Get families
  getFamilies: (order = null) =>
    apiService.get("/taxonomy/families", { order }),

  // Get orders
  getOrders: (class_ = "Aves") =>
    apiService.get("/taxonomy/orders", { class: class_ }),

  // Search taxonomy
  search: (query, level = null) =>
    apiService.get("/taxonomy/search", { q: query, level }),

  // Validate taxonomic name
  validate: (name, level) =>
    apiService.post("/taxonomy/validate", { name, level }),
};

// Admin API endpoints
export const adminAPI = {
  // Dashboard statistics
  getStats: () => apiService.get("/admin/stats"),

  // User management
  getUsers: (params = {}) => apiService.get("/admin/users", params),
  getUserById: (id) => apiService.get(`/admin/users/${id}`),
  updateUser: (id, userData) => apiService.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => apiService.delete(`/admin/users/${id}`),

  // Content management
  getAllGuides: (params = {}) => apiService.get("/admin/guides", params),
  getAllSpecies: (params = {}) => apiService.get("/admin/species", params),

  // Data import/export
  importSpecies: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiService.upload("/admin/species/import", formData);
  },

  exportSpecies: (format = "csv", filters = {}) =>
    apiService.get("/admin/species/export", { format, ...filters }),

  // System health
  getSystemHealth: () => apiService.get("/admin/health"),
  getLogs: (params = {}) => apiService.get("/admin/logs", params),

  // Bulk operations
  bulkDeleteGuides: (guideIds) =>
    apiService.delete("/admin/guides/bulk", { ids: guideIds }),

  bulkDeleteSpecies: (speciesIds) =>
    apiService.delete("/admin/species/bulk", { ids: speciesIds }),
};

// File upload helpers
export const uploadAPI = {
  // Upload guide assets
  uploadGuideAsset: (guideId, file, type = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    return apiService.upload(`/guides/${guideId}/assets`, formData);
  },

  // Upload species images
  uploadSpeciesImage: (speciesId, file, metadata = {}) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("metadata", JSON.stringify(metadata));
    return apiService.upload(`/species/${speciesId}/images`, formData);
  },

  // Upload CSV data
  uploadCSV: (file, type = "species") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    return apiService.upload("/upload/csv", formData);
  },
};

// Cache management for offline support
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes default TTL
  }

  set(key, data, ttl = this.ttl) {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    const item = this.cache.get(key);
    if (!item) return false;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

export const cacheManager = new CacheManager();

// Enhanced API calls with caching
export const cachedAPI = {
  getSpecies: async (id, useCache = true) => {
    const cacheKey = `species_${id}`;

    if (useCache && cacheManager.has(cacheKey)) {
      return cacheManager.get(cacheKey);
    }

    const data = await speciesAPI.getById(id);
    cacheManager.set(cacheKey, data);
    return data;
  },

  getRegionHierarchy: async (useCache = true) => {
    const cacheKey = "region_hierarchy";

    if (useCache && cacheManager.has(cacheKey)) {
      return cacheManager.get(cacheKey);
    }

    const data = await regionsAPI.getHierarchy();
    cacheManager.set(cacheKey, data, 30 * 60 * 1000); // 30 minutes
    return data;
  },

  getTaxonomyHierarchy: async (useCache = true) => {
    const cacheKey = "taxonomy_hierarchy";

    if (useCache && cacheManager.has(cacheKey)) {
      return cacheManager.get(cacheKey);
    }

    const data = await taxonomyAPI.getHierarchy();
    cacheManager.set(cacheKey, data, 60 * 60 * 1000); // 1 hour
    return data;
  },
};

// Error handling utilities
export const handleAPIError = (error, showNotification = true) => {
  console.error("API Error:", error);

  if (showNotification) {
    // This would integrate with your notification system
    const message =
      error.status === 0
        ? "Network error - please check your connection"
        : error.message || "An unexpected error occurred";

    // You would call your notification system here
    // notificationService.error(message);
  }

  return {
    error: true,
    message: error.message,
    status: error.status,
    data: error.data,
  };
};

// Setup auth token from localStorage on service initialization
const token = localStorage.getItem("auth_token");
if (token) {
  apiService.setAuthToken(token);
}

// Export the main service instance
export default apiService;
export { APIError, apiService };
