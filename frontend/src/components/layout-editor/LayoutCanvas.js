import React, { useState, useRef, useEffect } from "react";
import { useDragDrop } from "./DragDropProvider";

const LayoutCanvas = ({
  pages,
  onPagesChange,
  selectedPage,
  onPageSelect,
  selectedElement,
  onElementSelect,
}) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 800 });
  const [dragTarget, setDragTarget] = useState(null);
  const { draggedItem, draggedOver, enterDropZone, leaveDropZone } =
    useDragDrop();

  // Update canvas size based on container
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        const maxWidth = container.clientWidth - 40; // padding
        const maxHeight = container.clientHeight - 40;

        // Calculate size maintaining A4 aspect ratio (210:297)
        const aspectRatio = 210 / 297;
        let width = Math.min(maxWidth, 600);
        let height = width / aspectRatio;

        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        setCanvasSize({ width, height });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (draggedItem) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / canvasSize.width) * 100;
      const y = ((e.clientY - rect.top) / canvasSize.height) * 100;

      setDragTarget({
        x: Math.max(0, Math.min(95, x)),
        y: Math.max(0, Math.min(95, y)),
      });
      enterDropZone("canvas");
    }
  };

  const handleDragLeave = (e) => {
    // Only leave if actually leaving the canvas
    if (!canvasRef.current.contains(e.relatedTarget)) {
      setDragTarget(null);
      leaveDropZone();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedItem && dragTarget) {
      const newElement = {
        id: Date.now(),
        type: draggedItem.type,
        content: draggedItem.content || "",
        position: { x: dragTarget.x, y: dragTarget.y },
        size: draggedItem.defaultSize || { width: 25, height: 15 },
        style: draggedItem.defaultStyle || {},
      };

      const updatedPages = [...pages];
      if (!updatedPages[selectedPage]) {
        updatedPages[selectedPage] = { elements: [] };
      }
      updatedPages[selectedPage].elements.push(newElement);

      onPagesChange(updatedPages);
      setDragTarget(null);
    }
  };

  const handleElementClick = (element, e) => {
    e.stopPropagation();
    onElementSelect(element);
  };

  const handleElementDrag = (elementId, e) => {
    // Handle dragging existing elements on canvas
    e.dataTransfer.effectAllowed = "move";
  };

  const handleCanvasClick = () => {
    // Deselect all elements
    onElementSelect(null);
  };

  const currentPage = pages[selectedPage] || { elements: [] };

  return (
    <div className="flex-1 bg-[var(--bg)] p-4 overflow-auto">
      <div className="flex flex-col items-center h-full">
        {/* Page Navigation */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-[var(--text-dim)]">Page:</span>
          {Array.from({ length: Math.max(1, pages.length) }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageSelect(i)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                selectedPage === i
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-elev)]"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => {
              const newPages = [...pages];
              newPages.push({ elements: [] });
              onPagesChange(newPages);
            }}
            className="px-3 py-1 text-sm bg-[var(--primary)] text-white rounded hover:bg-[var(--primary)]/80 transition-colors"
          >
            + Add Page
          </button>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className={`relative bg-[var(--surface)] shadow-lg border-2 transition-colors ${
            draggedOver === "canvas" && draggedItem
              ? "border-[var(--primary)] bg-[var(--primary)]/10"
              : "border-[var(--border)]"
          }`}
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            minHeight: "400px",
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleCanvasClick}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: `${canvasSize.width / 20}px ${
                canvasSize.height / 20
              }px`,
            }}
          />

          {/* Drop target indicator */}
          {dragTarget && draggedItem && (
            <div
              className="absolute border-2 border-dashed border-[var(--primary)] bg-[var(--primary)]/20 opacity-50"
              style={{
                left: `${dragTarget.x}%`,
                top: `${dragTarget.y}%`,
                width: `${draggedItem.defaultSize?.width || 25}%`,
                height: `${draggedItem.defaultSize?.height || 15}%`,
              }}
            />
          )}

          {/* Rendered elements */}
          {currentPage.elements.map((element) => (
            <div
              key={element.id}
              className={`absolute border-2 hover:border-[var(--primary)] cursor-move bg-[var(--surface)] shadow-sm transition-colors ${
                selectedElement && selectedElement.id === element.id
                  ? "border-[var(--primary)] bg-[var(--primary)]/10"
                  : "border-[var(--border)]"
              }`}
              style={{
                left: `${element.position.x}%`,
                top: `${element.position.y}%`,
                width: `${element.size.width}%`,
                height: `${element.size.height}%`,
                ...element.style,
              }}
              onClick={(e) => handleElementClick(element, e)}
              draggable
              onDragStart={(e) => handleElementDrag(element.id, e)}
            >
              <ElementRenderer element={element} />
            </div>
          ))}

          {/* Guide for empty canvas */}
          {currentPage.elements.length === 0 && !draggedItem && (
            <div className="absolute inset-0 flex items-center justify-center text-[var(--text-dim)]">
              <div className="text-center">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-sm">
                  Drag elements from the sidebar to start designing
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Canvas info */}
        <div className="mt-2 text-xs text-[var(--text-dim)]">
          {canvasSize.width} × {canvasSize.height}px • A4 ratio • Page{" "}
          {selectedPage + 1}
        </div>
      </div>
    </div>
  );
};

const ElementRenderer = ({ element }) => {
  switch (element.type) {
    case "text":
      return (
        <div className="p-2 h-full overflow-hidden">
          <div className="text-xs text-[var(--text-dim)] mb-1 font-semibold">
            Text Block
          </div>
          <div
            className="text-sm"
            style={{ fontSize: "10px", lineHeight: "1.2" }}
          >
            {typeof element.content === "string"
              ? element.content
              : element.content?.text || "Sample text content"}
          </div>
        </div>
      );
    case "image":
      return (
        <div className="p-2 h-full bg-[var(--surface-elev)] border-dashed border-2 border-[var(--border)] flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg mb-1">🖼️</div>
            <div className="text-xs text-[var(--text-dim)]">Image</div>
          </div>
        </div>
      );
    case "species-card":
      return (
        <div className="p-2 h-full border bg-[var(--surface)]">
          <div className="text-xs text-[var(--text-dim)] mb-1 font-semibold">
            Species Card
          </div>
          <div className="flex gap-2 h-full">
            <div className="w-8 h-8 bg-[var(--surface-elev)] rounded flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">
                {element.content?.name || "Bird Name"}
              </div>
              <div className="text-xs text-[var(--text-dim)] truncate">
                {element.content?.scientific || "Scientific name"}
              </div>
            </div>
          </div>
        </div>
      );
    case "heading":
      return (
        <div className="p-2 h-full flex items-center">
          <div className="text-sm font-bold" style={{ fontSize: "14px" }}>
            {typeof element.content === "string"
              ? element.content
              : element.content?.text || "Heading Text"}
          </div>
        </div>
      );
    case "divider":
      return (
        <div className="p-2 h-full flex items-center">
          <div className="w-full border-t-2 border-[var(--border)]"></div>
        </div>
      );
    default:
      return (
        <div className="p-2 h-full bg-[var(--warning)]/20 border border-[var(--warning)]">
          <div className="text-xs text-[var(--warning)]">
            Unknown element: {element.type}
          </div>
        </div>
      );
  }
};

export default LayoutCanvas;
