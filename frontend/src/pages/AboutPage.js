import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <section className="relative w-full h-80 overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=400&fit=crop&crop=center")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/80" />

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              About Pocket Guide Creator
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Empowering nature enthusiasts to create personalized field guides
              for meaningful outdoor experiences.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Mission Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-6">
                Our Mission
              </h2>
              <p className="text-[var(--text-dim)] leading-relaxed text-lg mb-6">
                We believe that connecting with nature should be accessible to
                everyone. Our mission is to bridge the gap between scientific
                knowledge and outdoor exploration by providing tools that make
                biodiversity education engaging, personalized, and practical.
              </p>
              <p className="text-[var(--text-dim)] leading-relaxed text-lg">
                Through customizable pocket guides, we help families, educators,
                researchers, and nature lovers discover the incredible diversity
                of life in their local environments while supporting
                conservation awareness and environmental stewardship.
              </p>
            </div>

            {/* Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1574263867128-a3d5c1b1dedc?w=600&h=400&fit=crop&crop=center"
                alt="People exploring nature with field guides"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* How We Build Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center"
                alt="Scientific research and data collection"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-[var(--text)] mb-6">
                How We Build
              </h2>
              <p className="text-[var(--text-dim)] leading-relaxed text-lg mb-6">
                Our platform is built on a foundation of scientific accuracy and
                user-centered design. We collaborate with researchers,
                conservationists, and field experts to ensure our species data
                is current, reliable, and presented in an accessible format.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-[var(--primary)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <p className="text-[var(--text-dim)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)]">
                      Scientific Validation:
                    </span>{" "}
                    Every species entry is reviewed by domain experts and
                    cross-referenced with authoritative databases.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-[var(--primary)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <p className="text-[var(--text-dim)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)]">
                      User Research:
                    </span>{" "}
                    We continuously gather feedback from educators, families,
                    and field professionals to improve our tools.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] bg-opacity-20 flex items-center justify-center mt-1">
                    <svg
                      className="w-4 h-4 text-[var(--primary)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <p className="text-[var(--text-dim)] leading-relaxed">
                    <span className="font-semibold text-[var(--text)]">
                      Open Standards:
                    </span>{" "}
                    We support open science initiatives and collaborate with
                    conservation organizations worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[var(--text)] mb-12 text-center">
            Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-[var(--surface)] p-6 text-center rounded-xl shadow-sm border border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"
                alt="Dr. Sarah Chen"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--border)]"
              />
              <h4 className="text-xl font-semibold text-[var(--text)] mb-2">
                Dr. Sarah Chen
              </h4>
              <p className="text-[var(--primary)] mb-3">Lead Researcher</p>
              <p className="text-[var(--text-dim)] text-sm leading-relaxed">
                Ecologist with 15+ years in biodiversity research and
                environmental education. Passionate about making science
                accessible to all.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-[var(--surface)] p-6 text-center rounded-xl shadow-sm border border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces"
                alt="Marcus Rodriguez"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--border)]"
              />
              <h4 className="text-xl font-semibold text-[var(--text)] mb-2">
                Marcus Rodriguez
              </h4>
              <p className="text-[var(--primary)] mb-3">Product Designer</p>
              <p className="text-[var(--text-dim)] text-sm leading-relaxed">
                UX designer specializing in educational technology. Former park
                ranger with deep understanding of field guide needs.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-[var(--surface)] p-6 text-center rounded-xl shadow-sm border border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b772e04a?w=120&h=120&fit=crop&crop=faces"
                alt="Dr. Maria Petrov"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[var(--border)]"
              />
              <h4 className="text-xl font-semibold text-[var(--text)] mb-2">
                Dr. Maria Petrov
              </h4>
              <p className="text-[var(--primary)] mb-3">
                Conservation Director
              </p>
              <p className="text-[var(--text-dim)] text-sm leading-relaxed">
                Conservation biologist and policy expert. Leads our partnerships
                with research institutions and conservation organizations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="bg-[var(--surface)] p-12 rounded-xl shadow-sm border border-[var(--border)]">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-6">
              Ready to Create Your Guide?
            </h2>
            <p className="text-[var(--text-dim)] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of nature enthusiasts who are already using our
              platform to explore and document their local ecosystems. Start
              creating your personalized pocket guide today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create/step/taxa"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--bg)] px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Create Your Guide
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border border-[var(--border)] text-[var(--text-dim)] hover:bg-[var(--surface-elev)] px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
