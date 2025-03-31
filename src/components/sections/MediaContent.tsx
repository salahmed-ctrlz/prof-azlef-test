import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const MediaContent = () => {
  const sectionRef = useRef(null);
  const bgAnimationRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  
  // Background animation effect
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Handle parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgAnimationRef.current) return;
      
      const elements = bgAnimationRef.current.querySelectorAll('.bg-element');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      elements.forEach((el, i) => {
        const depth = 1 + (i % 3) * 0.5;
        const moveX = (clientX - innerWidth / 2) / (50 / depth);
        const moveY = (clientY - innerHeight / 2) / (50 / depth);
        
        (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Animation variants
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5 }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        delay: 0.3 + (i * 0.2),
        ease: [0.25, 0.1, 0.25, 1]
      }
    }),
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="media" 
      className="relative py-20 md:py-28 overflow-hidden"
      ref={sectionRef}
    >
      {/* Enhanced Background with Hero-like styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-dark via-brown to-brown-dark overflow-hidden">
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
        <div ref={bgAnimationRef} className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-element bg-gold"
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-gold-light text-sm tracking-wider uppercase font-medium mb-3">Educational Resources</span>
          <h2 className="font-balooBhaijaan text-4xl md:text-5xl lg:text-6xl mb-4 text-gold text-shadow">Media & Content</h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-1 bg-gold mx-auto rounded-full mb-6"
          />
          <p className="mt-4 max-w-2xl mx-auto text-beige text-lg">
            Engaging resources to enhance your learning journey
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Spotify Podcast Section - Enhanced Glass Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/20 to-gold/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"></div>
            
            <div className="relative backdrop-blur-md bg-brown-dark/40 p-8 rounded-2xl border border-gold/10 shadow-lg overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#1DB954]/10 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gold/10 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div className="flex items-center mb-6 relative">
                <div className="w-14 h-14 bg-[#1DB954]/20 rounded-full flex items-center justify-center shrink-0 mr-4 shadow-inner group-hover:shadow-[#1DB954]/30 transition-all duration-300">
                  <i className="fab fa-spotify text-[#1DB954] text-2xl"></i>
                </div>
                <h3 className="font-balooBhaijaan text-2xl md:text-3xl text-gold">Educational Podcast</h3>
              </div>
              
              <div className="w-full rounded-xl overflow-hidden bg-brown-light/10 p-4 backdrop-blur-sm border border-white/5 shadow-inner relative">
                {/* Spotify Embed */}
                <div className="relative pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://open.spotify.com/embed/show/7j69gCbybm3nCIVmf84C0u" 
                    frameBorder="0" 
                    allow="encrypted-media; autoplay; clipboard-write; fullscreen; picture-in-picture"
                    title="Spotify Podcast"
                  ></iframe>
                </div>
                
                <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h4 className="text-gold font-balooBhaijaan">Latest Episode</h4>
                    <p className="text-beige-light text-sm">Strategies for effective language learning</p>
                  </div>
                  
                  <div className="relative mt-3 sm:mt-0">
                    <motion.a 
                      href="https://open.spotify.com/show/7j69gCbybm3nCIVmf84C0u" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gradient-to-r from-[#1DB954]/30 to-[#1DB954]/20 hover:from-[#1DB954]/40 hover:to-[#1DB954]/30 text-[#1DB954] px-5 py-2 rounded-full text-sm inline-flex items-center transition-all duration-300 border border-[#1DB954]/20"
                      onMouseEnter={() => setHoveredButton('spotify')}
                      onMouseLeave={() => setHoveredButton(null)}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 15px rgba(29, 185, 84, 0.3)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fab fa-spotify mr-2"></i> Follow on Spotify
                    </motion.a>
                    
                    {/* Tooltip */}
                    {hoveredButton === 'spotify' && (
                      <motion.div 
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#1DB954] text-white text-xs py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        Listen to educational content
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1DB954]"></div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-balooBhaijaan text-gold mb-3">Why Listen?</h4>
                <ul className="space-y-3 text-beige">
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-[#1DB954]/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <i className="fas fa-check text-[#1DB954] text-sm"></i>
                    </div>
                    <span>Practical language learning techniques</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-[#1DB954]/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <i className="fas fa-check text-[#1DB954] text-sm"></i>
                    </div>
                    <span>Tips for improving pronunciation and vocabulary</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="bg-[#1DB954]/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <i className="fas fa-check text-[#1DB954] text-sm"></i>
                    </div>
                    <span>Insights from experienced educators</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* YouTube Content Section - Enhanced Glass Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/20 to-gold/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-105"></div>
            
            <div className="relative backdrop-blur-md bg-brown-dark/40 p-8 rounded-2xl border border-gold/10 shadow-lg overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#FF0000]/10 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gold/10 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div className="flex items-center mb-6 relative">
                <div className="w-14 h-14 bg-[#FF0000]/20 rounded-full flex items-center justify-center shrink-0 mr-4 shadow-inner group-hover:shadow-[#FF0000]/30 transition-all duration-300">
                  <i className="fab fa-youtube text-[#FF0000] text-2xl"></i>
                </div>
                <h3 className="font-balooBhaijaan text-2xl md:text-3xl text-gold">YouTube Channel</h3>
              </div>
              
              <div className="w-full rounded-xl overflow-hidden bg-brown-light/10 p-4 backdrop-blur-sm border border-white/5 shadow-inner relative">
                {/* YouTube Embed */}
                <div className="relative pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/DUmIq1l_yXY" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h4 className="text-gold font-balooBhaijaan">Featured Video</h4>
                    <p className="text-beige-light text-sm">Interactive teaching techniques demonstration</p>
                  </div>
                  
                  <div className="relative mt-3 sm:mt-0">
                    <motion.a 
                      href="https://www.youtube.com/@ensc_students/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-gradient-to-r from-[#FF0000]/30 to-[#FF0000]/20 hover:from-[#FF0000]/40 hover:to-[#FF0000]/30 text-[#FF0000] px-5 py-2 rounded-full text-sm inline-flex items-center transition-all duration-300 border border-[#FF0000]/20"
                      onMouseEnter={() => setHoveredButton('youtube')}
                      onMouseLeave={() => setHoveredButton(null)}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <i className="fab fa-youtube mr-2"></i> Subscribe
                    </motion.a>
                    
                    {/* Tooltip */}
                    {hoveredButton === 'youtube' && (
                      <motion.div 
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#FF0000] text-white text-xs py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        Watch educational videos
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#FF0000]"></div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-balooBhaijaan text-gold mb-3">Video Content</h4>
                <ul className="space-y-3 text-beige">
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-[#FF0000]/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <i className="fas fa-video text-[#FF0000] text-sm"></i>
                    </div>
                    <span>Educational tutorials and demonstrations</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="bg-[#FF0000]/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <i className="fas fa-video text-[#FF0000] text-sm"></i>
                    </div>
                    <span>Interactive lesson examples</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="bg-[#FF0000]/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <i className="fas fa-video text-[#FF0000] text-sm"></i>
                    </div>
                    <span>Student success stories and testimonials</span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Call to Action - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="relative mx-auto max-w-3xl px-6 py-8 rounded-2xl overflow-hidden backdrop-blur-sm bg-brown-dark/40 border border-gold/10 shadow-lg">
            {/* Background glow effect */}
            <div className="absolute -inset-x-10 -top-10 h-40 bg-gradient-to-r from-[#1DB954]/20 via-gold/30 to-[#FF0000]/20 blur-2xl opacity-50"></div>
            
            <p className="relative z-10 text-xl text-beige mb-8 max-w-2xl mx-auto">
              Join over <span className="text-gold font-medium">25,000 learners</span> who follow my educational content across platforms.
              Stay updated with the latest podcast episodes and video tutorials.
            </p>
            
            <div className="relative z-10 flex flex-wrap justify-center gap-5">
              <div className="relative">
                <motion.button
                  className="bg-gradient-to-r from-[#1DB954]/20 to-[#1DB954]/10 hover:from-[#1DB954]/30 hover:to-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30 px-6 py-3.5 rounded-full transition-all hover:shadow-xl flex items-center gap-2 font-medium relative overflow-hidden group"
                  onClick={() => window.open("https://open.spotify.com/show/7j69gCbybm3nCIVmf84C0u", "_blank")}
                  onMouseEnter={() => setHoveredButton('spotify-cta')}
                  onMouseLeave={() => setHoveredButton(null)}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(29, 185, 84, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button glow effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1DB954]/0 via-[#1DB954]/30 to-[#1DB954]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
                  <i className="fab fa-spotify text-lg"></i> 
                  <span className="relative z-10">Follow Podcast</span>
                </motion.button>
                
                {/* Enhanced tooltip */}
                {hoveredButton === 'spotify-cta' && (
                  <motion.div 
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#1DB954] text-white text-xs py-2 px-3 rounded-lg shadow-lg whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    Get notified about new episodes
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1DB954]"></div>
                  </motion.div>
                )}
              </div>
              
              <div className="relative">
                <motion.button
                  className="bg-gradient-to-r from-[#FF0000]/20 to-[#FF0000]/10 hover:from-[#FF0000]/30 hover:to-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30 px-6 py-3.5 rounded-full transition-all hover:shadow-xl flex items-center gap-2 font-medium relative overflow-hidden group"
                  onClick={() => window.open("https://www.youtube.com/@ensc_students/", "_blank")}
                  onMouseEnter={() => setHoveredButton('youtube-cta')}
                  onMouseLeave={() => setHoveredButton(null)}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button glow effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF0000]/0 via-[#FF0000]/30 to-[#FF0000]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  
                  <i className="fab fa-youtube text-lg"></i> 
                  <span className="relative z-10">Subscribe to Channel</span>
                </motion.button>
                
                {/* Enhanced tooltip */}
                {hoveredButton === 'youtube-cta' && (
                  <motion.div 
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#FF0000] text-white text-xs py-2 px-3 rounded-lg shadow-lg whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    Never miss a new video
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#FF0000]"></div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MediaContent;