import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { GuideContextProvider } from "./contexts/GuideContext";
import TopNav from "./components/layout/TopNav";
import theme from "./theme";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TaxaStep from "./pages/creator/TaxaStep";
import RegionStep from "./pages/creator/RegionStep";
import SpeciesSelectionStep from "./pages/creator/SpeciesSelectionStep";
import NameStep from "./pages/creator/NameStep";
import LayoutStep from "./pages/creator/LayoutStep";
import PreviewStep from "./pages/creator/PreviewStep";
import UserGuides from "./pages/UserGuides";
import AdminDashboard from "./pages/admin/AdminDashboard";
import "./index.css";

// Placeholder components - will be built in subsequent phases
const AdminSpecies = () => (
  <div className="p-4">Admin Species - Placeholder</div>
);
const AdminImages = () => <div className="p-4">Admin Images - Placeholder</div>;
const AdminInfoDiamonds = () => (
  <div className="p-4">Admin Info Diamonds - Placeholder</div>
);
const AdminPDF = () => <div className="p-4">Admin PDF - Placeholder</div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GuideContextProvider>
        <Router>
          <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
            <TopNav />

            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/explore" element={<ExplorePage />} />

                {/* Creator Flow Routes */}
                <Route path="/create/step/taxa" element={<TaxaStep />} />
                <Route path="/create/step/region" element={<RegionStep />} />
                <Route
                  path="/create/step/species"
                  element={<SpeciesSelectionStep />}
                />
                <Route path="/create/step/name" element={<NameStep />} />
                <Route path="/create/step/layout" element={<LayoutStep />} />
                <Route path="/create/step/preview" element={<PreviewStep />} />

                {/* User Guides */}
                <Route path="/guides" element={<UserGuides />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/species" element={<AdminSpecies />} />
                <Route path="/admin/images" element={<AdminImages />} />
                <Route
                  path="/admin/info-diamonds"
                  element={<AdminInfoDiamonds />}
                />
                <Route path="/admin/pdf" element={<AdminPDF />} />
              </Routes>
            </main>
          </div>
        </Router>
      </GuideContextProvider>
    </ThemeProvider>
  );
}

export default App;
