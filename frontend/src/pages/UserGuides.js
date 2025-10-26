import React, { useState } from "react";

const UserGuides = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const guides = [
    {
      id: 1,
      title: "Getting Started with Pocket Guides",
      description:
        "Learn the basics of creating your first wildlife identification guide",
      category: "getting-started",
      duration: "10 min read",
      difficulty: "Beginner",
      tags: ["basics", "tutorial", "first-time"],
    },
    {
      id: 2,
      title: "Advanced Layout Design",
      description:
        "Master the drag-and-drop editor with professional layout techniques",
      category: "layout-design",
      duration: "15 min read",
      difficulty: "Advanced",
      tags: ["layout", "design", "advanced"],
    },
    {
      id: 3,
      title: "Species Data Management",
      description:
        "Best practices for organizing and importing species information",
      category: "data-management",
      duration: "12 min read",
      difficulty: "Intermediate",
      tags: ["data", "species", "organization"],
    },
    {
      id: 4,
      title: "Troubleshooting Common Issues",
      description:
        "Solutions to frequently encountered problems and error messages",
      category: "troubleshooting",
      duration: "8 min read",
      difficulty: "Beginner",
      tags: ["help", "troubleshooting", "faq"],
    },
  ];

  const categories = {
    "getting-started": { icon: "🚀", label: "Getting Started" },
    "layout-design": { icon: "🎨", label: "Layout Design" },
    "data-management": { icon: "📊", label: "Data Management" },
    troubleshooting: { icon: "🔧", label: "Troubleshooting" },
  };

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-[var(--primary)]/10 text-[var(--primary)]";
      case "Intermediate":
        return "bg-[var(--accent)]/10 text-[var(--accent)]";
      case "Advanced":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-[var(--surface)] text-[var(--text-dim)]";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="bg-[var(--surface)] shadow-sm border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-[var(--text)]">
              User Guides & Documentation
            </h1>
            <p className="text-[var(--text-dim)] mt-1">
              Learn how to create amazing field guides with our comprehensive
              tutorials
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Start Banner */}
        <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 rounded-lg p-6 mb-8 text-[var(--text)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                🚀 New to Pocket Guides?
              </h2>
              <p className="text-[var(--text-dim)] mb-4">
                Get started with our interactive tutorial and create your first
                guide in minutes
              </p>
              <button className="bg-[var(--surface)] text-[var(--primary)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--surface-elev)] transition-colors">
                Start Interactive Tutorial
              </button>
            </div>
            <div className="hidden md:block text-6xl opacity-20">📚</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-[var(--surface)] p-1 rounded-lg w-fit">
          {[
            { id: "overview", label: "All Guides", icon: "📚" },
            { id: "video", label: "Video Tutorials", icon: "🎥" },
            { id: "faq", label: "FAQ", icon: "❓" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm"
                  : "text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search guides and tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-[var(--text-dim)]">
              🔍
            </div>
          </div>
        </div>

        {activeTab === "overview" && (
          <div>
            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-4 text-center hover:bg-[var(--surface-elev)] transition-colors cursor-pointer"
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-[var(--text)]">
                    {category.label}
                  </h3>
                  <p className="text-sm text-[var(--text-dim)] mt-1">
                    {guides.filter((g) => g.category === key).length} guides
                  </p>
                </div>
              ))}
            </div>

            {/* Guides List */}
            <div className="space-y-4">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6 hover:bg-[var(--surface-elev)] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">
                          {categories[guide.category].icon}
                        </span>
                        <h3 className="text-lg font-semibold text-[var(--text)]">
                          {guide.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            guide.difficulty
                          )}`}
                        >
                          {guide.difficulty}
                        </span>
                      </div>
                      <p className="text-[var(--text-dim)] mb-3">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-[var(--text-dim)]">
                        <span>⏱️ {guide.duration}</span>
                        <span>📂 {categories[guide.category].label}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {guide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[var(--surface-elev)] text-[var(--text-dim)] text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-[var(--primary)] text-[var(--text)] rounded-lg hover:bg-[var(--primary)]/90 transition-colors">
                      Read Guide
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "video" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
              Video Tutorials Coming Soon
            </h3>
            <p className="text-[var(--text-dim)] max-w-md mx-auto">
              We're creating comprehensive video tutorials to help you master
              every feature. Check back soon for step-by-step visual guides.
            </p>
          </div>
        )}

        {activeTab === "faq" && (
          <div>
            <div className="space-y-6">
              {[
                {
                  question: "How do I create my first guide?",
                  answer:
                    "Start by clicking 'Create New Guide' from the homepage. Follow our step-by-step wizard to select your taxa, region, and customize your guide layout.",
                },
                {
                  question: "Can I import existing species data?",
                  answer:
                    "Yes! You can upload CSV files with species information. Our system supports standard taxonomic fields and will help you map your data correctly.",
                },
                {
                  question: "What image formats are supported?",
                  answer:
                    "We support JPEG, PNG, and WebP formats. For best results, use high-resolution images (at least 1200px wide) with good lighting and clear subject focus.",
                },
                {
                  question: "How do I share my completed guide?",
                  answer:
                    "Once published, you can share your guide via a direct link, export as PDF, or embed it on your website using our provided embed code.",
                },
                {
                  question: "Is there a limit to guide size?",
                  answer:
                    "Free accounts can create guides with up to 50 species. Pro accounts have unlimited species and additional customization options.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6"
                >
                  <h3 className="font-semibold text-[var(--text)] mb-2">
                    ❓ {faq.question}
                  </h3>
                  <p className="text-[var(--text-dim)]">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg p-6">
              <h3 className="font-semibold text-[var(--primary)] mb-2">
                💬 Still have questions?
              </h3>
              <p className="text-[var(--text-dim)] mb-4">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>
              <button className="bg-[var(--primary)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--primary)]/90 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGuides;
