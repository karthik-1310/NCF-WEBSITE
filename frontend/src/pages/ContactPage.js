import React, { useState } from "react";
import { Container, Button, Card, Input } from "../components/ui";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.topic.trim() &&
    formData.message.trim() &&
    formData.consent;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-bg">
        <Container>
          <div className="py-20 text-center">
            <Card className="p-12 max-w-2xl mx-auto bg-surface-elev">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-text mb-4">
                Thanks, we'll be in touch!
              </h1>
              <p className="text-text-dim text-lg leading-relaxed mb-8">
                We've received your message and will get back to you within 24
                hours. In the meantime, feel free to explore our guides or start
                creating your own.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      topic: "",
                      message: "",
                      consent: false,
                    });
                  }}
                  variant="ghost"
                >
                  Send Another Message
                </Button>
                <Button as="a" href="/">
                  Back to Home
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Container>
        <div className="py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-text mb-4">Contact Us</h1>
            <p className="text-xl text-text-dim max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-text mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full"
                  />
                </div>

                {/* Topic Field */}
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Topic *
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-text focus:ring-2 focus:ring-focus focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="data">Data & Research</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-text placeholder-text-muted focus:ring-2 focus:ring-focus focus:border-transparent resize-vertical"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-primary bg-surface border-border rounded focus:ring-focus focus:ring-2"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-text-dim leading-relaxed"
                  >
                    I consent to having this website store my submitted
                    information so they can respond to my inquiry. *
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>

            {/* Support Information */}
            <div className="space-y-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-text mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 text-primary mt-1">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-text">Email</p>
                      <p className="text-text-dim">
                        hello@pocketguidecreator.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 text-primary mt-1">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-text">Response Time</p>
                      <p className="text-text-dim">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 text-primary mt-1">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-text">Location</p>
                      <p className="text-text-dim">
                        Remote team, worldwide support
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-text mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-text mb-1">
                      How do I create my first guide?
                    </p>
                    <p className="text-text-dim text-sm">
                      Click "Create Your Guide" and follow our step-by-step
                      wizard to select your region and species.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-text mb-1">
                      Is the platform free to use?
                    </p>
                    <p className="text-text-dim text-sm">
                      Yes, basic guide creation and PDF generation are
                      completely free.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-text mb-1">
                      Can I contribute species data?
                    </p>
                    <p className="text-text-dim text-sm">
                      We welcome contributions from researchers and field
                      experts. Contact us for collaboration opportunities.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-text mb-4">
                  Other Ways to Connect
                </h3>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="w-10 h-10 bg-surface-elev hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <svg
                      className="w-5 h-5 text-text-dim hover:text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-surface-elev hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Visit our GitHub"
                  >
                    <svg
                      className="w-5 h-5 text-text-dim hover:text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-surface-elev hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Visit our website"
                  >
                    <svg
                      className="w-5 h-5 text-text-dim hover:text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9"
                      />
                    </svg>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
