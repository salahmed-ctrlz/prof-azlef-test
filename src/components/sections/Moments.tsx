import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gallery1 from "@/assets/gallery-1.JPG";
import gallery2 from "@/assets/gallery-2.JPG";
import gallery3 from "@/assets/gallery-3.JPG";
import gallery4 from "@/assets/gallery-4.JPG";
import gallery5 from "@/assets/gallery-5.JPG";
import gallery6 from "@/assets/gallery-6.JPG";
import gallery7 from "@/assets/hero-image.JPG";

// Graduation ceremony images
const graduationImages = [
  { src: gallery1},
  { src: gallery2},
  { src: gallery7},
  { src: gallery4},
  { src: gallery5},
  { src: gallery6},
  { src: gallery3}
];

const Moments = () => {
  const sectionRef = useRef(null);
  const bgAnimationRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [items] = useState(graduationImages);
  const controls = useAnimation();
  
  // Start background animation when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        transition: { duration: 1.5 }
      });
    }
  }, [isInView, controls]);

  // Handle subtle background movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!bgAnimationRef.current) return;
      
      const elements = bgAnimationRef.current.querySelectorAll('.bg-element');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      elements.forEach((el, i) => {
        const depth = 0.5 + (i % 3) * 0.2;
        const moveX = (clientX - innerWidth / 2) / (80 / depth);
        const moveY = (clientY - innerHeight / 2) / (80 / depth);
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Function to get the class for each carousel item based on its position
  const getPositionClass = (index) => {
    const totalItems = items.length;
    const position = (index - activeIndex + totalItems) % totalItems;
    
    // Map position to class names
    switch (position) {
      case 0: return "active"; // Center (active)
      case 1: return "next"; // Right of center
      case 2: return "far-next"; // Far right
      case totalItems - 1: return "prev"; // Left of center
      case totalItems - 2: return "far-prev"; // Far left
      default: return "hidden"; // Hide other items
    }
  };
  
  // Navigate to previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };
  
  // Navigate to next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % items.length
    );
  };
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Generate subtle background elements
  const generateBgElements = (count) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      size: Math.random() * 40 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.04 + 0.01,
      delay: Math.random() * 2,
      duration: Math.random() * 20 + 15,
    }));
  };

  const bgElements = generateBgElements(8);

  return (
    <section 
      id="moments" 
      className="relative py-20 md:py-28 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background similar to About section */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-light/90 to-brown-light/80 overflow-hidden">
        <div ref={bgAnimationRef} className="absolute inset-0">
          {bgElements.map((el) => (
            <motion.div
              key={el.id}
              className="absolute rounded-full bg-element bg-gold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={controls}
              style={{
                width: `${el.size}px`,
                height: `${el.size}px`,
                left: `${el.x}%`,
                top: `${el.y}%`,
                opacity: el.opacity,
                filter: 'blur(30px)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-gold/80 text-sm tracking-wider uppercase font-medium mb-2">Gallery</span>
          <h2 className="font-balooBhaijaan text-4xl md:text-5xl lg:text-6xl mb-4 text-gold">Memorable Moments</h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-1 bg-gold/70 mx-auto rounded-full mb-6"
          />
          <p className="mt-4 max-w-2xl mx-auto text-beige text-lg leading-relaxed">
            A visual journey through my experiences as an educator and content creator
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-16"
        >
          {/* Enhanced 3D Carousel Gallery */}
          <div className="relative h-[500px] w-full mx-auto">
            {/* Left Arrow */}
            <motion.button 
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 bg-brown/60 hover:bg-brown/80 text-gold rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gold/10"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(121, 85, 72, 0.9)" }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-chevron-left"></i>
            </motion.button>
            
            {/* Carousel Items */}
            <div className="relative h-full w-full flex items-center justify-center">
              {items.map((image, index) => {
                const positionClass = getPositionClass(index);
                
                return (
                  <motion.div 
                    key={index} 
                    className={`absolute transition-all duration-700 rounded-xl overflow-hidden shadow-lg cursor-pointer ${
                      positionClass === "active" ? "z-30" : 
                      positionClass === "next" || positionClass === "prev" ? "z-20" : 
                      positionClass === "far-next" || positionClass === "far-prev" ? "z-10" : "hidden"
                    }`}
                    style={{
                      width: positionClass === "active" ? "380px" : 
                             positionClass === "next" || positionClass === "prev" ? "320px" : 
                             positionClass === "far-next" || positionClass === "far-prev" ? "260px" : "0",
                      height: positionClass === "active" ? "480px" : 
                              positionClass === "next" || positionClass === "prev" ? "400px" : 
                              positionClass === "far-next" || positionClass === "far-prev" ? "340px" : "0",
                      left: positionClass === "active" ? "50%" : 
                            positionClass === "next" ? "65%" : 
                            positionClass === "far-next" ? "80%" : 
                            positionClass === "prev" ? "35%" : 
                            positionClass === "far-prev" ? "20%" : "50%",
                      transform: "translateX(-50%)",
                      opacity: positionClass === "active" ? 1 : 
                              positionClass === "next" || positionClass === "prev" ? 0.8 : 
                              positionClass === "far-next" || positionClass === "far-prev" ? 0.6 : 0,
                      filter: positionClass === "active" ? "blur(0)" : 
                              positionClass === "next" || positionClass === "prev" ? "blur(1px)" : 
                              positionClass === "far-next" || positionClass === "far-prev" ? "blur(2px)" : "blur(0)",
                    }}
                    onClick={() => positionClass !== "active" && setActiveIndex(index)}
                    
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Gradient overlay for better text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-transparent to-transparent"></div>
                      
                      {/* Image caption at bottom */}
                      {positionClass === "active" && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 p-4 text-white"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="font-balooBhaijaan text-lg text-gold">{image.alt}</div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Right Arrow */}
            <motion.button 
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 bg-brown/60 hover:bg-brown/80 text-gold rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gold/10"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(121, 85, 72, 0.9)" }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-chevron-right"></i>
            </motion.button>
          </div>
          
          {/* Carousel navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {items.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-gold scale-125' : 'bg-gold/30 hover:bg-gold/50'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === activeIndex && (
                  <motion.span 
                    className="absolute inset-0 rounded-full bg-gold/30"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* View All Images Button */}
          <div className="text-center mt-12">
            <a href="https://www.instagram.com/ensc_students/" target="_blank" rel="noopener noreferrer">
              <motion.button 
                className="relative overflow-hidden bg-gold/90 hover:bg-gold text-brown px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button background glow effect */}
                <span className="absolute inset-0 w-full h-full bg-white/20 flex items-center justify-center blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3 font-medium">
                  <i className="fas fa-images text-lg"></i> 
                  View All Moments
                  <motion.i 
                    className="fas fa-chevron-right text-xs" 
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
              </motion.button>
            </a>
            
            <p className="text-beige-light mt-4 text-sm">Browse through my complete collection of educational journey</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Moments;