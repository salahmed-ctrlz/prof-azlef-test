import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

const Navbar = ({ scrollToSection }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navbarRef = useRef<HTMLElement>(null);
  
  // Updated navLinks to include media section if not already present
  const updatedNavLinks = navLinks.some(link => link.path === "#media") 
    ? navLinks 
    : [...navLinks.slice(0, 4), { name: "Media", path: "#media" }, ...navLinks.slice(4)];

  // Handle scroll event for navbar appearance and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Find which section is currently in view
      const sections = [
        "home",
        "about",
        "services",
        "moments",
        "media",
        "contact",
      ];

      // Improved section detection with better viewport calculation
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navbarHeight = navbarRef.current?.offsetHeight || 0;
          
          // Consider a section in view when it's top portion is visible
          if (rect.top <= navbarHeight + 50 && rect.bottom > navbarHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to properly set active section on load
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navbarRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "py-2 bg-brown-dark/95 shadow-lg backdrop-blur-md"
          : "py-4 bg-transparent"
      )}
      style={{ height: scrolled ? '60px' : '72px' }}  // Fixed height to prevent layout shifts
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo/Brand */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="font-cookie text-3xl text-gold hover:text-gold-light transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Prof Azlef
          </motion.a>

          {/* Desktop Navigation - Hidden on mobile (mobile menu handled separately) */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-1 lg:space-x-3">
              {updatedNavLinks.map((link, index) => {
                const sectionId = link.path.replace("#", "");
                return (
                  <li key={index}>
                    <motion.a
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(sectionId);
                      }}
                      className={cn(
                        "relative px-3 py-2 font-balooBhaijaan text-base transition-all rounded-md group",
                        activeSection === sectionId
                          ? "text-gold"
                          : "text-beige hover:text-gold-light"
                      )}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <span className="relative z-10">{link.name}</span>
                      
                      {/* Active indicator */}
                      {activeSection === sectionId && (
                        <motion.span
                          className="absolute inset-0 bg-gold/10 rounded-md -z-0"
                          layoutId="activeSection"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Bottom line indicator */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 right-0 mx-auto w-12 h-0.5 bg-gold rounded-full transform origin-center transition-all duration-300",
                          activeSection === sectionId
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75"
                        )}
                      />
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;