import React, { useState, useEffect } from "react";
import { useGuideContext } from "../../contexts/GuideContext";
import CreatorShell from "../../components/CreatorShell";
import { DragDropProvider } from "../../components/layout-editor/DragDropProvider";
import ElementPalette from "../../components/layout-editor/ElementPalette";
import LayoutCanvas from "../../components/layout-editor/LayoutCanvas";
import PropertiesPanel from "../../components/layout-editor/PropertiesPanel";

const LayoutStep = () => {
  const { creatorData, updateCreatorData } = useGuideContext();
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [layoutHistory, setLayoutHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize layout data if not present
  useEffect(() => {
    if (!creatorData.layout || !creatorData.layout.pages) {
      updateCreatorData({
        layout: {
          pages: [{ elements: [] }], // Start with one empty page
        },
      });
    }
  }, [creatorData.layout, updateCreatorData]);

  // Save state to history for undo/redo
  const saveToHistory = (pages) => {
    const newHistory = layoutHistory.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(pages)));
    setLayoutHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handlePagesChange = (newPages) => {
    // Save current state to history before making changes
    if (creatorData.layout?.pages) {
      saveToHistory(creatorData.layout.pages);
    }

    updateCreatorData({
      layout: {
        ...creatorData.layout,
        pages: newPages,
      },
    });
    setSelectedElement(null); // Deselect when layout changes
  };

  const handleElementUpdate = (updatedElement) => {
    const pages = [...(creatorData.layout?.pages || [])];
    if (pages[selectedPage]) {
      const elementIndex = pages[selectedPage].elements.findIndex(
        (el) => el.id === updatedElement.id
      );
      if (elementIndex !== -1) {
        pages[selectedPage].elements[elementIndex] = updatedElement;
        handlePagesChange(pages);
      }
    }
  };

  const handleElementDelete = (elementId) => {
    const pages = [...(creatorData.layout?.pages || [])];
    if (pages[selectedPage]) {
      pages[selectedPage].elements = pages[selectedPage].elements.filter(
        (el) => el.id !== elementId
      );
      handlePagesChange(pages);
      setSelectedElement(null);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      updateCreatorData({
        layout: {
          ...creatorData.layout,
          pages: layoutHistory[newIndex],
        },
      });
      setSelectedElement(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < layoutHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      updateCreatorData({
        layout: {
          ...creatorData.layout,
          pages: layoutHistory[newIndex],
        },
      });
      setSelectedElement(null);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle shortcuts when not typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case "y":
            e.preventDefault();
            handleRedo();
            break;
          default:
            break;
        }
      } else if (e.key === "Delete" && selectedElement) {
        e.preventDefault();
        handleElementDelete(selectedElement.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedElement, historyIndex, layoutHistory]);

  const currentPages = creatorData.layout?.pages || [{ elements: [] }];
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < layoutHistory.length - 1;

  return (
    <CreatorShell
      title="Design Your Layout"
      description="Drag and drop elements to create your guide layout. Customize each element's content and styling."
      currentStep={4}
    >
      <DragDropProvider>
        <div className="flex h-full bg-[var(--bg)]">
          {/* Element Palette */}
          <ElementPalette />

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="bg-[var(--surface)] border-b border-[var(--border)] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-[var(--text)]">
                  Layout Editor
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUndo}
                    disabled={!canUndo}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      canUndo
                        ? "bg-[var(--surface-elev)] hover:bg-[var(--border)] text-[var(--text)]"
                        : "bg-[var(--surface-elev)] text-[var(--text-muted)] cursor-not-allowed"
                    }`}
                    title="Undo (Ctrl+Z)"
                  >
                    ↶ Undo
                  </button>
                  <button
                    onClick={handleRedo}
                    disabled={!canRedo}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      canRedo
                        ? "bg-[var(--surface-elev)] hover:bg-[var(--border)] text-[var(--text)]"
                        : "bg-[var(--surface-elev)] text-[var(--text-muted)] cursor-not-allowed"
                    }`}
                    title="Redo (Ctrl+Y)"
                  >
                    ↷ Redo
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[var(--text-dim)]">
                <span>
                  {currentPages.length} page
                  {currentPages.length !== 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>
                  {currentPages.reduce(
                    (total, page) => total + (page.elements?.length || 0),
                    0
                  )}{" "}
                  elements
                </span>
                {selectedElement && (
                  <>
                    <span>•</span>
                    <span className="text-[var(--primary)] font-medium">
                      {selectedElement.type} selected
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Canvas */}
            <LayoutCanvas
              pages={currentPages}
              onPagesChange={handlePagesChange}
              selectedPage={selectedPage}
              onPageSelect={setSelectedPage}
              selectedElement={selectedElement}
              onElementSelect={setSelectedElement}
            />
          </div>

          {/* Properties Panel */}
          <PropertiesPanel
            selectedElement={selectedElement}
            onElementUpdate={handleElementUpdate}
            onElementDelete={handleElementDelete}
          />
        </div>

        {/* Help text */}
        <div className="absolute bottom-4 left-4 bg-[var(--surface)]/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-[var(--text-dim)] shadow-sm max-w-xs border border-[var(--border)]">
          💡 <strong>Pro tip:</strong> Use Ctrl+Z to undo, click elements to
          edit them, and drag from the sidebar to add new elements.
        </div>
      </DragDropProvider>
    </CreatorShell>
  );
};

export default LayoutStep;
