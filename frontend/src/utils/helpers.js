// Function to convert Google Drive link to direct download link
export const convertDriveLink = (driveUrl) => {
  if (!driveUrl) return "";

  try {
    // Handle already processed URLs
    if (driveUrl.includes("export=view")) {
      return driveUrl;
    }

    // Extract file ID from various Google Drive URL formats
    let fileId = "";

    if (driveUrl.includes("drive.google.com/file/d/")) {
      // Format: https://drive.google.com/file/d/FILEID/view
      const parts = driveUrl.split("/");
      const fileIdIndex = parts.indexOf("d") + 1;

      if (fileIdIndex < parts.length) {
        fileId = parts[fileIdIndex];
      }
    } else if (driveUrl.includes("drive.google.com/open?id=")) {
      // Format: https://drive.google.com/open?id=FILEID
      const url = new URL(driveUrl);
      fileId = url.searchParams.get("id");
    } else if (driveUrl.includes("drive.google.com/uc?id=")) {
      // Format: https://drive.google.com/uc?id=FILEID
      const url = new URL(driveUrl);
      fileId = url.searchParams.get("id");
    } else if (driveUrl.includes("drive.google.com/drive/folders/")) {
      // This is a folder, not a direct file
      return driveUrl;
    }

    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    return driveUrl;
  } catch (error) {
    console.error("Error converting Drive link:", error);
    return driveUrl;
  }
};

// Sort birds by different criteria
export const sortBirds = (birds, sortBy = "name") => {
  if (!birds || !Array.isArray(birds)) return [];

  const sortedBirds = [...birds];

  switch (sortBy) {
    case "name":
      return sortedBirds.sort((a, b) =>
        a.english_name.localeCompare(b.english_name)
      );
    case "scientific":
      return sortedBirds.sort((a, b) =>
        a.scientific_name.localeCompare(b.scientific_name)
      );
    case "size":
      return sortedBirds.sort((a, b) => {
        // Convert size from string to number, assuming format like "15cm"
        const sizeA = parseInt(a.size?.replace(/[^\d]/g, "") || "0");
        const sizeB = parseInt(b.size?.replace(/[^\d]/g, "") || "0");
        return sizeA - sizeB;
      });
    case "frequency":
      return sortedBirds.sort((a, b) => {
        const freqA = a.frequency_rank ? parseInt(a.frequency_rank) : 999;
        const freqB = b.frequency_rank ? parseInt(b.frequency_rank) : 999;
        return freqA - freqB;
      });
    default:
      return sortedBirds;
  }
};

// Filter birds based on search term and filter settings
export const filterBirds = (birds, filters) => {
  if (!birds || !Array.isArray(birds)) return [];

  return birds.filter((bird) => {
    // Text search filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const matchesSearch =
        bird.english_name.toLowerCase().includes(searchTerm) ||
        bird.scientific_name.toLowerCase().includes(searchTerm) ||
        (bird.names &&
          bird.names.some((name) =>
            name.name.toLowerCase().includes(searchTerm)
          ));

      if (!matchesSearch) return false;
    }

    // Bird type filter
    if (filters.birdType && filters.birdType !== "all") {
      if (bird.type !== filters.birdType) return false;
    }

    // Location filters
    if (filters.state && bird.state !== filters.state) return false;
    if (filters.district && bird.district !== filters.district) return false;

    // Frequency rank filter
    if (filters.frequencyRank && bird.frequency_rank !== filters.frequencyRank)
      return false;

    return true;
  });
};

// Generate PDF configuration for guide pages
export const generatePageLayout = (birds, options) => {
  // This is a placeholder for the PDF generation logic
  // The actual implementation would create page layouts based on the selected birds
  return {
    title: options.title || "Bird Guide",
    pages: [],
    metadata: options,
  };
};

// Format date string to a readable format
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get a unique list of available languages from birds
export const getAvailableLanguages = (birds) => {
  if (!birds || !Array.isArray(birds)) return [];

  const languages = new Set();

  birds.forEach((bird) => {
    if (bird.names && Array.isArray(bird.names)) {
      bird.names.forEach((name) => {
        if (name.language) {
          languages.add(name.language);
        }
      });
    }
  });

  return Array.from(languages).sort();
};

// Find a bird's name in the specified language
export const getBirdNameInLanguage = (bird, language) => {
  if (!bird || !bird.names || !Array.isArray(bird.names)) return null;

  const name = bird.names.find((name) => name.language === language);
  return name ? name.name : null;
};
