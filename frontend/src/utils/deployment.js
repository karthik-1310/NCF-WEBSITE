// Production deployment configuration and utilities

import {
  PerformanceMonitor,
  registerServiceWorker,
} from "../utils/performance";

// Environment configuration
export const config = {
  development: {
    apiUrl: "http://localhost:5000/api",
    enableDebug: true,
    enablePerformanceMonitoring: true,
    cacheTimeout: 60000, // 1 minute
    maxRetries: 3,
  },
  production: {
    apiUrl: "/api",
    enableDebug: false,
    enablePerformanceMonitoring: false,
    cacheTimeout: 300000, // 5 minutes
    maxRetries: 1,
  },
  test: {
    apiUrl: "/api",
    enableDebug: false,
    enablePerformanceMonitoring: false,
    cacheTimeout: 0,
    maxRetries: 1,
  },
};

// Get current environment configuration
export const getConfig = () => {
  const env = process.env.NODE_ENV || "development";
  return config[env] || config.development;
};

// Application initialization
export const initializeApp = async () => {
  const appConfig = getConfig();

  try {
    // Register service worker for production
    if (process.env.NODE_ENV === "production") {
      registerServiceWorker();
    }

    // Initialize performance monitoring
    if (appConfig.enablePerformanceMonitoring) {
      PerformanceMonitor.mark("app-init-start");
    }

    // Setup global error handling
    setupErrorHandling();

    // Initialize analytics (if configured)
    await initializeAnalytics();

    // Load user preferences
    loadUserPreferences();

    // Setup accessibility features
    setupAccessibility();

    if (appConfig.enablePerformanceMonitoring) {
      PerformanceMonitor.measure("App initialization", "app-init-start");
    }

    console.log("🚀 Application initialized successfully");
  } catch (error) {
    console.error("❌ Application initialization failed:", error);
    throw error;
  }
};

// Error handling setup
const setupErrorHandling = () => {
  // Global error handler
  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);

    // Report to monitoring service in production
    if (process.env.NODE_ENV === "production") {
      reportError(event.error, "global-error");
    }
  });

  // Unhandled promise rejection handler
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);

    if (process.env.NODE_ENV === "production") {
      reportError(event.reason, "unhandled-promise");
    }
  });

  // React error boundary fallback
  window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ = {
    onError: (error) => {
      console.error("React error:", error);
      if (process.env.NODE_ENV === "production") {
        reportError(error, "react-error");
      }
    },
  };
};

// Error reporting service
const reportError = async (error, type) => {
  try {
    const errorData = {
      message: error.message,
      stack: error.stack,
      type,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Send to monitoring service (placeholder)
    await fetch("/api/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errorData),
    });
  } catch (reportingError) {
    console.error("Failed to report error:", reportingError);
  }
};

// Analytics initialization
const initializeAnalytics = async () => {
  const analyticsId = process.env.REACT_APP_GA_TRACKING_ID;

  if (analyticsId && process.env.NODE_ENV === "production") {
    try {
      // Load Google Analytics
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", analyticsId, {
        page_title: "NCF Pocket Guide Creator",
        page_location: window.location.href,
      });

      window.gtag = gtag;

      console.log("📊 Analytics initialized");
    } catch (error) {
      console.error("Failed to initialize analytics:", error);
    }
  }
};

// User preferences management
const loadUserPreferences = () => {
  try {
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      const parsed = JSON.parse(preferences);

      // Apply theme
      if (parsed.theme) {
        document.documentElement.classList.toggle(
          "dark",
          parsed.theme === "dark"
        );
      }

      // Apply language
      if (parsed.language) {
        document.documentElement.lang = parsed.language;
      }

      // Apply accessibility preferences
      if (parsed.reducedMotion) {
        document.documentElement.style.setProperty("--motion-scale", "0");
      }

      console.log("👤 User preferences loaded");
    }
  } catch (error) {
    console.error("Failed to load user preferences:", error);
  }
};

// Accessibility setup
const setupAccessibility = () => {
  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className =
    "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--primary)] text-[var(--bg)] px-4 py-2 rounded z-50";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Focus management for route changes
  let lastFocusedElement = null;

  const handleRouteChange = () => {
    // Announce route change to screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = `Navigated to ${document.title}`;

    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);

    // Focus management
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  };

  // Listen for route changes
  window.addEventListener("popstate", handleRouteChange);

  console.log("♿ Accessibility features initialized");
};

// Performance optimization for production
export const optimizeForProduction = () => {
  if (process.env.NODE_ENV !== "production") return;

  // Preload critical resources
  const criticalResources = [
    "/api/regions/hierarchy",
    "/api/taxonomy/hierarchy",
  ];

  criticalResources.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    document.head.appendChild(link);
  });

  // Enable resource hints for external resources
  const resourceHints = [
    { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
    { rel: "preconnect", href: "//fonts.gstatic.com" },
  ];

  resourceHints.forEach((hint) => {
    const link = document.createElement("link");
    link.rel = hint.rel;
    link.href = hint.href;
    document.head.appendChild(link);
  });

  // Register intersection observer for images if supported
  if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
};

// Build information
export const getBuildInfo = () => ({
  version: process.env.REACT_APP_VERSION || "1.0.0",
  buildTime: process.env.REACT_APP_BUILD_TIME || new Date().toISOString(),
  gitHash: process.env.REACT_APP_GIT_HASH || "unknown",
  environment: process.env.NODE_ENV || "development",
});

// Health check endpoint for monitoring
export const healthCheck = async () => {
  try {
    const startTime = performance.now();

    // Test API connectivity
    const response = await fetch("/api/health", {
      method: "GET",
      timeout: 5000,
    });

    const apiResponseTime = performance.now() - startTime;

    // Test localStorage
    const testKey = "__health_check__";
    localStorage.setItem(testKey, "test");
    const localStorageWorking = localStorage.getItem(testKey) === "test";
    localStorage.removeItem(testKey);

    // Memory usage (if available)
    const memoryInfo = performance.memory
      ? {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576),
          total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        }
      : null;

    return {
      status: "healthy",
      api: {
        responsive: response.ok,
        responseTime: Math.round(apiResponseTime),
      },
      localStorage: localStorageWorking,
      memory: memoryInfo,
      build: getBuildInfo(),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

// Development helpers
export const devHelpers = {
  // Clear all stored data
  clearAllData: () => {
    localStorage.clear();
    sessionStorage.clear();
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
    console.log("🧹 All stored data cleared");
  },

  // Simulate slow network
  simulateSlowNetwork: (delay = 2000) => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return originalFetch(...args);
    };
    console.log(`🐌 Network simulation enabled (${delay}ms delay)`);
  },

  // Log performance metrics
  logPerformanceMetrics: () => {
    if (performance.getEntriesByType) {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paint = performance.getEntriesByType("paint");

      console.group("📊 Performance Metrics");
      console.log(
        "DOM Content Loaded:",
        Math.round(navigation.domContentLoadedEventEnd)
      );
      console.log("Load Complete:", Math.round(navigation.loadEventEnd));
      paint.forEach((entry) => {
        console.log(`${entry.name}:`, Math.round(entry.startTime));
      });
      console.groupEnd();
    }
  },
};

// Export utilities for app initialization
export default {
  initializeApp,
  optimizeForProduction,
  getBuildInfo,
  healthCheck,
  devHelpers,
  getConfig,
};
