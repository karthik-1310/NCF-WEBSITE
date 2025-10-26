import React, { useState } from "react";
import { useGuideContext } from "../../contexts/GuideContext";
import CreatorShell from "../../components/CreatorShell";
import { Container, Card, Button } from "../../components/ui";

const PreviewStep = () => {
  const { creatorData } = useGuideContext();
  const [pdfJobStatus, setPdfJobStatus] = useState("idle"); // idle, queued, processing, completed, failed
  const [currentPage, setCurrentPage] = useState(1);
  const [shareLink, setShareLink] = useState("");

  const handleGeneratePDF = () => {
    setPdfJobStatus("queued");

    // Simulate PDF generation process
    setTimeout(() => setPdfJobStatus("processing"), 1000);
    setTimeout(() => setPdfJobStatus("completed"), 5000);
  };

  const handleDownloadPDF = () => {
    // In real app, this would download the generated PDF
    const link = document.createElement("a");
    link.href = "#"; // Would be actual PDF URL
    link.download = `${creatorData.guideName || "Guide"}.pdf`;
    link.click();
  };

  const handleShareLink = () => {
    const mockShareUrl = `https://pocketguide.creator/guide/${Date.now()}`;
    setShareLink(mockShareUrl);
    navigator.clipboard.writeText(mockShareUrl);
  };

  const mockPages = [
    { id: 1, title: "Cover Page", thumbnail: "/api/placeholder/150/200" },
    { id: 2, title: "Page 1 - Birds", thumbnail: "/api/placeholder/150/200" },
    { id: 3, title: "Page 2 - Mammals", thumbnail: "/api/placeholder/150/200" },
    { id: 4, title: "Page 3 - Index", thumbnail: "/api/placeholder/150/200" },
  ];

  return (
    <CreatorShell>
      <Container className="py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-4">
              Preview & Export
            </h1>
            <p className="text-lg text-[var(--text-dim)] max-w-2xl mx-auto">
              Review your guide and generate a PDF for download or sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Summary & Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* Guide Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                  Guide Summary
                </h3>

                <div className="space-y-4">
                  {/* Logo and Name */}
                  <div className="flex items-center space-x-3">
                    {creatorData.logo && (
                      <img
                        src={creatorData.logo.url}
                        alt="Guide logo"
                        className="w-12 h-12 object-cover rounded-lg border border-[var(--border)]"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-[var(--text)]">
                        {creatorData.guideName || "Untitled Guide"}
                      </h4>
                      <p className="text-sm text-[var(--text-dim)]">
                        {creatorData.region.state && creatorData.region.district
                          ? `${creatorData.region.district}, ${creatorData.region.state}`
                          : "No region selected"}
                      </p>
                    </div>
                  </div>

                  {/* Cover Image */}
                  {creatorData.coverImage && (
                    <div>
                      <p className="text-sm font-medium text-[var(--text)] mb-2">
                        Cover Image
                      </p>
                      <img
                        src={creatorData.coverImage.url}
                        alt="Cover image"
                        className="w-full h-24 object-cover rounded-lg border border-[var(--border)]"
                      />
                    </div>
                  )}

                  {/* Taxa */}
                  <div>
                    <p className="text-sm font-medium text-[var(--text)] mb-2">
                      Selected Taxa
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {creatorData.taxa.map((taxa) => (
                        <span
                          key={taxa}
                          className="px-2 py-1 bg-[var(--primary)]/20 text-[var(--primary)] text-xs rounded-full capitalize"
                        >
                          {taxa}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--text)]">
                        {mockPages.length}
                      </p>
                      <p className="text-sm text-[var(--text-dim)]">Pages</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[var(--text)]">
                        {creatorData.taxa.length}
                      </p>
                      <p className="text-sm text-[var(--text-dim)]">
                        Categories
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Export Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                  Export Options
                </h3>

                <div className="space-y-4">
                  {/* PDF Generation */}
                  <div>
                    {pdfJobStatus === "idle" && (
                      <Button
                        variant="primary"
                        onClick={handleGeneratePDF}
                        className="w-full"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c0 .621-.504-1.125-1.125H18.75m-7.5-10.5h6.75m-6.75 2.25h3.75m-3.75 2.25h1.5m3-6.75h.75"
                          />
                        </svg>
                        Generate PDF
                      </Button>
                    )}

                    {pdfJobStatus === "queued" && (
                      <div className="text-center p-4 bg-[var(--warning)]/10 rounded-lg border border-[var(--warning)]/20">
                        <div className="w-8 h-8 mx-auto mb-2 rounded-full border-2 border-[var(--warning)] border-t-transparent animate-spin"></div>
                        <p className="text-sm text-[var(--warning)]">
                          Job queued...
                        </p>
                      </div>
                    )}

                    {pdfJobStatus === "processing" && (
                      <div className="text-center p-4 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
                        <div className="w-8 h-8 mx-auto mb-2 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin"></div>
                        <p className="text-sm text-[var(--primary)]">
                          Processing PDF...
                        </p>
                      </div>
                    )}

                    {pdfJobStatus === "completed" && (
                      <Button
                        variant="primary"
                        onClick={handleDownloadPDF}
                        className="w-full"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                        Download PDF
                      </Button>
                    )}

                    {pdfJobStatus === "failed" && (
                      <div className="text-center p-4 bg-[var(--danger)]/10 rounded-lg border border-[var(--danger)]/20">
                        <p className="text-sm text-[var(--danger)] mb-2">
                          PDF generation failed
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleGeneratePDF}
                        >
                          Try again
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Share Link */}
                  <div>
                    <Button
                      variant="ghost"
                      onClick={handleShareLink}
                      className="w-full"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z"
                        />
                      </svg>
                      Share Link
                    </Button>

                    {shareLink && (
                      <div className="mt-2 p-3 bg-[var(--surface-elev)] rounded-lg">
                        <p className="text-xs text-[var(--text-dim)] mb-1">
                          Link copied to clipboard
                        </p>
                        <p className="text-sm text-[var(--text)] font-mono break-all">
                          {shareLink}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                  Guide Preview
                </h3>

                <div className="flex space-x-6">
                  {/* Page Thumbnails */}
                  <div className="w-32 space-y-3">
                    <h4 className="text-sm font-medium text-[var(--text)]">
                      Pages
                    </h4>
                    {mockPages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => setCurrentPage(page.id)}
                        className={`
                          w-full p-2 rounded-lg border text-left transition-colors
                          ${
                            currentPage === page.id
                              ? "border-[var(--primary)] bg-[var(--primary)]/10"
                              : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elev)]"
                          }
                        `}
                      >
                        <div className="w-full h-20 bg-[var(--surface-elev)] rounded mb-2 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-[var(--text-dim)]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M8.25 9h7.5"
                            />
                          </svg>
                        </div>
                        <p className="text-xs text-[var(--text-dim)]">
                          {page.title}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Large Preview */}
                  <div className="flex-1">
                    <div className="bg-[var(--surface)] rounded-lg shadow-med p-8 min-h-[400px] border border-[var(--border)]">
                      {/* Mock page content on white background for print realism */}
                      <div className="text-center text-gray-800">
                        <div className="mb-6">
                          {creatorData.logo && (
                            <img
                              src={creatorData.logo.url}
                              alt="Guide logo"
                              className="w-16 h-16 object-cover rounded-lg mx-auto mb-4"
                            />
                          )}
                          <h2 className="text-2xl font-bold mb-2">
                            {creatorData.guideName || "Untitled Guide"}
                          </h2>
                          <p className="text-gray-600">
                            {creatorData.region.state &&
                            creatorData.region.district
                              ? `${creatorData.region.district}, ${creatorData.region.state}`
                              : "No region specified"}
                          </p>
                        </div>

                        {currentPage === 1 && creatorData.coverImage && (
                          <img
                            src={creatorData.coverImage.url}
                            alt="Cover"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-8">
                          {/* Mock species cards */}
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="bg-[var(--surface-elev)] p-4 rounded-lg"
                            >
                              <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                              <h4 className="font-medium text-sm">
                                Species {i}
                              </h4>
                              <p className="text-xs text-gray-500">
                                Scientific name
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Preview Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-[var(--text-dim)]">
                        Page {currentPage} of {mockPages.length}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setCurrentPage(
                              Math.min(mockPages.length, currentPage + 1)
                            )
                          }
                          disabled={currentPage === mockPages.length}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </CreatorShell>
  );
};

export default PreviewStep;
