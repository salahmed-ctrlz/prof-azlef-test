import resume from '@/assets/Azlef-Iskander-Resume.pdf';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/lib/data';
import { Menu, X, Download, Home, User, GraduationCap, Camera, Video, Mail, Linkedin, Instagram, Youtube, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
  
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };
  
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      } 
    },
  };
  
  const itemVariants = {
    closed: { 
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.1
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    }
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
          className={`fixed z-50 flex items-center justify-center w-10 h-10 rounded-full 
            bg-brown text-gold transition-all duration-300 ${scrolled ? 'top-2.5 right-4' : 'top-5 right-4'}`}
          onClick={onClose}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
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
            onClick={onClose}
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
              z-50 flex flex-col shadow-xl border-l border-gold/20 md:hidden transform-gpu"
            style={{ willChange: 'transform' }}
          >
            <div className="flex justify-between items-center px-5 py-4 border-b border-gold/10">
              <h2 className="font-cookie text-2xl text-gold">Iskandar Azlef</h2>
              <motion.button
                className="text-gold hover:text-gold-light w-10 h-10 flex items-center justify-center
                  rounded-full hover:bg-brown-light/20 transition-colors"
                onClick={onClose}
                aria-label="Close menu"
                whileTap={{ scale: 0.95 }}
                style={{ touchAction: 'manipulation' }}
              >
                <X size={20} />
              </motion.button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-5 overscroll-contain">
              <nav className="flex flex-col space-y-5">
                {updatedNavLinks.map((link, index) => {
                  const sectionId = link.path.replace('#', '');
                  return (
                    <motion.a
                      key={index}
                      variants={itemVariants}
                      custom={index}
                      href={link.path}
                      className="text-beige hover:text-gold font-balooBhaijaan text-xl
                        relative overflow-hidden group flex items-center py-1.5"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(sectionId);
                      }}
                      style={{ touchAction: 'manipulation' }}
                    >
                      <span className="w-9 h-9 mr-4 rounded-full bg-gold/10 flex items-center justify-center transform-gpu">
                        {getSectionIcon(sectionId)}
                      </span>
                      <span className="relative z-10">{link.name}</span>
                    </motion.a>
                  );
                })}
              </nav>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="mt-12 pt-6 border-t border-gold/10"
              >
                <p className="text-beige-light text-sm mb-4 font-medium">Download my CV</p>
                <a
                  href={resume}
                  className="bg-gold/10 hover:bg-gold text-brown font-semibold px-6 py-3 rounded-full 
                    transition-all hover:shadow-md hover:shadow-gold/20 inline-flex items-center w-full justify-center"
                  download="Azlef-Iskander-Resume.pdf"
                  onClick={(e) => {
                    e.preventDefault();
                    const link = document.createElement('a');
                    link.href = resume;
                    link.download = 'Azlef-Iskander-Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
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