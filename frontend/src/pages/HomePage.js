import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Bird-themed Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Flying birds - enhanced */}
          <div className="absolute top-1/4 left-1/4 animate-pulse opacity-30">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
              <path
                d="M3 8 Q7 4 12 8 Q17 4 21 8"
                stroke="rgba(34, 197, 94, 0.8)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute top-1/3 right-1/3 animate-pulse delay-1000 opacity-25">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path
                d="M2 7 Q6 3 10 7 Q14 3 18 7"
                stroke="rgba(34, 197, 94, 0.6)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute top-2/3 left-1/3 animate-pulse delay-2000 opacity-20">
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
              <path
                d="M4 9 Q8 5 14 9 Q20 5 24 9"
                stroke="rgba(34, 197, 94, 0.7)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute top-1/5 right-1/4 animate-pulse delay-500 opacity-15">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path
                d="M2 6 Q5 2 9 6 Q13 2 16 6"
                stroke="rgba(34, 197, 94, 0.5)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Large decorative bird silhouette */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-10">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
              <path
                d="M20 40 Q40 20 60 40 Q80 20 100 40 Q90 50 80 45 Q70 55 60 50 Q50 55 40 50 Q30 55 20 50 Z"
                fill="rgba(34, 197, 94, 0.3)"
              />
            </svg>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to
              <span className="block text-[var(--primary)]">
                Pocket Guide Creator
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Craft your personalized nature guide. Explore, learn, and connect
              with the natural world around you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create/step/taxa"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Your Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Pocket Guide? Section */}
      <section className="py-20 px-4 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Book illustration */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Book illustration */}
                <div className="w-80 h-60 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg shadow-2xl transform rotate-3">
                  <div className="absolute inset-4 bg-white rounded border-l-4 border-amber-600">
                    {/* Book pages content */}
                    <div className="p-4 space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-200 rounded mt-4"></div>
                      <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                      <div className="h-1 bg-gray-300 rounded w-3/6"></div>
                    </div>
                  </div>
                </div>
                {/* Book shadow */}
                <div className="absolute -bottom-4 -right-4 w-80 h-60 bg-black opacity-10 rounded-lg transform rotate-3 -z-10"></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-6">
                What is a Pocket Guide?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text)] mb-3">
                    Discover Nature at Your Fingertips
                  </h3>
                  <p className="text-[var(--text-dim)] leading-relaxed text-lg">
                    A Pocket Guide is your personalized companion for exploring
                    the natural world. Customize your guide with local flora,
                    fauna, and points of interest, all in a compact,
                    easy-to-carry format.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Bento Grid */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[var(--text-dim)] max-w-2xl mx-auto">
              Create professional nature guides in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 Card */}
            <div className="group hover:bg-[var(--surface-elev)] hover:border-[var(--primary)] hover:scale-[1.01] hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-[var(--primary)] cursor-pointer bg-[var(--bg)] rounded-xl border-2 border-[var(--border)] p-8">
              <div className="w-16 h-16 bg-[var(--surface-elev)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] group-hover:bg-opacity-20 transition-colors">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                Select Your Region
              </h3>
              <p className="text-[var(--text-dim)] leading-relaxed">
                Choose your area of interest, from national parks to local
                trails.
              </p>
            </div>

            {/* Step 2 Card */}
            <div className="group hover:bg-[var(--surface-elev)] hover:border-[var(--primary)] hover:scale-[1.01] hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-[var(--primary)] cursor-pointer bg-[var(--bg)] rounded-xl border-2 border-[var(--border)] p-8">
              <div className="w-16 h-16 bg-[var(--surface-elev)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] group-hover:bg-opacity-20 transition-colors">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                Customize Your Guide
              </h3>
              <p className="text-[var(--text-dim)] leading-relaxed">
                Add specific plants, animals, and landmarks you want to learn
                about.
              </p>
            </div>

            {/* Step 3 Card */}
            <div className="group hover:bg-[var(--surface-elev)] hover:border-[var(--primary)] hover:scale-[1.01] hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-[var(--primary)] cursor-pointer bg-[var(--bg)] rounded-xl border-2 border-[var(--border)] p-8">
              <div className="w-16 h-16 bg-[var(--surface-elev)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] group-hover:bg-opacity-20 transition-colors">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
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
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                Download and Explore
              </h3>
              <p className="text-[var(--text-dim)] leading-relaxed">
                Get your guide in a printable format, ready for your next
                adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Pocket Guides */}
      <section className="py-20 px-4 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              Sample Pocket Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Forest Explorer's Guide */}
            <div className="bg-[var(--surface)] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/5] bg-gradient-to-br from-green-800 via-green-700 to-green-900 relative overflow-hidden">
                {/* Mountain silhouettes */}
                <svg
                  className="absolute bottom-0 w-full h-2/3"
                  viewBox="0 0 200 120"
                  preserveAspectRatio="xMidYEnd slice"
                >
                  <path
                    d="M0 80 Q50 60 100 70 Q150 50 200 65 V120 H0 Z"
                    fill="rgba(0,0,0,0.3)"
                  />
                  <path
                    d="M0 90 Q60 75 120 85 Q160 70 200 80 V120 H0 Z"
                    fill="rgba(0,0,0,0.2)"
                  />
                </svg>
                {/* Trees */}
                <div className="absolute bottom-4 left-4 text-green-300 opacity-60">
                  <svg
                    width="20"
                    height="30"
                    viewBox="0 0 20 30"
                    fill="currentColor"
                  >
                    <polygon points="10,5 15,20 5,20" />
                    <polygon points="10,10 14,25 6,25" />
                    <rect x="9" y="25" width="2" height="5" />
                  </svg>
                </div>
                <div className="absolute bottom-4 right-6 text-green-400 opacity-50">
                  <svg
                    width="16"
                    height="24"
                    viewBox="0 0 16 24"
                    fill="currentColor"
                  >
                    <polygon points="8,2 12,16 4,16" />
                    <polygon points="8,6 11,20 5,20" />
                    <rect x="7" y="20" width="2" height="4" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--text)] mb-2">
                  Forest Explorer's Guide
                </h3>
                <p className="text-[var(--text-dim)] text-sm">
                  Explore the flora and fauna of the Redwood forests.
                </p>
              </div>
            </div>

            {/* Mountain Trail Companion */}
            <div className="bg-[var(--surface)] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/5] bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700 relative overflow-hidden">
                {/* Mountain peaks */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <path
                    d="M0 120 L60 40 L120 80 L180 20 L200 50 V200 H0 Z"
                    fill="rgba(0,0,0,0.4)"
                  />
                  <path
                    d="M20 140 L80 60 L140 100 L200 70 V200 H20 Z"
                    fill="rgba(0,0,0,0.3)"
                  />
                </svg>
                {/* Sun */}
                <div className="absolute top-8 right-8 w-8 h-8 bg-yellow-200 rounded-full opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--text)] mb-2">
                  Mountain Trail Companion
                </h3>
                <p className="text-[var(--text-dim)] text-sm">
                  Your essential companion for hiking the Appalachian Trail.
                </p>
              </div>
            </div>

            {/* Coastal Discovery Handbook */}
            <div className="bg-[var(--surface)] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
                {/* Waves */}
                <svg
                  className="absolute bottom-0 w-full h-1/2"
                  viewBox="0 0 200 100"
                  preserveAspectRatio="xMidYEnd slice"
                >
                  <path
                    d="M0 70 Q50 50 100 60 Q150 70 200 50 V100 H0 Z"
                    fill="rgba(255,255,255,0.3)"
                  />
                  <path
                    d="M0 80 Q40 65 80 70 Q120 75 160 65 Q180 60 200 65 V100 H0 Z"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
                {/* Beach grass */}
                <div className="absolute bottom-6 left-6 text-green-300 opacity-70">
                  <svg
                    width="12"
                    height="20"
                    viewBox="0 0 12 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M2 18 Q4 10 6 18 M6 18 Q8 8 10 18" />
                  </svg>
                </div>
                {/* Seagull */}
                <div className="absolute top-1/4 right-1/4 text-white opacity-60">
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M2 5 Q5 2 8 5 Q11 2 14 5" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--text)] mb-2">
                  Coastal Discovery Handbook
                </h3>
                <p className="text-[var(--text-dim)] text-sm">
                  Discover the marine life and coastal features of the Pacific
                  Coast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Bento Style */}
      <section className="py-20 px-4 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-[var(--text-dim)] max-w-2xl mx-auto">
              Everything you need to create professional nature guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 - Large Card */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-8 hover:border-[var(--primary)] hover:shadow-lg transition-all duration-200 lg:col-span-2">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-[var(--surface-elev)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                    High-Quality Species Database
                  </h3>
                  <p className="text-[var(--text-dim)] leading-relaxed">
                    Access thousands of professionally photographed species with
                    detailed information, range maps, and identification tips
                    from expert naturalists.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-8 hover:border-[var(--primary)] hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-[var(--surface-elev)] rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                Custom Templates
              </h3>
              <p className="text-[var(--text-dim)] leading-relaxed">
                Choose from beautiful, scientifically-accurate templates
                designed by naturalists.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-8 hover:border-[var(--primary)] hover:shadow-lg transition-all duration-200">
              <div className="w-16 h-16 bg-[var(--surface-elev)] rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                Mobile Friendly
              </h3>
              <p className="text-[var(--text-dim)] leading-relaxed">
                Create and view guides on any device. Perfect for field work and
                outdoor education.
              </p>
            </div>

            {/* Feature Card 4 - Large Card */}
            <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-8 hover:border-[var(--primary)] hover:shadow-lg transition-all duration-200 lg:col-span-2">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-[var(--surface-elev)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-8 h-8 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text)] mb-4">
                    Collaborative Creation
                  </h3>
                  <p className="text-[var(--text-dim)] leading-relaxed">
                    Work with teams, share guides with colleagues, and
                    contribute to the naturalist community with your expertise
                    and observations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              Trusted by Naturalists
            </h2>
            <p className="text-xl text-[var(--text-dim)] max-w-2xl mx-auto">
              See what educators and researchers are saying about our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--bg)] rounded-xl p-8 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--bg)] font-bold text-lg">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[var(--text)]">
                    Dr. Sarah Chen
                  </h4>
                  <p className="text-[var(--text-dim)]">Wildlife Biologist</p>
                </div>
              </div>
              <p className="text-[var(--text-dim)] leading-relaxed">
                "This platform has revolutionized how I create field guides for
                my research teams. The quality and ease of use are exceptional."
              </p>
            </div>

            <div className="bg-[var(--bg)] rounded-xl p-8 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--bg)] font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[var(--text)]">
                    Mike Rodriguez
                  </h4>
                  <p className="text-[var(--text-dim)]">Park Ranger</p>
                </div>
              </div>
              <p className="text-[var(--text-dim)] leading-relaxed">
                "Perfect for creating educational materials for visitors. The
                drag-and-drop interface makes it so simple to customize guides."
              </p>
            </div>

            <div className="bg-[var(--bg)] rounded-xl p-8 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--bg)] font-bold text-lg">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-[var(--text)]">
                    Amanda Foster
                  </h4>
                  <p className="text-[var(--text-dim)]">Nature Educator</p>
                </div>
              </div>
              <p className="text-[var(--text-dim)] leading-relaxed">
                "My students love the guides we create together. It's engaging
                and helps them connect with nature in a meaningful way."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--bg)] mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-[var(--surface)] mb-8 max-w-2xl mx-auto">
            Join thousands of naturalists, educators, and researchers who use
            our platform to share their knowledge
          </p>
          <Link
            to="/create/step/taxa"
            className="bg-[var(--bg)] hover:bg-[var(--surface)] text-[var(--primary)] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
          >
            Create Your First Guide
          </Link>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text)] mb-4">
              Our Partners
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Partner Logo 1 */}
            <div className="bg-[var(--bg)] rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-all duration-200 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary)] bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-opacity-30 transition-colors">
                  <svg
                    className="w-8 h-8 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-[var(--text)] mb-1">
                  Nature Reserve
                </h4>
                <p className="text-xs text-[var(--text-dim)]">Foundation</p>
              </div>
            </div>

            {/* Partner Logo 2 */}
            <div className="bg-[var(--bg)] rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-all duration-200 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary)] bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-opacity-30 transition-colors">
                  <svg
                    className="w-8 h-8 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-[var(--text)] mb-1">
                  National Park
                </h4>
                <p className="text-xs text-[var(--text-dim)]">Service</p>
              </div>
            </div>

            {/* Partner Logo 3 */}
            <div className="bg-[var(--bg)] rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-all duration-200 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary)] bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-opacity-30 transition-colors">
                  <svg
                    className="w-8 h-8 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-[var(--text)] mb-1">
                  Wildlife
                </h4>
                <p className="text-xs text-[var(--text-dim)]">Conservation</p>
              </div>
            </div>

            {/* Partner Logo 4 */}
            <div className="bg-[var(--bg)] rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-all duration-200 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary)] bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-opacity-30 transition-colors">
                  <svg
                    className="w-8 h-8 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-[var(--text)] mb-1">
                  Natural
                </h4>
                <p className="text-xs text-[var(--text-dim)]">Research</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface-elev)] text-[var(--text)] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-6">
                Pocket Guide Creator
              </h3>
              <p className="text-[var(--text-dim)] leading-relaxed">
                Empowering naturalists to create beautiful, educational guides
                for wildlife and nature.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/create/step/taxa"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Create Guide
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Browse Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/templates"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Templates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Newsletter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[var(--text-dim)] hover:text-[var(--primary)] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--border)] mt-12 pt-8 text-center">
            <p className="text-[var(--text-dim)]">
              © 2023 Pocket Guide Creator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
