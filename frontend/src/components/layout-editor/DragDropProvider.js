import React, { createContext, useContext, useState, useRef } from "react";

const DragDropContext = createContext();

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
};

export const DragDropProvider = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragImageRef = useRef(null);

  const startDrag = (item, event) => {
    setDraggedItem(item);

    // Calculate offset from mouse to element center
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    setDragOffset({ x: offsetX, y: offsetY });

    // Create custom drag image
    if (dragImageRef.current) {
      event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }

    // Set allowed effect
    event.dataTransfer.effectAllowed = "move";
  };

  const endDrag = () => {
    setDraggedItem(null);
    setDraggedOver(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const enterDropZone = (dropZone) => {
    setDraggedOver(dropZone);
  };

  const leaveDropZone = () => {
    setDraggedOver(null);
  };

  const value = {
    draggedItem,
    draggedOver,
    dragOffset,
    dragImageRef,
    startDrag,
    endDrag,
    enterDropZone,
    leaveDropZone,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
      {/* Invisible drag image */}
      <div
        ref={dragImageRef}
        className="fixed -top-1000 -left-1000 w-1 h-1 opacity-0"
        aria-hidden="true"
      />
    </DragDropContext.Provider>
  );
};
