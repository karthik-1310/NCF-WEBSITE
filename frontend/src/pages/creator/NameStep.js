import React, { useState, useEffect } from "react";
import { useGuideContext } from "../../contexts/GuideContext";
import CreatorShell from "../../components/CreatorShell";

const NameStep = () => {
  const { creatorData, updateCreatorData } = useGuideContext();
  const [guideName, setGuideName] = useState(creatorData.guideName || "");
  const [description, setDescription] = useState(creatorData.description || "");
  const [author, setAuthor] = useState(creatorData.author || "");
  const [logo, setLogo] = useState(creatorData.logo || null);
  const [coverImage, setCoverImage] = useState(creatorData.coverImage || null);

  useEffect(() => {
    updateCreatorData({
      guideName,
      description,
      author,
      logo,
      coverImage,
    });
  }, [guideName, description, author, logo, coverImage, updateCreatorData]);

  const handleFileUpload = (file, type) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = {
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: e.target.result,
        };

        if (type === "logo") {
          setLogo(result);
        } else if (type === "cover") {
          setCoverImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (type) => {
    if (type === "logo") {
      setLogo(null);
    } else if (type === "cover") {
      setCoverImage(null);
    }
  };

  return (
    <CreatorShell>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
            Name your guide and add details
          </h1>
          <p className="text-[var(--text-dim)] text-lg">
            Give your field guide a memorable name and provide some context for
            your users.
          </p>
        </div>

        <div className="space-y-8">
          {/* Guide Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Guide Name *
            </label>
            <input
              type="text"
              value={guideName}
              onChange={(e) => setGuideName(e.target.value)}
              placeholder="e.g., Birds of Kerala Backwaters"
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-dim)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what makes this guide special and who it's for..."
              rows={4}
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-dim)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors resize-none"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Author/Organization
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name or organization"
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-dim)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
            />
          </div>

          {/* Guide Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Guide Logo{" "}
              <span className="text-[var(--text-dim)]">(optional)</span>
            </label>
            <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-6 text-center hover:border-[var(--primary)] transition-colors">
              {logo ? (
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden bg-[var(--surface)]">
                    <img
                      src={logo.dataUrl}
                      alt="Guide logo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text)]">{logo.name}</p>
                    <p className="text-xs text-[var(--text-dim)]">
                      {(logo.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile("logo")}
                    className="text-sm text-[var(--danger)] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-[var(--text)] mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-[var(--text-dim)]">
                    SVG, PNG, JPG (Max. 2MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "logo")
                    }
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="mt-4 inline-block px-4 py-2 bg-[var(--primary)] text-white rounded-lg cursor-pointer hover:bg-[var(--primary)]/80 transition-colors"
                  >
                    Upload
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Cover Image{" "}
              <span className="text-[var(--text-dim)]">(optional)</span>
            </label>
            <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-6 text-center hover:border-[var(--primary)] transition-colors">
              {coverImage ? (
                <div className="space-y-4">
                  <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden bg-[var(--surface)]">
                    <img
                      src={coverImage.dataUrl}
                      alt="Cover image preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text)]">
                      {coverImage.name}
                    </p>
                    <p className="text-xs text-[var(--text-dim)]">
                      {(coverImage.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile("cover")}
                    className="text-sm text-[var(--danger)] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-[var(--text)] mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-[var(--text-dim)]">
                    SVG, PNG, JPG (Max. 2MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "cover")
                    }
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="mt-4 inline-block px-4 py-2 bg-[var(--primary)] text-white rounded-lg cursor-pointer hover:bg-[var(--primary)]/80 transition-colors"
                  >
                    Upload
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Preview Card */}
          {(guideName || description || author || logo || coverImage) && (
            <div className="mt-12 p-8 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
              <h3 className="text-lg font-medium text-[var(--text)] mb-4">
                Preview
              </h3>
              <div className="bg-[var(--bg)] p-6 rounded-lg border border-[var(--border)]">
                {/* Cover Image */}
                {coverImage && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <img
                      src={coverImage.dataUrl}
                      alt="Cover"
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Logo */}
                  {logo && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--surface)] flex-shrink-0">
                      <img
                        src={logo.dataUrl}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Guide Info */}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-[var(--text)] mb-2">
                      {guideName || "Your Guide Name"}
                    </h4>
                    {description && (
                      <p className="text-[var(--text-dim)] mb-3">
                        {description}
                      </p>
                    )}
                    {author && (
                      <p className="text-sm text-[var(--text-dim)]">
                        by {author}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CreatorShell>
  );
};

export default NameStep;
