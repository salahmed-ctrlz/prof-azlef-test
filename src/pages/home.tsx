import { useCallback, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MobileMenu from "@/components/layout/MobileMenu";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Moments from "@/components/sections/Moments";
import MediaContent from "@/components/sections/MediaContent";
import Contact from "@/components/sections/Contact";
import { scrollToSection as utilsScrollToSection } from "@/lib/utils";

const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Create a single scrollToSection function for both Navbar and MobileMenu
  const scrollToSection = useCallback((sectionId: string) => {
    utilsScrollToSection(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scrollToSection={scrollToSection} />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={toggleMobileMenu}
      />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Moments />
        <MediaContent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
