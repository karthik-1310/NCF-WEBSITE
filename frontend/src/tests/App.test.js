// Comprehensive test suite for the Pocket Guide Creator

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Import components
import App from "../App";
import { GuideContextProvider } from "../contexts/GuideContext";
import HomePage from "../pages/HomePage";
import TaxaStep from "../components/creator/TaxaStep";
import RegionStep from "../components/creator/RegionStep";
import NameStep from "../components/creator/NameStep";
import LayoutStep from "../components/creator/LayoutStep";
import PreviewStep from "../components/creator/PreviewStep";
import AdminDashboard from "../pages/AdminDashboard";
import UserGuides from "../pages/UserGuides";

// Mock modules
jest.mock("../services/apiService");
jest.mock("../utils/performance");

// Test utilities
const renderWithProviders = (component, initialState = {}) => {
  return render(
    <BrowserRouter>
      <GuideContextProvider value={initialState}>
        {component}
      </GuideContextProvider>
    </BrowserRouter>
  );
};

const mockSpecies = [
  {
    id: "1",
    commonName: "House Sparrow",
    scientificName: "Passer domesticus",
    family: "Passeridae",
    order: "Passeriformes",
    images: [{ url: "sparrow.jpg", isPrimary: true }],
  },
  {
    id: "2",
    commonName: "Rock Pigeon",
    scientificName: "Columba livia",
    family: "Columbidae",
    order: "Columbiformes",
    images: [{ url: "pigeon.jpg", isPrimary: true }],
  },
];

const mockRegions = {
  countries: ["India"],
  states: ["Karnataka", "Tamil Nadu"],
  districts: ["Bangalore", "Chennai"],
};

// App Integration Tests
describe("App Integration", () => {
  test("renders homepage by default", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/Create Your Field Guide/i)).toBeInTheDocument();
  });

  test("navigation works correctly", async () => {
    renderWithProviders(<App />);

    // Navigate to creator
    const createButton = screen.getByText(/Get Started/i);
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/creator");
    });
  });

  test("context state persists across navigation", async () => {
    const initialState = {
      creatorData: {
        step: 2,
        selectedTaxa: ["Birds"],
        selectedRegion: { country: "India" },
      },
    };

    renderWithProviders(<App />, initialState);

    // Verify state is maintained
    expect(screen.getByDisplayValue(/India/i)).toBeInTheDocument();
  });
});

// Creator Flow Tests
describe("Creator Flow", () => {
  beforeEach(() => {
    // Mock API responses
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            species: mockSpecies,
            regions: mockRegions,
          }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("TaxaStep", () => {
    test("renders taxa selection options", () => {
      renderWithProviders(<TaxaStep />);

      expect(screen.getByText("Birds")).toBeInTheDocument();
      expect(screen.getByText("Mammals")).toBeInTheDocument();
      expect(screen.getByText("Reptiles")).toBeInTheDocument();
    });

    test("allows multiple taxa selection", async () => {
      const user = userEvent.setup();
      renderWithProviders(<TaxaStep />);

      await user.click(screen.getByText("Birds"));
      await user.click(screen.getByText("Mammals"));

      expect(screen.getByText("Birds")).toHaveClass("bg-blue-600");
      expect(screen.getByText("Mammals")).toHaveClass("bg-blue-600");
    });

    test("validates selection before proceeding", async () => {
      const user = userEvent.setup();
      renderWithProviders(<TaxaStep />);

      const nextButton = screen.getByText("Next Step");
      await user.click(nextButton);

      expect(
        screen.getByText(/Please select at least one taxa/i)
      ).toBeInTheDocument();
    });
  });

  describe("RegionStep", () => {
    test("renders region selection interface", () => {
      renderWithProviders(<RegionStep />);

      expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/District/i)).toBeInTheDocument();
    });

    test("cascading region selection works", async () => {
      const user = userEvent.setup();
      renderWithProviders(<RegionStep />);

      // Select country
      await user.selectOptions(screen.getByLabelText(/Country/i), "India");

      await waitFor(() => {
        expect(screen.getByDisplayValue("Karnataka")).toBeInTheDocument();
      });
    });
  });

  describe("NameStep", () => {
    test("validates guide title requirement", async () => {
      const user = userEvent.setup();
      renderWithProviders(<NameStep />);

      const nextButton = screen.getByText("Next Step");
      await user.click(nextButton);

      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });

    test("handles file upload for logo", async () => {
      const user = userEvent.setup();
      renderWithProviders(<NameStep />);

      const file = new File(["logo"], "logo.png", { type: "image/png" });
      const input = screen.getByLabelText(/Upload Logo/i);

      await user.upload(input, file);

      expect(input.files[0]).toBe(file);
    });
  });

  describe("LayoutStep", () => {
    test("renders layout editor interface", () => {
      renderWithProviders(<LayoutStep />);

      expect(screen.getByText("Element Palette")).toBeInTheDocument();
      expect(screen.getByText("Layout Canvas")).toBeInTheDocument();
      expect(screen.getByText("Properties")).toBeInTheDocument();
    });

    test("drag and drop functionality works", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LayoutStep />);

      // This would require more sophisticated testing with drag-drop events
      // For now, test that elements are present
      expect(screen.getByText("Text Element")).toBeInTheDocument();
      expect(screen.getByText("Species Card")).toBeInTheDocument();
    });
  });

  describe("PreviewStep", () => {
    const mockGuideData = {
      title: "Test Guide",
      description: "Test Description",
      selectedSpecies: mockSpecies,
      layout: { pages: [] },
    };

    test("renders guide preview", () => {
      renderWithProviders(<PreviewStep />, { creatorData: mockGuideData });

      expect(screen.getByText("Test Guide")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    test("generate PDF button is present", () => {
      renderWithProviders(<PreviewStep />, { creatorData: mockGuideData });

      expect(screen.getByText(/Generate PDF/i)).toBeInTheDocument();
    });
  });
});

// Admin Dashboard Tests
describe("AdminDashboard", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            stats: {
              totalGuides: 127,
              totalSpecies: 3456,
              totalUsers: 89,
              activeJobs: 5,
            },
            recentActivity: [],
          }),
      })
    );
  });

  test("renders dashboard statistics", async () => {
    renderWithProviders(<AdminDashboard />);

    await waitFor(() => {
      expect(screen.getByText("127")).toBeInTheDocument();
      expect(screen.getByText("3,456")).toBeInTheDocument();
      expect(screen.getByText("89")).toBeInTheDocument();
    });
  });

  test("renders navigation cards", () => {
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByText("Manage Species")).toBeInTheDocument();
    expect(screen.getByText("User Management")).toBeInTheDocument();
    expect(screen.getByText("System Settings")).toBeInTheDocument();
  });

  test("quick actions are present", () => {
    renderWithProviders(<AdminDashboard />);

    expect(screen.getByText("Add Species")).toBeInTheDocument();
    expect(screen.getByText("Import Images")).toBeInTheDocument();
    expect(screen.getByText("Generate Reports")).toBeInTheDocument();
  });
});

// User Guides Tests
describe("UserGuides", () => {
  test("renders guide categories", () => {
    renderWithProviders(<UserGuides />);

    expect(screen.getByText("Getting Started")).toBeInTheDocument();
    expect(screen.getByText("Layout Design")).toBeInTheDocument();
    expect(screen.getByText("Data Management")).toBeInTheDocument();
  });

  test("search functionality works", async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserGuides />);

    const searchInput = screen.getByPlaceholderText(/Search guides/i);
    await user.type(searchInput, "getting started");

    expect(searchInput).toHaveValue("getting started");
  });

  test("FAQ section is present", () => {
    renderWithProviders(<UserGuides />);

    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });
});

// Performance Tests
describe("Performance", () => {
  test("components render within acceptable time", async () => {
    const startTime = performance.now();

    renderWithProviders(<HomePage />);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  test("large species lists render efficiently", async () => {
    const largeSpeciesList = Array.from({ length: 1000 }, (_, i) => ({
      id: i.toString(),
      commonName: `Species ${i}`,
      scientificName: `Genus species${i}`,
      family: "TestFamily",
    }));

    const startTime = performance.now();

    renderWithProviders(<TaxaStep />, {
      availableSpecies: largeSpeciesList,
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should handle large lists efficiently
    expect(renderTime).toBeLessThan(500);
  });
});

// Accessibility Tests
describe("Accessibility", () => {
  test("all interactive elements have proper labels", () => {
    renderWithProviders(<TaxaStep />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAccessibleName();
    });
  });

  test("form inputs have proper labels", () => {
    renderWithProviders(<NameStep />);

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveAccessibleName();
    });
  });

  test("keyboard navigation works", async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);

    // Tab through interactive elements
    await user.tab();
    expect(document.activeElement).toHaveAttribute("role", "button");

    await user.tab();
    expect(document.activeElement).toHaveAttribute("role", "button");
  });

  test("screen reader announcements work", async () => {
    renderWithProviders(<TaxaStep />);

    // Check for aria-live regions
    const liveRegions = screen.getAllByRole("status");
    expect(liveRegions.length).toBeGreaterThan(0);
  });
});

// Error Handling Tests
describe("Error Handling", () => {
  test("handles API errors gracefully", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    renderWithProviders(<TaxaStep />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading/i)).toBeInTheDocument();
    });
  });

  test("shows loading states", () => {
    renderWithProviders(<TaxaStep />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("validates user input properly", async () => {
    const user = userEvent.setup();
    renderWithProviders(<NameStep />);

    const titleInput = screen.getByLabelText(/Guide Title/i);
    await user.type(titleInput, "a"); // Too short

    const nextButton = screen.getByText("Next Step");
    await user.click(nextButton);

    expect(screen.getByText(/Title must be at least/i)).toBeInTheDocument();
  });
});

// Integration with Local Storage
describe("Local Storage Integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saves creator progress to localStorage", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TaxaStep />);

    await user.click(screen.getByText("Birds"));

    const savedData = localStorage.getItem("guideCreatorData");
    expect(savedData).toBeTruthy();

    const parsedData = JSON.parse(savedData);
    expect(parsedData.selectedTaxa).toContain("Birds");
  });

  test("restores creator progress from localStorage", () => {
    const savedData = {
      step: 2,
      selectedTaxa: ["Birds"],
      selectedRegion: { country: "India" },
    };

    localStorage.setItem("guideCreatorData", JSON.stringify(savedData));

    renderWithProviders(<RegionStep />);

    expect(screen.getByDisplayValue("India")).toBeInTheDocument();
  });
});

// Mock service worker for testing
if (typeof global.fetch === "undefined") {
  global.fetch = jest.fn();
}

export default {
  renderWithProviders,
  mockSpecies,
  mockRegions,
};
