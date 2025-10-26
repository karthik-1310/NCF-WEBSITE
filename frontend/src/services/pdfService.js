import { jsPDF } from "jspdf";

// Function to generate and download a PDF guide
export const generatePDF = async (birds, metadata, includeImages = true) => {
  // Create new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5", // A5 is a good size for a pocket guide
  });

  // Set default font styles
  doc.setFont("helvetica");
  const titleFontSize = 16;
  const subtitleFontSize = 12;
  const headerFontSize = 12;
  const regularFontSize = 10;
  const smallFontSize = 8;

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Add cover page
  doc.setFontSize(titleFontSize);
  doc.setFont("helvetica", "bold");
  doc.text("Pocket Bird Guide", pageWidth / 2, 40, { align: "center" });

  doc.setFontSize(subtitleFontSize);
  doc.text(metadata.title, pageWidth / 2, 50, { align: "center" });

  if (metadata.location) {
    doc.setFontSize(regularFontSize);
    doc.text(metadata.location, pageWidth / 2, 60, { align: "center" });
  }

  // Add creation info
  doc.setFontSize(smallFontSize);
  doc.setFont("helvetica", "italic");
  const dateString = new Date().toLocaleDateString();
  let creationText = `Created: ${dateString}`;
  if (metadata.creator) {
    creationText += ` by ${metadata.creator}`;
  }
  doc.text(creationText, pageWidth / 2, pageHeight - 20, { align: "center" });

  // Add NCF attribution
  doc.setFontSize(smallFontSize);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Generated with NCF Pocket Guide Creator",
    pageWidth / 2,
    pageHeight - 15,
    { align: "center" }
  );

  // Add description if available
  if (metadata.description) {
    doc.setFontSize(regularFontSize);
    doc.setFont("helvetica", "normal");
    const splitDescription = doc.splitTextToSize(
      metadata.description,
      contentWidth
    );
    doc.text(splitDescription, pageWidth / 2, 75, { align: "center" });
  }

  // Group birds by type
  const groupedBirds = birds.reduce((acc, bird) => {
    const type = bird.type || "Other";
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(bird);
    return acc;
  }, {});

  // Sort groups by name
  const sortedGroups = Object.keys(groupedBirds).sort();

  // Add bird pages
  let currentGroup = "";

  // Process each bird
  for (let i = 0; i < birds.length; i++) {
    const bird = birds[i];

    // Add a new page for each bird
    doc.addPage();

    // Page header with bird name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(headerFontSize);
    doc.text(bird.english_name, margin, margin);

    // Add scientific name if enabled
    if (metadata.showScientificNames && bird.scientific_name) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(smallFontSize);
      doc.text(bird.scientific_name, margin, margin + 6);
    }

    // Add local name if enabled
    if (
      metadata.showLocalNames &&
      bird.local_names &&
      metadata.selectedLocalLanguage
    ) {
      const localName = bird.local_names.find(
        (ln) => ln.language === metadata.selectedLocalLanguage
      );
      if (localName) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(smallFontSize);
        doc.text(
          `${metadata.selectedLocalLanguage}: ${localName.name}`,
          margin,
          margin + (metadata.showScientificNames ? 12 : 6)
        );
      }
    }

    // Add image if available and includeImages is true
    let yPosition = margin + 15; // Starting Y position after the names
    if (includeImages && bird.image_link) {
      try {
        // Placeholder for image loading logic
        // In a real implementation, you would use a library to fetch the image
        // and insert it into the PDF
        doc.setFont("helvetica", "normal");
        doc.setFontSize(regularFontSize);
        doc.text("Image placeholder", margin, yPosition + 30);
        yPosition += 60; // Space for image
      } catch (error) {
        console.error("Error adding bird image:", error);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(smallFontSize);
        doc.setTextColor(255, 0, 0);
        doc.text("Image not available", margin, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += 10;
      }
    }

    // Add additional information
    doc.setFont("helvetica", "normal");
    doc.setFontSize(regularFontSize);

    // Add bird type and taxa
    if (bird.type) {
      doc.text(`Type: ${bird.type}`, margin, yPosition);
      yPosition += 6;
    }

    if (bird.taxa) {
      doc.text(`Family: ${bird.taxa}`, margin, yPosition);
      yPosition += 6;
    }

    if (bird.size) {
      doc.text(`Size: ${bird.size} cm`, margin, yPosition);
      yPosition += 6;
    }

    // Add frequency information if available
    if (bird.frequency) {
      doc.text(
        `Frequency: ${bird.frequency.frequency_rank} (rank)`,
        margin,
        yPosition
      );
      yPosition += 6;

      if (bird.frequency.seasonality) {
        doc.text(
          `Seasonality: ${bird.frequency.seasonality}`,
          margin,
          yPosition
        );
        yPosition += 6;
      }
    }

    // Add page number
    doc.setFontSize(smallFontSize);
    doc.text(
      `${i + 1} of ${birds.length}`,
      pageWidth - margin,
      pageHeight - margin,
      { align: "right" }
    );
  }

  // Add a table of contents as the second page
  doc.insertPage(1);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(headerFontSize);
  doc.text("Table of Contents", margin, margin);

  let tocYPosition = margin + 10;
  for (let i = 0; i < birds.length; i++) {
    if (tocYPosition > pageHeight - margin) {
      // Create a new page for TOC if needed
      doc.addPage();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(headerFontSize);
      doc.text("Table of Contents (continued)", margin, margin);
      tocYPosition = margin + 10;
    }

    const bird = birds[i];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(regularFontSize);
    doc.text(`${i + 1}. ${bird.english_name}`, margin, tocYPosition);
    tocYPosition += 6;
  }

  // Save PDF with a filename based on the guide title
  const filename = `${metadata.title
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase()}_bird_guide.pdf`;
  doc.save(filename);

  return filename;
};

// Function to create a preview version (simpler, without images)
export const generatePreviewPDF = async (birds, metadata) => {
  return generatePDF(birds, metadata, false);
};
