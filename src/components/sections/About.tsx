import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const aboutData = [
  {
    icon: "fas fa-graduation-cap",
    title: "Middle School Teacher",
    location: "CEM Berari Lakhmissi (El Bouni, Annaba)",
    description:
      "Implements differentiated pedagogy and interactive teaching methods to address each student's needs.",
    period: "2024 - Present",
  },
  {
    icon: "fas fa-chalkboard-teacher",
    title: "Trainee Teacher",
    location: "Larbi Moussa Middle School",
    description:
      "Gained valuable experience in lesson planning, classroom management, and interactive learning.",
    period: "2023 - 2024",
  },
  {
    icon: "fas fa-laptop",
    title: "Online & Private English Teacher",
    location: "ESL Ben Mhidi Private School",
    description:
      "Delivers tailored ESL courses that enhance language proficiency.",
    period: "2024 - Present",
  },
  {
    icon: "fas fa-podcast",
    title: "Content Creator & Community Leader",
    location: "Instagram @prof.azlef",
    description:
      "Managing a 25,000+ Instagram community with educational podcasts.",
    period: "2020 - Present",
  },
];

const educationData = [
  {
    degree: "Higher Diploma in English Teaching",
    school: "École Normale Supérieure Assia DEJEBAR Constantine (ENSC)",
    description:
      "Equivalent to Master 1, certified by the Ministry of National Education",
    year: "2024",
    website: "https://www.ensc.dz/",
  },
  {
    degree: "Baccalaureate in Foreign Languages",
    school: "Lycee Technique Abbasi El Eid",
    description: "With Honors (Very Good)",
    year: "2020",
  },
];

const About = () => {
  const sectionRef = useRef(null);
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

  // Handle subtle background movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgAnimationRef.current) return;
      
      const elements = bgAnimationRef.current.querySelectorAll('.bg-element') as NodeListOf<HTMLElement>;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      elements.forEach((el: HTMLElement, i: number) => {
        const depth = 0.5 + (i % 3) * 0.2; // Reduced movement intensity
        const moveX = (clientX - innerWidth / 2) / (80 / depth);
        const moveY = (clientY - innerHeight / 2) / (80 / depth);
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Generate subtle background elements
  const generateBgElements = (count: number) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      size: Math.random() * 40 + 20, // Smaller elements
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.04 + 0.01, // Very subtle opacity
      delay: Math.random() * 2,
      duration: Math.random() * 20 + 15,
    }));
  };

  const bgElements = generateBgElements(8);

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 overflow-hidden bg-brown-light/80"
      ref={sectionRef}
    >
      {/* Subtle Background Elements */}
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
          <span className="inline-block text-gold/80 text-sm tracking-wider uppercase font-medium mb-2">ABOUT ME</span>
          <h2 className="font-balooBhaijaan text-4xl md:text-5xl lg:text-6xl mb-4 text-gold">
            Who I Am
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-1 bg-gold/70 mx-auto rounded-full mb-6"
          />
          <p className="mt-4 max-w-2xl mx-auto text-beige text-lg leading-relaxed">
            Passionate educator dedicated to transforming learning experiences through 
            <span className="text-gold font-medium mx-1">innovative teaching</span> 
            and student engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* About Me Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-brown/90 p-8 md:p-10 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border border-gold/10">
              <h3 className="font-balooBhaijaan text-2xl md:text-3xl text-gold mb-6 flex items-center">
                <span className="inline-block w-8 h-8 mr-3 bg-gold/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-graduate text-gold text-sm"></i>
                </span>
                My Journey
              </h3>

              <p className="text-lg mb-6 text-beige leading-relaxed">
                My journey in education began with a profound passion for
                teaching and a commitment to transforming learning environments.
                My rigorous training at
                <a
                  href="https://www.ensc.dz/"
                  className="text-gold hover:text-gold-light font-medium ml-1 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ENSC (École Normale Supérieure)
                </a>
                &nbsp;has laid a strong pedagogical foundation that guides my
                approach to education.
              </p>

              <p className="text-lg mb-6 text-beige leading-relaxed">
                I believe that education should inspire curiosity, foster
                creativity, and empower students to reach their full potential.
                By creating dynamic learning spaces where every student feels
                valued, I aim to make education an engaging and transformative
                experience.
              </p>

              <div className="mt-10 border-t border-gold/20 pt-8">
                <h3 className="font-balooBhaijaan text-xl md:text-2xl text-gold mb-5 flex items-center">
                  <span className="inline-block w-7 h-7 mr-3 bg-gold/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-gold text-xs"></i>
                  </span>
                  Education
                </h3>

                <div className="space-y-4">
                  {educationData.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="relative pl-6 bg-brown-dark/30 p-5 rounded-lg border-l-2 border-gold/50 hover:border-l-3 hover:bg-brown-dark/40 transition-all duration-300 hover:translate-x-1"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-0 bottom-0 w-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gold absolute -left-[7px]"></div>
                      </div>
                      
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h4 className="font-balooBhaijaan text-beige text-lg">
                          {edu.degree}
                        </h4>
                        <span className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full font-medium">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-gold-light mt-2">
                        {edu.website ? (
                          <a
                            href={edu.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center"
                          >
                            {edu.school}
                            <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                          </a>
                        ) : (
                          edu.school
                        )}
                      </p>
                      <p className="text-sm text-beige-light mt-2 leading-relaxed">
                        {edu.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Career Highlights Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7"
          >
            <div className="bg-brown/90 p-8 md:p-10 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg border border-gold/10">
              <h3 className="font-balooBhaijaan text-2xl md:text-3xl text-gold mb-8 flex items-center">
                <span className="inline-block w-8 h-8 mr-3 bg-gold/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-briefcase text-gold text-sm"></i>
                </span>
                Career Highlights
              </h3>

              <div className="space-y-5">
                {aboutData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="rounded-lg p-5 bg-brown-dark/30 hover:bg-brown-dark/40 transition-all border-l-3 border-gold/70 relative overflow-hidden group"
                    whileHover={{ 
                      x: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-gold/30">
                        <i className={`${item.icon} text-gold text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h4 className="font-balooBhaijaan text-xl text-gold">
                            {item.title}
                          </h4>
                          <span className="bg-gold/10 text-gold text-xs px-3 py-1 rounded-full">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-beige mt-1">{item.location}</p>
                        <p className="text-beige-light mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-10 flex justify-center"
              >
                <blockquote className="relative text-center px-6 py-4 text-beige max-w-lg border-l-2 border-gold/30">
                  <p className="italic text-lg leading-relaxed">
                    "My goal is to inspire students to become lifelong learners by
                    creating educational experiences that are both engaging and
                    meaningful."
                  </p>
                  <div className="mt-4 text-gold-light text-sm font-medium">— ISKANDAR AZLEF</div>
                </blockquote>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;