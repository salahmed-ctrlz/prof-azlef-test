import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { textLineReveal, textRevealFromBottom } from '@/lib/animations';

const servicesData = [
  {
    icon: "fas fa-laptop",
    title: "Online English Teaching",
    description: "Interactive virtual classes using modern teaching methods focused on practical language skills.",
    details: [
      "Personalized learning plans",
      "Interactive digital resources",
      "Real-time feedback and progress tracking"
    ]
  },
  {
    icon: "fas fa-chalkboard",
    title: "Part-Time English Teaching",
    description: "Flexible in-person teaching arrangements for schools, institutes, and private tutoring.",
    details: [
      "Engaging classroom activities",
      "Customized curricula",
      "Comprehensive assessments"
    ]
  },
  {
    icon: "fas fa-language",
    title: "Translations & Transcriptions",
    description: "Professional translation services between English, Arabic, and French for academic and business content.",
    details: [
      "Academic paper translations",
      "Business document localization",
      "Educational material adaptations"
    ]
  },
  {
    icon: "fas fa-podcast",
    title: "Podcasts & Content Creation",
    description: "Educational content development including podcasts, social media content, and learning materials.",
    details: [
      "Educational podcast production",
      "Social media content strategies",
      "Interactive learning resources"
    ]
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgAnimationRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  
  // Background animation effect
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        transition: { duration: 1.5 }
      });
    }
  }, [isInView, controls]);

  // Handle parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgAnimationRef.current) return;
      
      const elements = bgAnimationRef.current.querySelectorAll('.bg-element') as NodeListOf<HTMLElement>;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      elements.forEach((el: HTMLElement, i: number) => {
        const depth = 1 + (i % 3) * 0.5;
        const moveX = (clientX - innerWidth / 2) / (50 / depth);
        const moveY = (clientY - innerHeight / 2) / (50 / depth);
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Generate animated background elements
  const generateBgElements = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      size: Math.random() * 60 + 40,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.07 + 0.03,
      delay: Math.random() * 2,
      duration: Math.random() * 20 + 15,
    }));
  };

  const bgElements = generateBgElements(12);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Glow animation for cards
  const glowVariants = {
    initial: { opacity: 0.3 },
    hover: { 
      opacity: 0.7,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      id="services" 
      className="relative py-20 md:py-28 overflow-hidden"
      ref={sectionRef}
    >
      {/* Modern Animated Background similar to Hero section */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-dark via-brown to-brown-dark overflow-hidden">
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
                filter: 'blur(40px)',
              }}
            />
          ))}
        </div>
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-30"
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
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-gold-light text-sm tracking-wider uppercase font-medium mb-3">Services</span>
          <motion.h2 
            variants={textRevealFromBottom}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-balooBhaijaan text-4xl md:text-5xl lg:text-6xl mb-4 text-gold text-shadow"
          >
            What I Offer
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-1 bg-gold mx-auto rounded-full mb-6"
          />
          <motion.p 
            variants={textLineReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="mt-4 max-w-2xl mx-auto text-beige text-lg"
          >
            Professional services tailored to meet the needs of students and educational institutions
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative w-full h-[420px] rounded-2xl bg-brown-light/20 p-7 border-2 border-gold/30 transition-all duration-500 ease-out overflow-visible hover:border-gold hover:shadow-xl hover:shadow-gold/20 group"
            >
              {/* Card Content Container */}
              <div className="h-full flex flex-col">
                {/* Icon */}
                <motion.div 
                  className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-5 mx-auto transform transition-all duration-300 group-hover:bg-gold/30 group-hover:scale-110"
                >
                  <i className={`${service.icon} text-gold text-2xl`}></i>
                </motion.div>
                
                {/* Title & Description */}
                <div className="text-center mb-4">
                  <h3 className="font-balooBhaijaan text-2xl mb-3 text-gold">
                    {service.title}
                  </h3>
                  <p className="text-beige-light text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Service Details */}
                <div className="flex-grow">
                  <h4 className="text-gold font-balooBhaijaan text-sm mb-3 text-center">Services Include:</h4>
                  <ul className="text-beige space-y-2">
                    {service.details.map((detail, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start text-sm"
                      >
                        <span className="text-gold mr-2 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Button - Animated on Hover */}
                <motion.button 
                  onClick={() => scrollToSection("contact")}
                  className="absolute left-1 bottom-0 -translate-x-1 w-3/5 bg-gold text-brown font-medium py-3 px-6 rounded-xl opacity-0 transition-all duration-300 ease-out hover:bg-gold-light group-hover:opacity-100 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn more <i className="fas fa-arrow-right ml-1.5 text-xs"></i>
                </motion.button>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold/10 rounded-full blur-xl opacity-40 group-hover:opacity-60"></div>
                <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-gold/10 rounded-full blur-xl opacity-40 group-hover:opacity-60"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              className="relative btn-pulse bg-gold hover:bg-gold-light text-brown font-semibold px-8 py-6 rounded-full transition-all hover:shadow-gold overflow-hidden group"
              onClick={() => scrollToSection("contact")}
            >
              <span className="absolute inset-0 w-full h-full bg-gold-light/30 flex items-center justify-center blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                <i className="fas fa-calendar-check mr-3 text-lg"></i> 
                Book a Session Now
              </span>
            </Button>
          </motion.div>
          <p className="text-beige-light mt-4 text-sm opacity-80">Professional and personalized services tailored to your needs</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;