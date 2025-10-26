import React from "react";
import { useDragDrop } from "./DragDropProvider";
import { useGuideContext } from "../../contexts/GuideContext";

const ElementPalette = () => {
  const { startDrag, endDrag } = useDragDrop();
  const { creatorData } = useGuideContext();

  const selectedSpecies = creatorData.selectedSpecies || [];

  const elementTypes = [
    {
      type: "text",
      icon: "📝",
      label: "Text Block",
      description: "Add custom text content",
      defaultSize: { width: 40, height: 20 },
      defaultStyle: {},
      content: "Your text here...",
    },
    {
      type: "heading",
      icon: "📰",
      label: "Heading",
      description: "Add section headings",
      defaultSize: { width: 60, height: 10 },
      defaultStyle: {},
      content: "Section Heading",
    },
    {
      type: "species-card",
      icon: "🐦",
      label: "Species Card",
      description: "Bird species information",
      defaultSize: { width: 45, height: 25 },
      defaultStyle: {},
      content: null,
    },
    {
      type: "image",
      icon: "🖼️",
      label: "Image",
      description: "Add photos or illustrations",
      defaultSize: { width: 35, height: 30 },
      defaultStyle: {},
      content: null,
    },
    {
      type: "divider",
      icon: "➖",
      label: "Divider",
      description: "Section separator line",
      defaultSize: { width: 80, height: 5 },
      defaultStyle: {},
      content: null,
    },
  ];

  const handleDragStart = (element, e) => {
    startDrag(element, e);
  };

  const handleDragEnd = () => {
    endDrag();
  };

  const handleSpeciesDragStart = (species, e) => {
    const speciesElement = {
      type: "species-card",
      icon: "🐦",
      label: `${species.english_name}`,
      description: species.scientific_name || "Species information",
      defaultSize: { width: 45, height: 25 },
      defaultStyle: {},
      content: species,
    };
    startDrag(speciesElement, e);
  };

  return (
    <div className="w-64 bg-[var(--surface)] border-r border-[var(--border)] overflow-y-auto flex flex-col h-full">
      {/* Selected Species Section */}
      {selectedSpecies.length > 0 && (
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">
            Your Species ({selectedSpecies.length})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selectedSpecies.map((species, index) => (
              <div
                key={species.english_name}
                className="group cursor-move bg-[var(--surface-elev)] hover:bg-[var(--primary)]/10 border border-[var(--border)] hover:border-[var(--primary)] rounded-lg p-3 transition-colors"
                draggable
                onDragStart={(e) => handleSpeciesDragStart(species, e)}
                onDragEnd={handleDragEnd}
                tabIndex={0}
                role="button"
                aria-label={`Drag ${species.english_name} to canvas`}
              >
                <div className="flex items-center gap-3">
                  {/* Species Image */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--surface)] flex-shrink-0">
                    {species.image_url ? (
                      <img
                        src={species.image_url}
                        alt={species.english_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="w-full h-full flex items-center justify-center text-lg"
                      style={{ display: species.image_url ? "none" : "flex" }}
                    >
                      🐦
                    </div>
                  </div>

                  {/* Species Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[var(--text)] group-hover:text-[var(--primary)] text-sm truncate">
                      {species.english_name}
                    </h4>
                    {species.scientific_name && (
                      <p className="text-xs text-[var(--text-dim)] group-hover:text-[var(--primary)] mt-1 italic truncate">
                        {species.scientific_name}
                      </p>
                    )}
                  </div>

                  {/* Order Number */}
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                </div>

                {/* Visual drag indicator */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-[var(--primary)] flex items-center gap-1">
                    <span>🖱️</span>
                    <span>Drag to canvas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Elements Section */}
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">
          Elements
        </h3>

        <div className="space-y-3">
          {elementTypes.map((element) => (
            <div
              key={element.type}
              className="group cursor-move bg-[var(--surface-elev)] hover:bg-[var(--primary)]/10 border border-[var(--border)] hover:border-[var(--primary)] rounded-lg p-3 transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(element, e)}
              onDragEnd={handleDragEnd}
              tabIndex={0}
              role="button"
              aria-label={`Drag ${element.label} to canvas`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  // Could implement keyboard-based element insertion here
                  console.log("Keyboard insert:", element.label);
                }
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="text-2xl flex-shrink-0"
                  role="img"
                  aria-label={element.label}
                >
                  {element.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[var(--text)] group-hover:text-[var(--primary)] text-sm">
                    {element.label}
                  </h4>
                  <p className="text-xs text-[var(--text-dim)] group-hover:text-[var(--primary)] mt-1">
                    {element.description}
                  </p>
                </div>
              </div>

              {/* Visual drag indicator */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs text-[var(--primary)] flex items-center gap-1">
                  <span>🖱️</span>
                  <span>Drag to canvas</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-6 p-3 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
          <h4 className="text-sm font-medium text-[var(--primary)] mb-2">
            💡 Quick Tips
          </h4>
          <ul className="text-xs text-[var(--text)] space-y-1">
            <li>• Drag species/elements to canvas</li>
            <li>• Click elements to edit properties</li>
            <li>• Use grid for precise alignment</li>
            <li>• Add multiple pages for longer guides</li>
          </ul>
        </div>

        {/* Keyboard shortcuts */}
        <div className="mt-4 p-3 bg-[var(--surface-elev)] rounded-lg border border-[var(--border)]">
          <h4 className="text-sm font-medium text-[var(--text)] mb-2">
            ⌨️ Shortcuts
          </h4>
          <ul className="text-xs text-[var(--text-dim)] space-y-1">
            <li>
              <kbd className="px-1 bg-[var(--border)] rounded">Del</kbd> Delete
              selected
            </li>
            <li>
              <kbd className="px-1 bg-[var(--border)] rounded">Ctrl+Z</kbd> Undo
            </li>
            <li>
              <kbd className="px-1 bg-[var(--border)] rounded">Ctrl+D</kbd>{" "}
              Duplicate
            </li>
            <li>
              <kbd className="px-1 bg-[var(--border)] rounded">Arrows</kbd> Move
              element
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElementPalette;
