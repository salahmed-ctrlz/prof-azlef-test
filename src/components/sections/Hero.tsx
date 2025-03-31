import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { letterByLetter, letter, wordReveal, word, staggerContainer, staggerItem } from "@/lib/animations";
import heroImage from "../../assets/hero-image.png";
import resume from '@/assets/Azlef-Iskander-Resume.pdf'; // Import the resume file

const Hero = () => {
  const backgroundControls = useAnimation();
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Effect for parallax background movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!particlesRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate movement based on mouse position
      const moveX = (clientX - innerWidth / 2) / 25;
      const moveY = (clientY - innerHeight / 2) / 25;
      
      // Apply subtle parallax effect to background
      backgroundControls.start({
        x: moveX,
        y: moveY,
        transition: { type: "spring", stiffness: 75, damping: 15 }
      });
      
      // Apply effect to particles
      const particles = particlesRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const depth = 1 + (index % 3) * 0.5; // Different depths for particles
        const htmlParticle = particle as HTMLElement;
        htmlParticle.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [backgroundControls]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const downloadResume = async () => {
    try {
      const response = await fetch(resume); // Fetch the resume file
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob(); // Convert response to Blob
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
      link.href = url;
      link.download = 'Azlef-Iskander-Resume.pdf';
      
      // Append, click, and remove
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Release the Blob URL
        showToast("Resume downloaded successfully!");
      }, 100);
    } catch (error) {
      console.error("Error downloading resume:", error);
      showToast("Failed to download resume. Please try again.", "error");
    }
  };
  
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      document.body.removeChild(existingToast);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center toast-notification ${
      type === 'success' ? 'bg-gold text-brown' : 'bg-red-500 text-white'
    }`;
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Set icon based on type
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon} mr-2"></i> ${message}`;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Add fade-in effect
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 500);
    }, 3000);
  };

  // Generate particles for enhanced background
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      delay: Math.random() * 5,
      duration: Math.random() * 20 + 15,
      blur: Math.random() * 2 + 1,
    }));
  };

  const particles = generateParticles(25);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-10 md:pt-16"
    >
      {/* Enhanced Background with Gradients and Particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-brown-dark via-brown to-brown-light overflow-hidden">
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 70% 60%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 40% 80%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
              'radial-gradient(circle at 60% 20%, rgba(212, 163, 115, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Particles container */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full particle bg-gold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: particle.opacity, 
                scale: 1,
                x: [0, 10, -10, 5, -5, 0],
                y: [0, -10, 5, -5, 10, 0],
              }}
              transition={{
                opacity: { duration: 1, delay: particle.delay },
                scale: { duration: 1, delay: particle.delay },
                x: { 
                  duration: particle.duration, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                y: { 
                  duration: particle.duration * 1.2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                filter: `blur(${particle.blur}px)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-2 md:py-8 z-10 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8 items-center">
          {/* Hero Image - Larger on desktop, same on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, type: "spring", stiffness: 50 }}
            className="order-1 lg:order-2 lg:col-span-6 flex justify-center mb-4 lg:mb-0"
          >
            <div className="relative w-full max-w-[250px] sm:max-w-[300px] lg:max-w-none lg:w-[90%] xl:w-[85%] flex justify-center">
              <motion.img
                src={heroImage}
                alt="Iskandar Azlef"
                className="w-full h-auto object-contain object-center"
                style={{
                  filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3))",
                  maxHeight: "70vh",
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              />
              
              {/* Light glow effect behind image on desktop */}
              <div className="absolute -inset-4 bg-gold/10 rounded-full filter blur-xl opacity-0 lg:opacity-40 -z-10"></div>
            </div>
          </motion.div>
          
          {/* Text Content */}
          <div className="order-2 lg:order-1 lg:col-span-6 z-10 mt-2 lg:mt-0">
            <motion.h1
              variants={letterByLetter}
              initial="hidden"
              animate="visible"
              className="font-cookie text-4xl sm:text-5xl md:text-7xl text-gold mb-2 md:mb-4 text-shadow text-center lg:text-left"
            >
              {Array.from("Iskandar Azlef").map((char, index) => (
                <motion.span key={index} variants={letter} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="h-1 bg-gold mb-3 md:mb-4 rounded-full mx-auto lg:mx-0"
            />

            <motion.div
              variants={wordReveal}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl mb-3 md:mb-4 text-beige font-balooBhaijaan leading-relaxed text-center lg:text-left"
            >
              {["Welcome", "to", "a", "world", "where", "every", "lesson", "sparks", "inspiration"].map((w, index) => (
                <motion.span key={index} variants={word} className="inline-block mr-2">
                  {w}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mb-4 md:mb-6 text-beige-light leading-relaxed tracking-wide text-center lg:text-left"
            >
              <motion.p variants={staggerItem} custom={0} className="mb-2">
                I'm a dedicated educator transforming classrooms into creative
                learning hubs.
              </motion.p>
              <motion.p variants={staggerItem} custom={1}>
                With a passion for innovative teaching methods and
                student engagement, I help learners discover their potential.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <div className="tooltip">
                <motion.a 
                  href="#contact" 
                  className="cta"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Book Me &nbsp;</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </motion.a>
                <span className="tooltip-text">Schedule a meeting with me</span>
              </div>

              <div className="tooltip">
                <motion.button
                  onClick={downloadResume}
                  className="resume-download-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-download download-icon mr-2"></i>
                  <span>Download Resume</span>
                </motion.button>
                <span className="tooltip-text">Get my curriculum vitae</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Learn More Button - Positioned at the bottom with proper spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-auto pt-8 pb-4 lg:pb-8 flex justify-center z-10"
        >
          <motion.a
            href="#about"
            className="inline-flex flex-col items-center text-beige hover:text-gold transition-colors group"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            whileHover={{ y: -3 }}
            whileTap={{ y: 2 }}
          >
            <span className="mb-2 font-balooBhaijaan">Learn More</span>
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-all">
              <i className="fas fa-chevron-down text-gold animate-bounce"></i>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;