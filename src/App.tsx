import { Switch, Route } from "wouter";
import { Suspense, lazy, useEffect, useState } from "react";
// Import the CSS file
import "./index.css";
import ScrollProgress from './components/ScrollProgress';

// Lazy load components
const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Enhanced hash location hook for GitHub Pages
const useHashLocation = () => {
  // Get the hash location without the # symbol, or default to "/"
  const getHashPath = () => {
    const hash = window.location.hash;
    // If hash is empty or just "#", return "/"
    if (!hash || hash === "#") return "/";
    // Otherwise, remove the # and return the path
    return hash.substring(1);
  };
  
  const [location, setLocation] = useState(getHashPath());

  useEffect(() => {
    // Update location when hash changes
    const handleHashChange = () => {
      const newPath = getHashPath();
      console.log("Hash changed to:", newPath);
      setLocation(newPath);
    };
    
    // Set initial location and force a hash if none exists
    if (!window.location.hash) {
      window.location.hash = "/";
    } else {
      handleHashChange();
    }
    
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigate function that updates the hash
  const navigate = (to: string) => {
    console.log("Navigating to:", to);
    window.location.hash = to;
  };

  return [location, navigate] as const;
};

// Loading component with optimized animation
const LoadingSpinner = () => (
  <div className="min-h-screen bg-brown flex items-center justify-center">
    <div 
      className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin transform-gpu"
      style={{ willChange: 'transform' }}
    />
  </div>
);

function App() {
  // Call hooks at the top level, in the same order on every render
  const [isLoading, setIsLoading] = useState(true);
  const [location] = useHashLocation();

  useEffect(() => {
    // Simulate minimum loading time to ensure fonts are loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app-container">
      <Suspense fallback={<LoadingSpinner />}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <ScrollProgress />
    </div>
  );
}

export default App;
