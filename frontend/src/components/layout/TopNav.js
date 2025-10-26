import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Button, Icon } from "../ui";

const TopNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 h-16 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm">
      <Container className="h-full">
        <div className="flex items-center justify-between h-full">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <Icon name="book" size={20} className="text-[var(--bg)]" />
            </div>
            <span className="text-lg font-semibold text-[var(--text)]">
              Pocket Guide Creator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium transition-colors duration-200
                  ${
                    isActive(link.path)
                      ? "text-[var(--primary)] border-b-2 border-[var(--primary)] pb-1"
                      : "text-[var(--text-dim)] hover:text-[var(--primary)]"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Button
              as={Link}
              to="/create/step/taxa"
              variant="primary"
              size="small"
              className="hidden sm:inline-flex"
            >
              Create a Guide
            </Button>

            {/* Auth Element - Login for now */}
            <Button
              variant="ghost"
              size="small"
              className="text-[var(--text-dim)] hover:text-[var(--primary)]"
            >
              Login
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[var(--text-dim)] hover:text-[var(--primary)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "x" : "menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] py-4 shadow-lg">
            <Container>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      text-sm font-medium transition-colors duration-200 py-2
                      ${
                        isActive(link.path)
                          ? "text-[var(--primary)] border-l-4 border-[var(--primary)] pl-4"
                          : "text-[var(--text-dim)] hover:text-[var(--primary)] pl-4"
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  as={Link}
                  to="/create/step/taxa"
                  variant="primary"
                  size="small"
                  className="self-start sm:hidden ml-4 mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create a Guide
                </Button>
              </div>
            </Container>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default TopNav;
