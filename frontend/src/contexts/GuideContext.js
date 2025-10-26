import React, { createContext, useState, useEffect, useContext } from "react";

// Create context
const GuideContext = createContext();

// Guide context provider component
export const GuideContextProvider = ({ children }) => {
  // State for the creator flow
  const [creatorData, setCreatorData] = useState({
    currentStep: 1,
    totalSteps: 6,
    taxa: "", // Selected taxa category (single selection)
    region: {
      state: "",
      district: "",
      mapPin: null,
    },
    selectedSpecies: [], // Species selected for the guide
    guideName: "",
    description: "",
    author: "",
    logo: null,
    coverImage: null,
    layout: {
      pages: [],
    },
    isComplete: false,
  });

  // State for selected birds in the guide (legacy)
  const [selectedBirds, setSelectedBirds] = useState([]);

  // State for guide metadata (legacy)
  const [guideMetadata, setGuideMetadata] = useState({
    title: "My Bird Guide",
    location: "",
    description: "",
    creator: "",
    showScientificNames: true,
    showLocalNames: false,
    selectedLocalLanguage: "",
    dateCreated: new Date().toISOString(),
    availableLanguages: [],
  });

  // State for filter settings
  const [filters, setFilters] = useState({
    searchTerm: "",
    birdType: "all",
    state: "",
    district: "",
    frequencyRank: "",
    sortBy: "name",
  });

  // Load saved guide from localStorage when component mounts
  useEffect(() => {
    try {
      const savedGuide = localStorage.getItem("birdGuide");
      if (savedGuide) {
        const parsedGuide = JSON.parse(savedGuide);
        setSelectedBirds(parsedGuide.selectedBirds || []);
        setGuideMetadata(parsedGuide.metadata || guideMetadata);
      }

      const savedCreatorData = localStorage.getItem("creatorData");
      if (savedCreatorData) {
        const parsedCreatorData = JSON.parse(savedCreatorData);
        setCreatorData(parsedCreatorData);
      }
    } catch (error) {
      console.error("Error loading saved guide:", error);
    }
  }, []);

  // Save guide to localStorage whenever data changes
  useEffect(() => {
    try {
      const guideToSave = {
        selectedBirds,
        metadata: guideMetadata,
      };
      localStorage.setItem("birdGuide", JSON.stringify(guideToSave));
      localStorage.setItem("creatorData", JSON.stringify(creatorData));
    } catch (error) {
      console.error("Error saving guide:", error);
    }
  }, [selectedBirds, guideMetadata, creatorData]);

  // Creator flow functions
  const updateCreatorData = (updates) => {
    setCreatorData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const nextStep = () => {
    setCreatorData((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }));
  };

  const prevStep = () => {
    setCreatorData((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  };

  const resetCreatorFlow = () => {
    setCreatorData({
      currentStep: 1,
      totalSteps: 6,
      taxa: [],
      region: {
        state: "",
        district: "",
        mapPin: null,
      },
      selectedSpecies: [],
      guideName: "",
      description: "",
      author: "",
      logo: null,
      coverImage: null,
      layout: {
        pages: [],
      },
      isComplete: false,
    });
  };

  // Add a bird to the selected list
  const addBirdToGuide = (bird) => {
    if (!selectedBirds.some((b) => b.english_name === bird.english_name)) {
      setSelectedBirds((prev) => [...prev, bird]);
      return true;
    }
    return false;
  };

  // Remove a bird from the selected list
  const removeBirdFromGuide = (englishName) => {
    setSelectedBirds((prev) =>
      prev.filter((bird) => bird.english_name !== englishName)
    );
  };

  // Clear all selected birds
  const clearGuide = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all birds from your guide?"
      )
    ) {
      setSelectedBirds([]);
    }
  };

  // Update guide metadata
  const updateGuideMetadata = (updates) => {
    setGuideMetadata((prev) => ({ ...prev, ...updates }));
  };

  // Reorder birds in the guide
  const reorderBirds = (startIndex, endIndex) => {
    const result = Array.from(selectedBirds);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSelectedBirds(result);
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters to default values
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      birdType: "all",
      state: "",
      district: "",
      frequencyRank: "",
      sortBy: "name",
    });
  };

  // Export context value
  const contextValue = {
    // Creator flow
    creatorData,
    updateCreatorData,
    nextStep,
    prevStep,
    resetCreatorFlow,
    // Legacy guide functions
    selectedBirds,
    guideMetadata,
    filters,
    addBirdToGuide,
    removeBirdFromGuide,
    clearGuide,
    updateGuideMetadata,
    reorderBirds,
    updateFilters,
    resetFilters,
  };

  return (
    <GuideContext.Provider value={contextValue}>
      {children}
    </GuideContext.Provider>
  );
};

// Custom hook for using the guide context
export const useGuideContext = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error(
      "useGuideContext must be used within a GuideContextProvider"
    );
  }
  return context;
};

export default GuideContext;
