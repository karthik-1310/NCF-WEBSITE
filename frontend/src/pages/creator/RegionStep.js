import React, { useState, useEffect } from "react";
import { useGuideContext } from "../../contexts/GuideContext";
import CreatorShell from "../../components/CreatorShell";
import { Container, Card, Input, Button } from "../../components/ui";

const RegionStep = () => {
  const { creatorData, updateCreatorData } = useGuideContext();
  const [selectedState, setSelectedState] = useState(
    creatorData.region.state || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    creatorData.region.district || ""
  );
  const [mapPin, setMapPin] = useState(creatorData.region.mapPin || null);
  const [stateSearch, setStateSearch] = useState("");
  const [districtSearch, setDistrictSearch] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  // Mock data - in real app this would come from API
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const districtsByState = {
    Mizoram: [
      "Aizawl",
      "Lunglei",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kollam",
      "Pathanamthitta",
      "Alappuzha",
      "Kottayam",
      "Idukki",
      "Ernakulam",
      "Thrissur",
    ],
    Karnataka: [
      "Bengaluru Urban",
      "Bengaluru Rural",
      "Ramanagara",
      "Kolar",
      "Chikkaballapur",
      "Tumakuru",
      "Chitradurga",
      "Davanagere",
    ],
    // Add more as needed
  };

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredDistricts =
    selectedState && districtsByState[selectedState]
      ? districtsByState[selectedState].filter((district) =>
          district.toLowerCase().includes(districtSearch.toLowerCase())
        )
      : [];

  useEffect(() => {
    updateCreatorData({
      region: {
        state: selectedState,
        district: selectedDistrict,
        mapPin: mapPin,
      },
    });
  }, [selectedState, selectedDistrict, mapPin, updateCreatorData]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowStateDropdown(false);
        setShowDistrictDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedDistrict(""); // Reset district when state changes
    setStateSearch(state);
    setShowStateDropdown(false);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setDistrictSearch(district);
    setShowDistrictDropdown(false);
  };

  const handleMapClick = (event) => {
    // Mock map click - in real app this would use actual map coordinates
    const mockCoordinates = {
      lat: 23.7271 + (Math.random() - 0.5) * 2,
      lng: 92.7176 + (Math.random() - 0.5) * 2,
    };
    setMapPin(mockCoordinates);
  };

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapPin({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to mock location
          setMapPin({
            lat: 23.7271,
            lng: 92.7176,
          });
        }
      );
    }
  };

  return (
    <CreatorShell>
      <Container className="py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-text mb-4">
              Select Your Region
            </h1>
            <p className="text-lg text-text-dim max-w-2xl mx-auto">
              Choose your location to get accurate species information for your
              local ecosystem. You can select by state and district, or click on
              the map to set a precise location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Controls */}
            <div className="space-y-6">
              {/* State Selection */}
              <div className="relative dropdown-container">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-[var(--text)] mb-2"
                >
                  Select State
                </label>
                <div className="relative">
                  <Input
                    id="state"
                    value={stateSearch}
                    onChange={(e) => {
                      setStateSearch(e.target.value);
                      setShowStateDropdown(true);
                      setShowDistrictDropdown(false); // Close district dropdown
                    }}
                    onFocus={() => {
                      setShowStateDropdown(true);
                      setShowDistrictDropdown(false); // Close district dropdown
                    }}
                    placeholder="Search for a state..."
                    className="w-full"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[var(--text-dim)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                </div>

                {/* State Dropdown */}
                {showStateDropdown && (
                  <div className="absolute z-[60] w-full mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg max-h-60 overflow-auto">
                    {filteredStates.map((state) => (
                      <button
                        key={state}
                        onClick={() => handleStateSelect(state)}
                        className="w-full text-left px-4 py-3 hover:bg-[var(--surface-elev)] focus:bg-[var(--surface-elev)] text-[var(--text)] text-sm first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        {state}
                      </button>
                    ))}
                    {filteredStates.length === 0 && (
                      <div className="px-4 py-3 text-[var(--text-dim)] text-sm">
                        No states found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* District Selection */}
              <div className="relative dropdown-container">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-[var(--text)] mb-2"
                >
                  Select District
                </label>
                <div className="relative">
                  <Input
                    id="district"
                    value={districtSearch}
                    onChange={(e) => {
                      setDistrictSearch(e.target.value);
                      setShowDistrictDropdown(true);
                      setShowStateDropdown(false); // Close state dropdown
                    }}
                    onFocus={() => {
                      setShowDistrictDropdown(true);
                      setShowStateDropdown(false); // Close state dropdown
                    }}
                    placeholder={
                      selectedState
                        ? "Search for a district..."
                        : "Select a state first"
                    }
                    disabled={!selectedState}
                    className="w-full"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-[var(--text-dim)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                </div>

                {/* District Dropdown */}
                {showDistrictDropdown && selectedState && (
                  <div className="absolute z-[55] w-full mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg max-h-60 overflow-auto">
                    {filteredDistricts.map((district) => (
                      <button
                        key={district}
                        onClick={() => handleDistrictSelect(district)}
                        className="w-full text-left px-4 py-3 hover:bg-[var(--surface-elev)] focus:bg-[var(--surface-elev)] text-[var(--text)] text-sm first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        {district}
                      </button>
                    ))}
                    {filteredDistricts.length === 0 && (
                      <div className="px-4 py-3 text-[var(--text-dim)] text-sm">
                        No districts found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selection Status */}
              {(selectedState || selectedDistrict || mapPin) && (
                <Card className="p-4 bg-[var(--surface-elev)]">
                  <h4 className="text-sm font-medium text-[var(--text)] mb-2">
                    Selected Location
                  </h4>
                  <div className="space-y-1 text-sm text-[var(--text-dim)]">
                    {selectedState && <div>State: {selectedState}</div>}
                    {selectedDistrict && (
                      <div>District: {selectedDistrict}</div>
                    )}
                    {mapPin && (
                      <div>
                        Coordinates: {mapPin.lat.toFixed(4)},{" "}
                        {mapPin.lng.toFixed(4)}
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Map */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Interactive Map
              </label>

              <Card className="relative overflow-hidden">
                {/* Mock Map Container */}
                <div
                  className="w-full h-80 lg:h-96 bg-gradient-to-br from-surface to-surface-elev cursor-pointer relative"
                  onClick={handleMapClick}
                  role="img"
                  aria-label="Interactive map for selecting location"
                >
                  {/* Mock Map Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 h-full">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-border"></div>
                      ))}
                    </div>
                  </div>

                  {/* Mock Geography Elements */}
                  <div className="absolute top-12 left-16 w-24 h-16 bg-primary/20 rounded-full opacity-60"></div>
                  <div className="absolute bottom-20 right-12 w-32 h-12 bg-primary/15 rounded-lg opacity-40"></div>
                  <div className="absolute top-1/2 left-1/3 w-8 h-20 bg-border rounded-sm opacity-30"></div>

                  {/* Map Pin */}
                  {mapPin && (
                    <div
                      className="absolute transform -translate-x-1/2 -translate-y-full"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                    >
                      <div className="w-6 h-6 bg-primary rounded-full border-2 border-bg shadow-med">
                        <div className="w-2 h-2 bg-bg rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  )}

                  {/* Click Instructions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-text-muted">
                      <svg
                        className="w-8 h-8 mx-auto mb-2 opacity-60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <p className="text-sm">Click to set location</p>
                    </div>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGeolocate}
                    className="bg-surface/90 backdrop-blur-sm hover:bg-surface"
                    aria-label="Use current location"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </Button>
                </div>
              </Card>

              <p className="text-xs text-text-muted mt-2">
                Click anywhere on the map to set a precise location, or use the
                form above to select by administrative boundaries.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Click outside handlers */}
      {(showStateDropdown || showDistrictDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowStateDropdown(false);
            setShowDistrictDropdown(false);
          }}
        />
      )}
    </CreatorShell>
  );
};

export default RegionStep;
