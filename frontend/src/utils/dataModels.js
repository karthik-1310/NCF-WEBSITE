// Species data model and utilities

export class Species {
  constructor(data = {}) {
    this.id = data.id || null;
    this.commonName = data.commonName || "";
    this.scientificName = data.scientificName || "";
    this.family = data.family || "";
    this.order = data.order || "";
    this.class = data.class || "Aves"; // Default to birds
    this.taxonomy = data.taxonomy || {};
    this.description = data.description || "";
    this.habitat = data.habitat || "";
    this.distribution = data.distribution || [];
    this.conservation = data.conservation || {
      status: "LC", // Least Concern
      trend: "stable",
      threats: [],
    };
    this.characteristics = data.characteristics || {
      size: "",
      weight: "",
      wingspan: "",
      colors: [],
      behaviors: [],
    };
    this.images = data.images || [];
    this.sounds = data.sounds || [];
    this.metadata = data.metadata || {
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      version: 1,
      source: "user",
      verified: false,
    };
  }

  // Validation methods
  isValid() {
    return this.commonName.trim() !== "" && this.scientificName.trim() !== "";
  }

  getValidationErrors() {
    const errors = [];
    if (!this.commonName.trim()) errors.push("Common name is required");
    if (!this.scientificName.trim()) errors.push("Scientific name is required");
    if (!this.family.trim()) errors.push("Family is recommended");
    return errors;
  }

  // Utility methods
  getDisplayName() {
    return this.commonName || this.scientificName;
  }

  getFullTaxonomy() {
    return {
      kingdom: this.taxonomy.kingdom || "Animalia",
      phylum: this.taxonomy.phylum || "Chordata",
      class: this.class,
      order: this.order,
      family: this.family,
      genus: this.getGenus(),
      species: this.getSpeciesEpithet(),
    };
  }

  getGenus() {
    return this.scientificName.split(" ")[0] || "";
  }

  getSpeciesEpithet() {
    const parts = this.scientificName.split(" ");
    return parts.length > 1 ? parts[1] : "";
  }

  getPrimaryImage() {
    return this.images.find((img) => img.isPrimary) || this.images[0] || null;
  }

  // Serialization
  toJSON() {
    return {
      id: this.id,
      commonName: this.commonName,
      scientificName: this.scientificName,
      family: this.family,
      order: this.order,
      class: this.class,
      taxonomy: this.taxonomy,
      description: this.description,
      habitat: this.habitat,
      distribution: this.distribution,
      conservation: this.conservation,
      characteristics: this.characteristics,
      images: this.images,
      sounds: this.sounds,
      metadata: this.metadata,
    };
  }

  static fromJSON(data) {
    return new Species(data);
  }
}

export class Guide {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || "";
    this.description = data.description || "";
    this.region = data.region || {
      country: "",
      state: "",
      district: "",
      coordinates: null,
    };
    this.taxa = data.taxa || [];
    this.species = data.species || [];
    this.layout = data.layout || {
      pages: [],
      template: "default",
      settings: {},
    };
    this.metadata = data.metadata || {
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      published: null,
      author: "",
      version: 1,
      status: "draft", // draft, published, archived
      visibility: "private", // private, public, unlisted
    };
    this.assets = data.assets || {
      logo: null,
      coverImage: null,
      customImages: [],
    };
    this.settings = data.settings || {
      showScientificNames: true,
      showCommonNames: true,
      language: "en",
      units: "metric",
      colorScheme: "default",
    };
  }

  // Validation
  isValid() {
    return this.title.trim() !== "" && this.species.length > 0;
  }

  // Utility methods
  getSpeciesCount() {
    return this.species.length;
  }

  getPageCount() {
    return this.layout.pages.length;
  }

  isPublished() {
    return this.metadata.status === "published";
  }

  canEdit() {
    return this.metadata.status === "draft";
  }

  // Species management
  addSpecies(species) {
    if (!this.species.find((s) => s.id === species.id)) {
      this.species.push(species);
      this.touch();
    }
  }

  removeSpecies(speciesId) {
    this.species = this.species.filter((s) => s.id !== speciesId);
    this.touch();
  }

  // Update timestamp
  touch() {
    this.metadata.modified = new Date().toISOString();
  }

  // Serialization
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      region: this.region,
      taxa: this.taxa,
      species: this.species.map((s) => (s.toJSON ? s.toJSON() : s)),
      layout: this.layout,
      metadata: this.metadata,
      assets: this.assets,
      settings: this.settings,
    };
  }

  static fromJSON(data) {
    const guide = new Guide(data);
    // Convert species data back to Species objects
    guide.species = guide.species.map((s) => Species.fromJSON(s));
    return guide;
  }
}

// Utility functions for data validation and transformation
export const validateSpeciesData = (data) => {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!data.commonName?.trim()) {
    errors.push("Common name is required");
  }
  if (!data.scientificName?.trim()) {
    errors.push("Scientific name is required");
  }

  // Format validation
  if (data.scientificName && !/^[A-Z][a-z]+ [a-z]+/.test(data.scientificName)) {
    warnings.push(
      "Scientific name should follow binomial nomenclature (Genus species)"
    );
  }

  // Consistency checks
  if (data.characteristics?.wingspan && data.characteristics?.size) {
    // Check if wingspan makes sense relative to body size
    const wingspan = parseFloat(data.characteristics.wingspan);
    const size = parseFloat(data.characteristics.size);
    if (wingspan < size) {
      warnings.push("Wingspan appears smaller than body size - please verify");
    }
  }

  return { errors, warnings, isValid: errors.length === 0 };
};

export const normalizeSpeciesData = (rawData) => {
  // Normalize and clean species data from various sources
  return {
    commonName: rawData.common_name || rawData.commonName || rawData.name || "",
    scientificName:
      rawData.scientific_name ||
      rawData.scientificName ||
      rawData.binomial ||
      "",
    family: rawData.family || rawData.Family || "",
    order: rawData.order || rawData.Order || "",
    description: rawData.description || rawData.notes || "",
    habitat: rawData.habitat || rawData.preferred_habitat || "",
    conservation: {
      status: rawData.conservation_status || rawData.iucn_status || "LC",
      trend: rawData.population_trend || "stable",
      threats: Array.isArray(rawData.threats) ? rawData.threats : [],
    },
    characteristics: {
      size: rawData.length || rawData.size || rawData.body_length || "",
      weight: rawData.weight || rawData.mass || "",
      wingspan: rawData.wingspan || rawData.wing_span || "",
      colors: Array.isArray(rawData.colors) ? rawData.colors : [],
      behaviors: Array.isArray(rawData.behaviors) ? rawData.behaviors : [],
    },
  };
};

// Search and filter utilities
export const createSpeciesFilter = (criteria) => {
  return (species) => {
    // Text search
    if (criteria.search) {
      const searchText = criteria.search.toLowerCase();
      const searchFields = [
        species.commonName,
        species.scientificName,
        species.family,
        species.description,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchFields.includes(searchText)) return false;
    }

    // Taxonomy filters
    if (criteria.family && species.family !== criteria.family) return false;
    if (criteria.order && species.order !== criteria.order) return false;

    // Conservation status
    if (
      criteria.conservationStatus &&
      species.conservation.status !== criteria.conservationStatus
    )
      return false;

    // Region filter
    if (criteria.region && !species.distribution.includes(criteria.region))
      return false;

    return true;
  };
};

export const createSpeciesSorter = (sortBy, direction = "asc") => {
  return (a, b) => {
    let aVal, bVal;

    switch (sortBy) {
      case "commonName":
        aVal = a.commonName.toLowerCase();
        bVal = b.commonName.toLowerCase();
        break;
      case "scientificName":
        aVal = a.scientificName.toLowerCase();
        bVal = b.scientificName.toLowerCase();
        break;
      case "family":
        aVal = a.family.toLowerCase();
        bVal = b.family.toLowerCase();
        break;
      case "created":
        aVal = new Date(a.metadata.created);
        bVal = new Date(b.metadata.created);
        break;
      default:
        aVal = a.commonName.toLowerCase();
        bVal = b.commonName.toLowerCase();
    }

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  };
};
