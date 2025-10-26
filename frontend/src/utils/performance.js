// Performance optimization utilities and hooks

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

// Custom hook for debounced values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for throttled functions
export const useThrottle = (callback, delay) => {
  const throttleRef = useRef(false);

  return useCallback(
    (...args) => {
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;
        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
};

// Custom hook for intersection observer (lazy loading)
export const useIntersectionObserver = (options = {}) => {
  const [entry, setEntry] = useState(null);
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    const currentObserver = observer.current;

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};

// Custom hook for virtual scrolling
export const useVirtualScrolling = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return {
      startIndex,
      endIndex,
      visibleItems: items.slice(startIndex, endIndex),
      totalHeight: items.length * itemHeight,
      offsetY: startIndex * itemHeight,
    };
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    ...visibleItems,
    handleScroll,
  };
};

// Custom hook for local storage with SSR safety
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

// Custom hook for async operations with loading states
export const useAsync = (asyncFunction, dependencies = []) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args) => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await asyncFunction(...args);
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      setState({ data: null, loading: false, error });
      throw error;
    }
  }, dependencies);

  return { ...state, execute };
};

// Image optimization utilities
export const optimizeImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, "image/jpeg", quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Lazy loading component wrapper
export const LazyImage = ({ src, alt, className, placeholder = null }) => {
  const [imageRef, entry] = useIntersectionObserver();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const isVisible = entry?.isIntersecting;

  return (
    <div ref={imageRef} className={className}>
      {isVisible && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      )}
      {(!isVisible || (!loaded && !error)) && placeholder && (
        <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
          {placeholder}
        </div>
      )}
      {error && (
        <div className="bg-[var(--surface-elev)] w-full h-full flex items-center justify-center text-[var(--text-dim)]">
          Failed to load image
        </div>
      )}
    </div>
  );
};

// Memoized species card component
export const MemoizedSpeciesCard = React.memo(
  ({ species, onClick, className }) => {
    return (
      <div
        className={`cursor-pointer transition-transform hover:scale-105 ${className}`}
        onClick={() => onClick(species)}
      >
        <LazyImage
          src={species.getPrimaryImage()?.url}
          alt={species.getDisplayName()}
          className="w-full h-48 object-cover rounded-t-lg"
          placeholder={<div className="text-sm">Loading...</div>}
        />
        <div className="p-3">
          <h3 className="font-medium text-[var(--text)] truncate">
            {species.getDisplayName()}
          </h3>
          <p className="text-sm text-gray-500 italic truncate">
            {species.scientificName}
          </p>
          <p className="text-xs text-gray-400 mt-1">{species.family}</p>
        </div>
      </div>
    );
  }
);

// Bundle size analyzer utility
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Bundle analyzer available - run npm run analyze");
  }
};

// Performance monitoring utilities
export class PerformanceMonitor {
  static marks = new Map();

  static mark(name) {
    this.marks.set(name, performance.now());
  }

  static measure(name, startMark) {
    const startTime = this.marks.get(startMark);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`${name}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  }

  static measureComponent(WrappedComponent, componentName) {
    return function MeasuredComponent(props) {
      useEffect(() => {
        PerformanceMonitor.mark(`${componentName}-mount-start`);
        return () => {
          PerformanceMonitor.measure(
            `${componentName} mount time`,
            `${componentName}-mount-start`
          );
        };
      }, []);

      return <WrappedComponent {...props} />;
    };
  }
}

// Memory usage monitoring
export const useMemoryMonitor = (interval = 5000) => {
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    if (!performance.memory) return;

    const updateMemoryInfo = () => {
      setMemoryInfo({
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
      });
    };

    updateMemoryInfo();
    const intervalId = setInterval(updateMemoryInfo, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return memoryInfo;
};

// Code splitting utilities
export const createLazyComponent = (importFn, fallback = null) => {
  const LazyComponent = React.lazy(importFn);

  return function SuspendedComponent(props) {
    return (
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
};

// Service worker utilities for caching
export const registerServiceWorker = () => {
  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
};

// Accessibility utilities
export const useA11y = () => {
  const announceToScreenReader = useCallback((message) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  const trapFocus = useCallback((element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeydown = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener("keydown", handleKeydown);
    firstElement?.focus();

    return () => {
      element.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return {
    announceToScreenReader,
    trapFocus,
  };
};

export default {
  useDebounce,
  useThrottle,
  useIntersectionObserver,
  useVirtualScrolling,
  useLocalStorage,
  useAsync,
  LazyImage,
  MemoizedSpeciesCard,
  PerformanceMonitor,
  useMemoryMonitor,
  createLazyComponent,
  registerServiceWorker,
  useA11y,
};
