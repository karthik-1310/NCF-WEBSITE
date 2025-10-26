import React, { useState } from "react";

const AdminDashboard = () => {
  const [stats] = useState({
    totalGuides: 127,
    totalSpecies: 3456,
    totalUsers: 89,
    activeJobs: 5,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: "guide_created",
      user: "Dr. Sarah Johnson",
      description: 'Created "Birds of Kerala Coast"',
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "species_added",
      user: "Admin",
      description: "Added 15 new bird species",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "guide_published",
      user: "Prof. Mike Chen",
      description: 'Published "Himalayan Wildlife Guide"',
      time: "1 day ago",
    },
    {
      id: 4,
      type: "user_registered",
      user: "Lisa Parker",
      description: "New user registration",
      time: "2 days ago",
    },
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case "guide_created":
        return "📚";
      case "species_added":
        return "🐦";
      case "guide_published":
        return "✅";
      case "user_registered":
        return "👤";
      default:
        return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="bg-[var(--surface)] shadow-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">
                Admin Dashboard
              </h1>
              <p className="text-[var(--text-dim)] mt-1">
                Manage pocket guides, species data, and user content
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-[var(--text-dim)]">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/80 transition-colors">
                🔄 Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--surface)] rounded-lg shadow-sm p-6 border border-[var(--border)]">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📚</div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">
                  {stats.totalGuides}
                </p>
                <p className="text-[var(--text-dim)] text-sm">Total Guides</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-[var(--primary)]">
              ↗️ +12 this month
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-lg shadow-sm p-6 border border-[var(--border)]">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🐦</div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">
                  {stats.totalSpecies}
                </p>
                <p className="text-[var(--text-dim)] text-sm">
                  Species Database
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-[var(--primary)]">
              ↗️ +45 this week
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-lg shadow-sm p-6 border border-[var(--border)]">
            <div className="flex items-center">
              <div className="text-3xl mr-4">👤</div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">
                  {stats.totalUsers}
                </p>
                <p className="text-[var(--text-dim)] text-sm">Active Users</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-[var(--primary)]">
              ↗️ +8 this week
            </div>
          </div>

          <div className="bg-[var(--surface)] rounded-lg shadow-sm p-6 border border-[var(--border)]">
            <div className="flex items-center">
              <div className="text-3xl mr-4">⚙️</div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">
                  {stats.activeJobs}
                </p>
                <p className="text-[var(--text-dim)] text-sm">
                  Processing Jobs
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-[var(--primary)]">
              🔄 PDF generation
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-[var(--surface)] rounded-lg shadow-sm border border-[var(--border)]">
            <div className="p-6 border-b border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-dashed border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors text-center">
                  <div className="text-2xl mb-2">➕</div>
                  <div className="text-sm font-medium text-[var(--text)]">
                    Add Species
                  </div>
                </button>
                <button className="p-4 border-2 border-dashed border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors text-center">
                  <div className="text-2xl mb-2">🖼️</div>
                  <div className="text-sm font-medium text-[var(--text)]">
                    Manage Images
                  </div>
                </button>
                <button className="p-4 border-2 border-dashed border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors text-center">
                  <div className="text-2xl mb-2">💎</div>
                  <div className="text-sm font-medium text-[var(--text)]">
                    Info Diamonds
                  </div>
                </button>
                <button className="p-4 border-2 border-dashed border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors text-center">
                  <div className="text-2xl mb-2">📄</div>
                  <div className="text-sm font-medium text-[var(--text)]">
                    PDF Settings
                  </div>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <button className="w-full px-4 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/80 transition-colors font-medium">
                  🔄 Run Data Sync
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[var(--surface)] rounded-lg shadow-sm border border-[var(--border)]">
            <div className="p-6 border-b border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="text-xl flex-shrink-0 mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text)]">
                        {activity.user}
                      </p>
                      <p className="text-sm text-[var(--text-dim)]">
                        {activity.description}
                      </p>
                      <p className="text-xs text-[var(--text-dim)] mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <button className="text-sm text-[var(--primary)] hover:text-[var(--primary)]/80 font-medium">
                  View all activity →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
            Management Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[var(--surface)] rounded-lg shadow-sm border border-[var(--border)] p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">🐦</div>
              <h3 className="font-semibold text-[var(--text)] mb-1">
                Species Database
              </h3>
              <p className="text-sm text-[var(--text-dim)] mb-3">
                Manage bird species, taxonomy, and metadata
              </p>
              <button className="text-[var(--primary)] text-sm font-medium hover:text-[var(--primary)]/80">
                Manage Species →
              </button>
            </div>

            <div className="bg-[var(--surface)] rounded-lg shadow-sm border border-[var(--border)] p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">🖼️</div>
              <h3 className="font-semibold text-[var(--text)] mb-1">
                Image Library
              </h3>
              <p className="text-sm text-[var(--text-dim)] mb-3">
                Upload and organize species photographs
              </p>
              <button className="text-[var(--primary)] text-sm font-medium hover:text-[var(--primary)]/80">
                Manage Images →
              </button>
            </div>

            <div className="bg-[var(--surface)] rounded-lg shadow-sm border border-[var(--border)] p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-semibold text-[var(--text)] mb-1">
                Info Diamonds
              </h3>
              <p className="text-sm text-[var(--text-dim)] mb-3">
                Configure field guide information blocks
              </p>
              <button className="text-[var(--primary)] text-sm font-medium hover:text-[var(--primary)]/80">
                Configure Info →
              </button>
            </div>

            <div className="bg-[var(--surface)] rounded-lg shadow-sm border border-[var(--border)] p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-semibold text-[var(--text)] mb-1">
                PDF Generation
              </h3>
              <p className="text-sm text-[var(--text-dim)] mb-3">
                Template settings and export options
              </p>
              <button className="text-[var(--primary)] text-sm font-medium hover:text-[var(--primary)]/80">
                PDF Settings →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
