import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/lib/data';
import { Menu, X, Download, Home, User, GraduationCap, Camera, Video, Mail, Linkedin, Instagram, Youtube, Phone } from 'lucide-react';

interface MobileMenuProps {
  scrollToSection: (sectionId: string) => void;
}

const MobileMenu = ({ scrollToSection }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Updated navLinks to include media section if not already present
  const updatedNavLinks = navLinks.some(link => link.path === "#media") 
    ? navLinks 
    : [...navLinks.slice(0, 4), { name: "Media", path: "#media" }, ...navLinks.slice(4)];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to set scrolled state correctly on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const handleNavigation = (sectionId: string) => {
    scrollToSection(sectionId);
    closeMenu();
  };
  
  const menuVariants = {
    closed: { opacity: 0, scale: 0.95, x: '100%' },
    open: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      } 
    },
  };
  
  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3
      }
    })
  };

  // Get icon for each section
  const getSectionIcon = (sectionId: string) => {
    switch(sectionId) {
      case 'home': return <Home size={18} />;
      case 'about': return <User size={18} />;
      case 'services': return <GraduationCap size={18} />;
      case 'moments': return <Camera size={18} />;
      case 'media': return <Video size={18} />; // Added icon for media section
      case 'contact': return <Mail size={18} />;
      default: return <Home size={18} />;
    }
  };

  return (
    <>
      {/* Hamburger Button - Fixed position aligned with navbar */}
      <div className="md:hidden">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`fixed z-50 flex items-center justify-center w-10 h-10 rounded-full 
            bg-brown text-gold transition-all duration-300 ${scrolled ? 'top-2.5 right-4' : 'top-5 right-4'}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={20} />
        </motion.button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brown-dark/60 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 right-0 max-w-[85%] w-full bg-gradient-to-bl from-brown-dark to-brown
              z-50 flex flex-col shadow-xl border-l border-gold/20 md:hidden"
          >
            <div className="flex justify-between items-center px-5 py-4 border-b border-gold/10">
              <h2 className="font-cookie text-2xl text-gold">Iskandar Azlef</h2>
              <button
                className="text-gold hover:text-gold-light w-10 h-10 flex items-center justify-center
                  rounded-full hover:bg-brown-light/20 transition-all"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-5">
              <div className="flex flex-col space-y-5">
                {updatedNavLinks.map((link, index) => {
                  const sectionId = link.path.replace('#', '');
                  return (
                    <motion.a
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      href={link.path}
                      className="text-beige hover:text-gold font-balooBhaijaan text-xl transition-all
                        relative overflow-hidden group flex items-center py-1.5"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(sectionId);
                      }}
                    >
                      <span className="w-9 h-9 mr-4 rounded-full bg-gold/10 flex items-center justify-center">
                        {getSectionIcon(sectionId)}
                      </span>
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-300"></span>
                    </motion.a>
                  );
                })}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="mt-12 pt-6 border-t border-gold/10"
              >
                <p className="text-beige-light text-sm mb-4 font-medium">Download my CV</p>
                <a
                  href="/assets/Azlef-Iskander-Resume.pdf"
                  className="bg-gold/90 hover:bg-gold text-brown font-semibold px-6 py-3 rounded-full 
                    transition-all hover:shadow-md hover:shadow-gold/20 inline-flex items-center w-full justify-center"
                  download="Azlef-Iskander-Resume.pdf"
                  onClick={(e) => {
                    // For local development, you might need to handle this differently
                    // This ensures the file is downloaded from the correct path
                    try {
                      const link = document.createElement('a');
                      link.href = '/src/assets/Azlef-Iskander-Resume.pdf';
                      link.download = 'Azlef-Iskander-Resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      e.preventDefault();
                    } catch (error) {
                      console.error('Download failed:', error);
                    }
                  }}
                >
                  <Download size={18} className="mr-2" />
                  Resume
                </a>
              </motion.div>
            </div>
            
            <div className="p-6 border-t border-gold/10 bg-brown-dark/30">
              <p className="text-beige-light text-sm mb-4 font-medium">Connect with me</p>
              <div className="flex justify-between">
                {[
                  { icon: <Linkedin size={18} />, url: "https://linkedin.com/in/iskander-azlef", label: "LinkedIn" },
                  { icon: <Instagram size={18} />, url: "https://instagram.com/prof.azlef/", label: "Instagram" },
                  { icon: <Youtube size={18} />, url: "https://www.youtube.com/@ensc_students/", label: "YouTube" },
                  { icon: <Phone size={18} />, url: "tel:+213558502936", label: "Call" }
                ].map((social, index) => (
                  <motion.a 
                    key={social.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    href={social.url} 
                    className="flex flex-col items-center space-y-1.5"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gold/20 hover:bg-gold/30
                      text-gold hover:text-gold-light transition-all hover:scale-110">
                      {social.icon}
                    </div>
                    <span className="text-xs text-beige-light">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;