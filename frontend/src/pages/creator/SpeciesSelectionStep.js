import React, { useState, useEffect } from "react";
import { useGuideContext } from "../../contexts/GuideContext";
import CreatorShell from "../../components/CreatorShell";
import { birdService } from "../../services/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const SpeciesSelectionStep = () => {
  const { creatorData, updateCreatorData } = useGuideContext();
  const [availableSpecies, setAvailableSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(
    creatorData.selectedSpecies || []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpecies, setFilteredSpecies] = useState([]);

  // Fetch species data based on selected region and taxa
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Only fetch if we have region data
        if (!creatorData.region.state || !creatorData.region.district) {
          // For testing, provide some mock data when no region is selected
          const mockSpecies = [
            {
              english_name: "Asian Paradise Flycatcher",
              scientific_name: "Terpsiphone paradisi",
              type: "bird",
              frequency_rank: 15,
              image_url:
                "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop",
            },
            {
              english_name: "White-throated Kingfisher",
              scientific_name: "Halcyon smyrnensis",
              type: "bird",
              frequency_rank: 8,
              image_url:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
            {
              english_name: "Red-vented Bulbul",
              scientific_name: "Pycnonotus cafer",
              type: "bird",
              frequency_rank: 3,
              image_url:
                "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop",
            },
            {
              english_name: "House Sparrow",
              scientific_name: "Passer domesticus",
              type: "bird",
              frequency_rank: 1,
              image_url:
                "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=400&h=300&fit=crop",
            },
            {
              english_name: "Indian Robin",
              scientific_name: "Copsychus fulicatus",
              type: "bird",
              frequency_rank: 12,
              image_url:
                "https://images.unsplash.com/photo-1565002330297-58754c040ddc?w=400&h=300&fit=crop",
            },
          ];
          setAvailableSpecies(mockSpecies);
          setLoading(false);
          return;
        }

        const filters = {
          state: creatorData.region.state,
          district: creatorData.region.district,
        };

        const data = await birdService.getBirdsGrouped(filters);

        // Flatten the grouped data and filter by selected taxa
        let allSpecies = [];
        Object.values(data).forEach((group) => {
          if (group.birds) {
            allSpecies = allSpecies.concat(group.birds);
          }
        });

        // Filter by selected taxa if any are selected
        if (creatorData.taxa && creatorData.taxa.length > 0) {
          // For now, we'll show all birds since the API doesn't distinguish taxa
          // In a real implementation, you'd filter by taxa types
          setAvailableSpecies(allSpecies);
        } else {
          setAvailableSpecies(allSpecies);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching species:", err);

        // Provide fallback mock data when API fails
        const fallbackSpecies = [
          {
            english_name: "Common Myna",
            scientific_name: "Acridotheres tristis",
            type: "bird",
            frequency_rank: 5,
            image_url:
              "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop",
          },
          {
            english_name: "Rose-ringed Parakeet",
            scientific_name: "Psittacula krameri",
            type: "bird",
            frequency_rank: 10,
            image_url:
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
          },
          {
            english_name: "Black Drongo",
            scientific_name: "Dicrurus macrocercus",
            type: "bird",
            frequency_rank: 7,
            image_url:
              "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop",
          },
        ];

        setAvailableSpecies(fallbackSpecies);
        setError(
          "Using sample data - backend connection failed. Please ensure the backend server is running with data."
        );
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [creatorData.region, creatorData.taxa]);

  // Filter species based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSpecies(availableSpecies);
    } else {
      const filtered = availableSpecies.filter(
        (species) =>
          species.english_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (species.scientific_name &&
            species.scientific_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      setFilteredSpecies(filtered);
    }
  }, [searchTerm, availableSpecies]);

  // Update context whenever selectedSpecies changes
  useEffect(() => {
    updateCreatorData({ selectedSpecies });
  }, [selectedSpecies, updateCreatorData]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    if (
      source.droppableId === "available" &&
      destination.droppableId === "selected"
    ) {
      // Dragging from available to selected
      const speciesIndex = parseInt(source.index);
      const species = filteredSpecies[speciesIndex];

      // Check if species is already selected
      if (
        !selectedSpecies.find((s) => s.english_name === species.english_name)
      ) {
        const newSelected = [...selectedSpecies];
        newSelected.splice(destination.index, 0, species);
        setSelectedSpecies(newSelected);
      }
    } else if (
      source.droppableId === "selected" &&
      destination.droppableId === "selected"
    ) {
      // Reordering within selected list
      const newSelected = Array.from(selectedSpecies);
      const [reorderedItem] = newSelected.splice(source.index, 1);
      newSelected.splice(destination.index, 0, reorderedItem);
      setSelectedSpecies(newSelected);
    } else if (
      source.droppableId === "selected" &&
      destination.droppableId === "available"
    ) {
      // Dragging from selected back to available (remove from selection)
      const newSelected = [...selectedSpecies];
      newSelected.splice(source.index, 1);
      setSelectedSpecies(newSelected);
    }
  };

  const addSpecies = (species) => {
    if (!selectedSpecies.find((s) => s.english_name === species.english_name)) {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  const removeSpecies = (speciesName) => {
    setSelectedSpecies(
      selectedSpecies.filter((s) => s.english_name !== speciesName)
    );
  };

  const clearAllSelected = () => {
    if (
      window.confirm("Are you sure you want to remove all selected species?")
    ) {
      setSelectedSpecies([]);
    }
  };

  const initializeDatabase = async () => {
    try {
      const response = await fetch("/api/admin/initialize-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(
          `Database initialized! Added ${data.species_count} species and ${data.frequency_records} frequency records.`
        );
        // Refresh the species data
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to initialize database: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error initializing database:", error);
      alert("Error initializing database. Check console for details.");
    }
  };

  if (loading) {
    return (
      <CreatorShell>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
            <p className="text-[var(--text-dim)]">Loading species data...</p>
          </div>
        </div>
      </CreatorShell>
    );
  }

  if (error) {
    return (
      <CreatorShell>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
              Error Loading Species
            </h3>
            <p className="text-[var(--text-dim)]">{error}</p>
          </div>
        </div>
      </CreatorShell>
    );
  }

  return (
    <CreatorShell>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
            Select Species for Your Guide
          </h1>
          <p className="text-[var(--text-dim)] text-lg max-w-3xl mx-auto">
            Drag and drop species from the available list to your guide. You can
            reorder them as needed. Only species from{" "}
            <strong>
              {creatorData.region.state}, {creatorData.region.district}
            </strong>{" "}
            are shown.
          </p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Species List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--text)]">
                  Available Species ({filteredSpecies.length})
                </h2>
                <div className="text-sm text-[var(--text-dim)]">
                  {creatorData.region.state}, {creatorData.region.district}
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search species by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
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

              {/* Available Species Droppable */}
              <Droppable droppableId="available">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      min-h-[400px] max-h-[600px] overflow-y-auto bg-[var(--surface)] rounded-xl border-2 border-dashed p-4 space-y-3
                      ${
                        snapshot.isDraggingOver
                          ? "border-[var(--primary)] bg-[var(--primary)]/5"
                          : "border-[var(--border)]"
                      }
                    `}
                  >
                    {filteredSpecies.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-4">🔍</div>
                        <p className="text-[var(--text-dim)]">
                          {searchTerm
                            ? "No species found matching your search"
                            : "No species available for this region"}
                        </p>
                      </div>
                    ) : (
                      filteredSpecies.map((species, index) => (
                        <Draggable
                          key={species.english_name}
                          draggableId={`available-${species.english_name}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`
                                flex items-center gap-4 p-4 bg-[var(--surface-elev)] rounded-lg border border-[var(--border)] cursor-grab active:cursor-grabbing transition-all hover:shadow-md
                                ${
                                  snapshot.isDragging
                                    ? "shadow-xl rotate-2 scale-105"
                                    : ""
                                }
                                ${
                                  selectedSpecies.find(
                                    (s) =>
                                      s.english_name === species.english_name
                                  )
                                    ? "opacity-50"
                                    : ""
                                }
                              `}
                            >
                              {/* Species Image */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--surface)] flex-shrink-0">
                                {species.image_url ? (
                                  <img
                                    src={species.image_url}
                                    alt={species.english_name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.nextSibling.style.display =
                                        "flex";
                                    }}
                                  />
                                ) : null}
                                <div
                                  className="w-full h-full flex items-center justify-center text-2xl"
                                  style={{
                                    display: species.image_url
                                      ? "none"
                                      : "flex",
                                  }}
                                >
                                  🐦
                                </div>
                              </div>

                              {/* Species Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[var(--text)] truncate">
                                  {species.english_name}
                                </h3>
                                {species.scientific_name && (
                                  <p className="text-sm text-[var(--text-dim)] italic truncate">
                                    {species.scientific_name}
                                  </p>
                                )}
                                {species.frequency_rank && (
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                                      Rank #{species.frequency_rank}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Add Button */}
                              <button
                                onClick={() => addSpecies(species)}
                                disabled={selectedSpecies.find(
                                  (s) => s.english_name === species.english_name
                                )}
                                className="p-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary)]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Selected Species Canvas */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--text)]">
                  Your Guide ({selectedSpecies.length} species)
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={initializeDatabase}
                    className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                  >
                    Initialize DB
                  </button>
                  {selectedSpecies.length > 0 && (
                    <button
                      onClick={clearAllSelected}
                      className="text-sm text-red-500 hover:text-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Selected Species Droppable */}
              <Droppable droppableId="selected">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      min-h-[500px] max-h-[600px] overflow-y-auto bg-[var(--surface)] rounded-xl border-2 border-dashed p-4 space-y-3
                      ${
                        snapshot.isDraggingOver
                          ? "border-[var(--primary)] bg-[var(--primary)]/5"
                          : "border-[var(--border)]"
                      }
                    `}
                  >
                    {selectedSpecies.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                          Your Guide is Empty
                        </h3>
                        <p className="text-[var(--text-dim)]">
                          Drag species from the left or click the + button to
                          add them to your guide.
                        </p>
                      </div>
                    ) : (
                      selectedSpecies.map((species, index) => (
                        <Draggable
                          key={species.english_name}
                          draggableId={`selected-${species.english_name}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`
                                flex items-center gap-4 p-4 bg-[var(--surface-elev)] rounded-lg border border-[var(--border)] transition-all hover:shadow-md
                                ${
                                  snapshot.isDragging
                                    ? "shadow-xl rotate-2 scale-105"
                                    : ""
                                }
                              `}
                            >
                              {/* Drag Handle */}
                              <div
                                {...provided.dragHandleProps}
                                className="flex flex-col gap-1 cursor-grab active:cursor-grabbing p-1"
                              >
                                <div className="w-1 h-1 bg-[var(--text-dim)] rounded-full"></div>
                                <div className="w-1 h-1 bg-[var(--text-dim)] rounded-full"></div>
                                <div className="w-1 h-1 bg-[var(--text-dim)] rounded-full"></div>
                                <div className="w-1 h-1 bg-[var(--text-dim)] rounded-full"></div>
                                <div className="w-1 h-1 bg-[var(--text-dim)] rounded-full"></div>
                                <div className="w-1 h-1 bg-[var(--text-dim)] rounded-full"></div>
                              </div>

                              {/* Order Number */}
                              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {index + 1}
                              </div>

                              {/* Species Image */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--surface)] flex-shrink-0">
                                {species.image_url ? (
                                  <img
                                    src={species.image_url}
                                    alt={species.english_name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.nextSibling.style.display =
                                        "flex";
                                    }}
                                  />
                                ) : null}
                                <div
                                  className="w-full h-full flex items-center justify-center text-2xl"
                                  style={{
                                    display: species.image_url
                                      ? "none"
                                      : "flex",
                                  }}
                                >
                                  🐦
                                </div>
                              </div>

                              {/* Species Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[var(--text)] truncate">
                                  {species.english_name}
                                </h3>
                                {species.scientific_name && (
                                  <p className="text-sm text-[var(--text-dim)] italic truncate">
                                    {species.scientific_name}
                                  </p>
                                )}
                                {species.frequency_rank && (
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full">
                                      Rank #{species.frequency_rank}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() =>
                                  removeSpecies(species.english_name)
                                }
                                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Summary */}
              {selectedSpecies.length > 0 && (
                <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-xl p-4">
                  <h4 className="font-semibold text-[var(--text)] mb-2">
                    Selection Summary
                  </h4>
                  <p className="text-[var(--text-dim)] text-sm">
                    You have selected{" "}
                    <strong>{selectedSpecies.length} species</strong> for your
                    guide. These species will be available in the layout editor
                    to design your pages.
                  </p>
                </div>
              )}
            </div>
          </div>
        </DragDropContext>
      </div>
    </CreatorShell>
  );
};

export default SpeciesSelectionStep;
