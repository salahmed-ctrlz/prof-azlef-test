import { useState, useEffect, useRef } from 'react';
import { ArrowUp, Instagram, Linkedin, Mail, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update time every second for better accuracy
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Get user's location with a more robust approach
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLocationLoading(true);
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Try to get a more readable location name
        if (userTimezone) {
          const locationParts = userTimezone.split('/');
          if (locationParts.length > 1) {
            const cityName = locationParts.pop()?.replace(/_/g, ' ') || '';
            setLocation(cityName);
          } else {
            setLocation(userTimezone);
          }
        }
      } catch (error) {
        console.error('Error getting timezone:', error);
        setLocation('');
      } finally {
        setLocationLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTooltipShow = (id: string) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setActiveTooltip(id);
  };

  const handleTooltipHide = () => {
    // Small delay to prevent flickering when moving between elements
    tooltipTimeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 100);
  };

  const currentYear = new Date().getFullYear();
  
  // Format time with seconds for more dynamic display
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: true 
  });
  
  // Format date with better internationalization
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Social links data for better maintainability
  const socialLinks = [
    {
      id: 'instagram',
      icon: <Instagram size={20} />,
      href: 'https://instagram.com/prof.azlef/',
      label: 'Follow on Instagram',
      animation: { rotate: 5 }
    },
    {
      id: 'linkedin',
      icon: <Linkedin size={20} />,
      href: 'https://linkedin.com/in/iskander-azlef',
      label: 'Connect on LinkedIn',
      animation: { rotate: -5 }
    },
    {
      id: 'email',
      icon: <Mail size={20} />,
      href: 'mailto:azlef.iskandar@gmail.com',
      label: 'Send an email',
      animation: { rotate: 5 }
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-brown to-brown-dark py-12 overflow-hidden">
      {/* Decorative background elements - improved visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-10 w-40 h-40 bg-gold/15 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-1/3 w-60 h-60 bg-gold/15 rounded-full blur-3xl"></div>
        <div className="absolute left-1/3 bottom-10 w-50 h-50 bg-gold/15 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Back to top button with enhanced visibility */}
          <div className="relative mb-8 group">
            <motion.button 
              onClick={scrollToTop}
              className="bg-gradient-to-r from-gold/50 to-gold/40 text-white hover:from-gold/70 hover:to-gold/60 rounded-full p-3.5 transition-all duration-300 shadow-md hover:shadow-gold/30 border border-gold/30 relative overflow-hidden group"
              aria-label="Scroll to top"
              whileHover={{ y: -4 }}
              whileTap={{ y: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onMouseEnter={() => handleTooltipShow('top')}
              onMouseLeave={handleTooltipHide}
            >
              {/* Button glow effect */}
              <span className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-gold/40 to-gold/10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></span>
              <ArrowUp size={22} className="relative z-10" />
            </motion.button>
            
            {/* Enhanced tooltip with better visibility */}
            <AnimatePresence>
              {activeTooltip === 'top' && (
                <motion.div 
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brown-dark/95 to-brown/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-gold/20 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Back to top
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-t-4 border-l-4 border-r-4 border-transparent border-t-brown-dark/95"></span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Modern time and location display with improved contrast */}
          <motion.div 
            className="mb-10 text-center bg-brown-dark/50 backdrop-blur-sm px-6 py-4 rounded-xl border border-gold/20 shadow-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Globe size={16} className="text-gold" />
              {locationLoading ? (
                <div className="h-5 w-40 bg-gold/20 animate-pulse rounded"></div>
              ) : (
                <p className="text-gold font-medium">{location ? `Your local time in ${location}` : 'Your local time'}</p>
              )}
            </div>
            <div className="relative text-white text-2xl font-medium tracking-wide font-mono">
              {formattedTime}
              <motion.span 
                className="absolute -right-2 top-0 text-gold text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                •
              </motion.span>
            </div>
            <div className="text-white/80 text-sm mt-1">{formattedDate}</div>
          </motion.div>
          
          {/* Social links with enhanced visibility */}
          <div className="flex space-x-6 md:space-x-8 mb-10">
            {socialLinks.map((link) => (
              <motion.div 
                key={link.id}
                className="relative"
                whileHover={{ scale: 1.15, ...link.animation }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onMouseEnter={() => handleTooltipShow(link.id)}
                onMouseLeave={handleTooltipHide}
              >
                <a 
                  href={link.href}
                  target={link.href.startsWith('mailto') ? '_self' : '_blank'} 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-12 w-12 bg-gradient-to-tr from-gold/40 to-gold/30 text-white hover:text-white rounded-full border border-gold/30 shadow-sm hover:shadow-gold/30 transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <span className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-gold/30 to-gold/10 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></span>
                  <span className="relative z-10">{link.icon}</span>
                </a>
                
                {/* Tooltip with improved visibility */}
                <AnimatePresence>
                  {activeTooltip === link.id && (
                    <motion.div 
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brown-dark/95 to-brown/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-gold/20 whitespace-nowrap"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-t-4 border-l-4 border-r-4 border-transparent border-t-brown-dark/95"></span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Footer text and attribution with improved visibility */}
          <div className="text-center max-w-lg mx-auto px-4">
            <p className="mb-3">
              <span className="relative inline-block group">
                <span className="text-white">Website by: </span>
                <motion.a 
                  href="https://salahmed-ctrlz.github.io/salaheddine-medkour-portfolio/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold font-medium relative px-1 py-0.5 rounded transition-all duration-300 inline-flex items-center"
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => handleTooltipShow('developer')}
                  onMouseLeave={handleTooltipHide}
                >
                  Medkour Salah Eddine
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-300"></span>
                </motion.a>
                
                <AnimatePresence>
                  {activeTooltip === 'developer' && (
                    <motion.div 
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gradient-to-r from-brown-dark/95 to-brown/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-gold/20 whitespace-nowrap z-10"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      Visit the portfolio of the website developer
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-t-4 border-l-4 border-r-4 border-transparent border-t-brown-dark/95"></span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </p>
            
            <motion.div 
              className="text-sm text-white/70 mt-6 pt-6 border-t border-gold/20"
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-1">© {currentYear} Azlef Iskandar. All rights reserved.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;