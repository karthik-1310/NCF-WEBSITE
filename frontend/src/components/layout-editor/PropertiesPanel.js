import React, { useState } from "react";

const PropertiesPanel = ({
  selectedElement,
  onElementUpdate,
  onElementDelete,
}) => {
  const [activeTab, setActiveTab] = useState("content");

  if (!selectedElement) {
    return (
      <div className="w-64 bg-[var(--surface)] border-l border-[var(--border)] p-4">
        <div className="text-center text-[var(--text-dim)] mt-8">
          <div className="text-4xl mb-2">⚙️</div>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "content", label: "Content", icon: "📝" },
    { id: "style", label: "Style", icon: "🎨" },
    { id: "position", label: "Position", icon: "📐" },
  ];

  const handleContentChange = (field, value) => {
    if (selectedElement.type === "text" || selectedElement.type === "heading") {
      // For text/heading elements, content should be a string
      onElementUpdate({
        ...selectedElement,
        content: value,
      });
    } else {
      // For other elements, content is an object
      onElementUpdate({
        ...selectedElement,
        content: {
          ...selectedElement.content,
          [field]: value,
        },
      });
    }
  };

  const handleStyleChange = (field, value) => {
    onElementUpdate({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        [field]: value,
      },
    });
  };

  const handlePositionChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    if (field === "x" || field === "y") {
      onElementUpdate({
        ...selectedElement,
        position: {
          ...selectedElement.position,
          [field]: Math.max(0, Math.min(95, numValue)),
        },
      });
    } else {
      onElementUpdate({
        ...selectedElement,
        size: {
          ...selectedElement.size,
          [field]: Math.max(5, Math.min(100, numValue)),
        },
      });
    }
  };

  return (
    <div className="w-64 bg-[var(--surface)] border-l border-[var(--border)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)]">
        <h3 className="text-lg font-semibold text-[var(--text)]">Properties</h3>
        <p className="text-sm text-[var(--text-dim)] mt-1">
          {selectedElement.type.charAt(0).toUpperCase() +
            selectedElement.type.slice(1)}{" "}
          Element
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[var(--primary)]/10 text-[var(--primary)] border-b-2 border-[var(--primary)]"
                : "text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface-elev)]"
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "content" && (
          <ContentTab
            element={selectedElement}
            onChange={handleContentChange}
          />
        )}
        {activeTab === "style" && (
          <StyleTab element={selectedElement} onChange={handleStyleChange} />
        )}
        {activeTab === "position" && (
          <PositionTab
            element={selectedElement}
            onChange={handlePositionChange}
          />
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[var(--border)]">
        <button
          onClick={() => onElementDelete(selectedElement.id)}
          className="w-full px-3 py-2 bg-[var(--danger)] text-white text-sm rounded hover:bg-[var(--danger)]/80 transition-colors"
        >
          🗑️ Delete Element
        </button>
      </div>
    </div>
  );
};

const ContentTab = ({ element, onChange }) => {
  switch (element.type) {
    case "text":
    case "heading":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Text Content
            </label>
            <textarea
              value={element.content || ""}
              onChange={(e) => onChange("text", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm resize-none"
              rows={element.type === "heading" ? 2 : 4}
              placeholder="Enter your text..."
            />
          </div>
        </div>
      );

    case "species-card":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Species Name
            </label>
            <input
              type="text"
              value={element.content?.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
              placeholder="Common name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Scientific Name
            </label>
            <input
              type="text"
              value={element.content?.scientific || ""}
              onChange={(e) => onChange("scientific", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
              placeholder="Scientific name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Description
            </label>
            <textarea
              value={element.content?.description || ""}
              onChange={(e) => onChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm resize-none"
              rows={3}
              placeholder="Brief description..."
            />
          </div>
        </div>
      );

    case "image":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={element.content?.src || ""}
              onChange={(e) => onChange("src", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Alt Text
            </label>
            <input
              type="text"
              value={element.content?.alt || ""}
              onChange={(e) => onChange("alt", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
              placeholder="Description for accessibility"
            />
          </div>
        </div>
      );

    default:
      return (
        <div className="text-sm text-[var(--text-dim)]">
          No content options for this element type.
        </div>
      );
  }
};

const StyleTab = ({ element, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-2">
          Background Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.style?.backgroundColor || "#ffffff"}
            onChange={(e) => onChange("backgroundColor", e.target.value)}
            className="w-12 h-8 border border-[var(--border)] rounded cursor-pointer"
          />
          <input
            type="text"
            value={element.style?.backgroundColor || "#ffffff"}
            onChange={(e) => onChange("backgroundColor", e.target.value)}
            className="flex-1 px-2 py-1 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded text-sm"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-2">
          Border Color
        </label>
        <div className="flex gap-2">
          <input
            type="color"
            value={element.style?.borderColor || "#e5e7eb"}
            onChange={(e) => onChange("borderColor", e.target.value)}
            className="w-12 h-8 border border-[var(--border)] rounded cursor-pointer"
          />
          <input
            type="text"
            value={element.style?.borderColor || "#e5e7eb"}
            onChange={(e) => onChange("borderColor", e.target.value)}
            className="flex-1 px-2 py-1 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded text-sm"
            placeholder="#e5e7eb"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-2">
          Border Width
        </label>
        <select
          value={element.style?.borderWidth || "1px"}
          onChange={(e) => onChange("borderWidth", e.target.value)}
          className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
        >
          <option value="0px">None</option>
          <option value="1px">Thin (1px)</option>
          <option value="2px">Medium (2px)</option>
          <option value="3px">Thick (3px)</option>
        </select>
      </div>

      {(element.type === "text" || element.type === "heading") && (
        <>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Font Size
            </label>
            <select
              value={element.style?.fontSize || "14px"}
              onChange={(e) => onChange("fontSize", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
            >
              <option value="10px">Small (10px)</option>
              <option value="12px">Normal (12px)</option>
              <option value="14px">Medium (14px)</option>
              <option value="16px">Large (16px)</option>
              <option value="18px">Extra Large (18px)</option>
              <option value="24px">Heading (24px)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={element.style?.color || "#000000"}
                onChange={(e) => onChange("color", e.target.value)}
                className="w-12 h-8 border border-[var(--border)] rounded cursor-pointer"
              />
              <input
                type="text"
                value={element.style?.color || "#000000"}
                onChange={(e) => onChange("color", e.target.value)}
                className="flex-1 px-2 py-1 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded text-sm"
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Text Alignment
            </label>
            <select
              value={element.style?.textAlign || "left"}
              onChange={(e) => onChange("textAlign", e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

const PositionTab = ({ element, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">
            X Position (%)
          </label>
          <input
            type="number"
            min="0"
            max="95"
            step="0.1"
            value={element.position?.x || 0}
            onChange={(e) => onChange("x", e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">
            Y Position (%)
          </label>
          <input
            type="number"
            min="0"
            max="95"
            step="0.1"
            value={element.position?.y || 0}
            onChange={(e) => onChange("y", e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">
            Width (%)
          </label>
          <input
            type="number"
            min="5"
            max="100"
            step="0.1"
            value={element.size?.width || 25}
            onChange={(e) => onChange("width", e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-2">
            Height (%)
          </label>
          <input
            type="number"
            min="5"
            max="100"
            step="0.1"
            value={element.size?.height || 15}
            onChange={(e) => onChange("height", e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-md text-sm"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--border)]">
        <h4 className="text-sm font-medium text-[var(--text)] mb-3">
          Quick Positioning
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Top Left", x: 5, y: 5 },
            { label: "Top Center", x: 37.5, y: 5 },
            { label: "Top Right", x: 70, y: 5 },
            { label: "Center Left", x: 5, y: 42.5 },
            { label: "Center", x: 37.5, y: 42.5 },
            { label: "Center Right", x: 70, y: 42.5 },
            { label: "Bottom Left", x: 5, y: 80 },
            { label: "Bottom Center", x: 37.5, y: 80 },
            { label: "Bottom Right", x: 70, y: 80 },
          ].map((pos) => (
            <button
              key={pos.label}
              onClick={() => {
                onChange("x", pos.x);
                onChange("y", pos.y);
              }}
              className="px-2 py-1 text-xs bg-[var(--surface-elev)] hover:bg-[var(--border)] rounded border border-[var(--border)] text-[var(--text)]"
              title={pos.label}
            >
              {pos.label
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
