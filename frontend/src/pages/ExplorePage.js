import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Guides", count: 156 },
    { id: "birds", name: "Bird Guides", count: 89 },
    { id: "butterflies", name: "Butterfly Guides", count: 23 },
    { id: "mammals", name: "Mammal Guides", count: 18 },
    { id: "reptiles", name: "Reptile Guides", count: 15 },
    { id: "amphibians", name: "Amphibian Guides", count: 11 },
  ];

  const sampleGuides = [
    {
      id: 1,
      title: "Birds of Western Ghats",
      creator: "Dr. Sarah Chen",
      location: "Karnataka, India",
      species: 45,
      downloads: 1248,
      image:
        "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=200&fit=crop",
      category: "birds",
    },
    {
      id: 2,
      title: "Urban Butterflies Guide",
      creator: "Mike Rodriguez",
      location: "California, USA",
      species: 28,
      downloads: 892,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
      category: "butterflies",
    },
    {
      id: 3,
      title: "Himalayan Wildlife",
      creator: "Amanda Foster",
      location: "Nepal",
      species: 67,
      downloads: 2156,
      image:
        "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300&h=200&fit=crop",
      category: "mammals",
    },
    {
      id: 4,
      title: "Coastal Birds of India",
      creator: "Raj Patel",
      location: "Gujarat, India",
      species: 52,
      downloads: 1567,
      image:
        "https://images.unsplash.com/photo-1551016342-bba9d66bd21c?w=300&h=200&fit=crop",
      category: "birds",
    },
    {
      id: 5,
      title: "Garden Butterflies",
      creator: "Lisa Thompson",
      location: "United Kingdom",
      species: 19,
      downloads: 743,
      image:
        "https://images.unsplash.com/photo-1560966363-5678e73f4954?w=300&h=200&fit=crop",
      category: "butterflies",
    },
    {
      id: 6,
      title: "Forest Reptiles Guide",
      creator: "Carlos Silva",
      location: "Brazil",
      species: 34,
      downloads: 1089,
      image:
        "https://images.unsplash.com/photo-1516728778615-2d590ea185ee?w=300&h=200&fit=crop",
      category: "reptiles",
    },
  ];

  const filteredGuides =
    selectedCategory === "all"
      ? sampleGuides
      : sampleGuides.filter((guide) => guide.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              Explore Nature Guides
            </h1>
            <p className="text-xl text-[var(--text-dim)] max-w-2xl mx-auto">
              Discover thousands of expertly crafted field guides created by
              naturalists worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Filter Categories - Bento Style */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                p-4 rounded-xl border border-[var(--border)] transition-all duration-200 text-left
                ${
                  selectedCategory === category.id
                    ? "border-[var(--primary)] bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]"
                    : "bg-[var(--surface)] hover:border-[var(--primary)] hover:bg-[var(--surface-elev)] text-[var(--text)]"
                }
              `}
            >
              <div className="font-semibold text-sm mb-1">{category.name}</div>
              <div className="text-xs opacity-70">{category.count} guides</div>
            </button>
          ))}
        </div>

        {/* Guides Grid - Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide, index) => (
            <div
              key={guide.id}
              className={`
                bg-[var(--surface)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden
                hover:scale-[1.02] border border-[var(--border)] hover:border-[var(--primary)]
                ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                ${index === 2 ? "lg:row-span-2" : ""}
              `}
            >
              <div className={`${index === 0 ? "md:flex" : ""}`}>
                <div className={`${index === 0 ? "md:w-1/2" : ""} relative`}>
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className={`w-full object-cover ${
                      index === 0 ? "h-64 md:h-full" : "h-48"
                    }`}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-[var(--bg)]/90 backdrop-blur-sm text-[var(--primary)] px-2 py-1 rounded-full text-xs font-medium">
                      {guide.species} species
                    </span>
                  </div>
                </div>

                <div className={`p-6 ${index === 0 ? "md:w-1/2" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[var(--text)] line-clamp-2">
                      {guide.title}
                    </h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-[var(--text-dim)]">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      by {guide.creator}
                    </div>
                    <div className="flex items-center text-sm text-[var(--text-dim)]">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {guide.location}
                    </div>
                    <div className="flex items-center text-sm text-[var(--text-dim)]">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {guide.downloads} downloads
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--bg)] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Guide
                    </button>
                    <button className="px-4 py-2 border border-[var(--border)] text-[var(--text-dim)] rounded-lg text-sm font-medium hover:bg-[var(--surface-elev)] transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--bg)] px-8 py-3 rounded-xl font-semibold transition-colors">
            Load More Guides
          </button>
        </div>
      </div>

      {/* Create CTA */}
      <div className="bg-[var(--primary)] py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--bg)] mb-4">
            Ready to Create Your Own Guide?
          </h2>
          <p className="text-xl text-[var(--surface)] mb-8">
            Join thousands of naturalists sharing their knowledge with the world
          </p>
          <Link
            to="/create/step/taxa"
            className="bg-[var(--bg)] hover:bg-[var(--surface)] text-[var(--primary)] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 inline-block"
          >
            Start Creating Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
