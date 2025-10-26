import React, { useState, useEffect } from "react";
import { useGuideContext } from "../../contexts/GuideContext";
import CreatorShell from "../../components/CreatorShell";
import TaxaIcon from "../../components/TaxaIcon";

const TaxaStep = () => {
  const { creatorData, updateCreatorData } = useGuideContext();
  const [selectedTaxa, setSelectedTaxa] = useState(creatorData.taxa || "");
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoading, setImageLoading] = useState({});

  const taxaOptions = [
    {
      id: "birds",
      name: "Birds",
      description: "Explore avian species in your region",
      image:
        "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      fallbackColor: "#3B82F6",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: "butterflies",
      name: "Butterflies",
      description: "Discover colorful lepidoptera",
      image:
        "https://images.unsplash.com/photo-1587613753773-4b8b7d7c4c67?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      fallbackColor: "#F97316",
      gradient: "from-orange-400 to-pink-500",
    },
    {
      id: "mammals",
      name: "Mammals",
      description: "Learn about mammalian wildlife",
      image:
        "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      fallbackColor: "#D97706",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      id: "reptiles",
      name: "Reptiles",
      description: "Identify reptilian species",
      image:
        "https://images.unsplash.com/photo-1601816730459-2a4915cdcd78?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      fallbackColor: "#10B981",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      id: "amphibians",
      name: "Amphibians",
      description: "Find frogs, toads, and salamanders",
      image:
        "https://images.unsplash.com/photo-1565002330297-58754c040ddc?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      fallbackColor: "#059669",
      gradient: "from-emerald-400 to-green-600",
    },
    {
      id: "insects",
      name: "Insects",
      description: "Explore diverse insect life",
      image:
        "https://images.unsplash.com/photo-1516722794624-be60bc8e8c96?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
      fallbackColor: "#7C3AED",
      gradient: "from-purple-400 to-violet-500",
    },
  ];

  const handleImageError = (taxaId) => {
    setImageErrors((prev) => ({ ...prev, [taxaId]: true }));
    setImageLoading((prev) => ({ ...prev, [taxaId]: false }));
  };

  const handleImageLoad = (taxaId) => {
    setImageLoading((prev) => ({ ...prev, [taxaId]: false }));
  };

  const handleImageStart = (taxaId) => {
    setImageLoading((prev) => ({ ...prev, [taxaId]: true }));
  };

  useEffect(() => {
    updateCreatorData({ taxa: selectedTaxa });
  }, [selectedTaxa, updateCreatorData]);

  const selectTaxa = (taxaId) => {
    setSelectedTaxa(taxaId);
  };

  const isSelected = (taxaId) => selectedTaxa === taxaId;

  return (
    <CreatorShell>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
            Choose the type of species you want to include in your guide.
          </h1>
          <p className="text-[var(--text-dim)] text-lg">
            Select one taxa to focus your field guide on the wildlife you're
            most interested in.
          </p>
        </div>

        {/* Taxa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {taxaOptions.map((taxa) => {
            const selected = isSelected(taxa.id);

            return (
              <div
                key={taxa.id}
                className={`
                  relative cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${
                    selected
                      ? "ring-4 ring-[var(--primary)] ring-opacity-50"
                      : ""
                  }
                `}
                onClick={() => selectTaxa(taxa.id)}
              >
                <div className="bg-[var(--surface)] rounded-xl shadow-lg overflow-hidden h-80 group hover:shadow-xl transition-all duration-300 border border-[var(--border)]">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    {imageLoading[taxa.id] && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${taxa.gradient} flex items-center justify-center z-10`}
                      >
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    )}

                    {!imageErrors[taxa.id] ? (
                      <img
                        src={taxa.image}
                        alt={taxa.name}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                          imageLoading[taxa.id] ? "opacity-0" : "opacity-100"
                        }`}
                        onError={() => handleImageError(taxa.id)}
                        onLoad={() => handleImageLoad(taxa.id)}
                        onLoadStart={() => handleImageStart(taxa.id)}
                        loading="lazy"
                      />
                    ) : (
                      /* Fallback gradient background with custom icon */
                      <div
                        className={`w-full h-full bg-gradient-to-br ${taxa.gradient} flex items-center justify-center`}
                      >
                        <TaxaIcon
                          type={taxa.id}
                          className="w-20 h-20 text-white/90"
                        />
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${taxa.gradient} opacity-40`}
                    />

                    {/* Selection Indicator */}
                    {selected && (
                      <div className="absolute top-4 right-4 w-10 h-10 bg-[var(--bg)] rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-6 h-6 text-[var(--primary)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[var(--text)] mb-2">
                      {taxa.name}
                    </h3>
                    <p className="text-[var(--text-dim)] text-sm">
                      {taxa.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Summary */}
        {selectedTaxa && (
          <div className="mt-8 p-6 bg-[var(--primary)] bg-opacity-10 rounded-xl border border-[var(--primary)] border-opacity-30">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-[var(--text)] mb-2">
                Selected Category
              </h4>
              <p className="text-[var(--text-dim)]">
                {taxaOptions.find((t) => t.id === selectedTaxa)?.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </CreatorShell>
  );
};

export default TaxaStep;
