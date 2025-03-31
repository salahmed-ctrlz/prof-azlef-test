import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CarouselImage {
  src: string;
  alt: string;
}

interface Carousel3DProps {
  images: CarouselImage[];
}

const Carousel3D = ({ images }: Carousel3DProps) => {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const angleIncrement = 360 / images.length;
  
  // Auto-rotate carousel
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentAngle(prev => prev - angleIncrement / 4);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [angleIncrement, isPaused]);
  
  const rotateCarousel = (direction: 'prev' | 'next') => {
    setCurrentAngle(prev => prev + (direction === 'prev' ? angleIncrement : -angleIncrement));
    // Pause auto-rotation briefly after manual navigation
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };
  
  // Mouse enter/leave handlers
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="relative">
      <div 
        className="mx-auto carousel-container" 
        style={{ maxWidth: '800px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={carouselRef}
          className="carousel relative h-[400px] md:h-[500px] mx-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateY(${currentAngle}deg)`,
            transition: 'transform 1s ease-out',
          }}
        >
          {images.map((image, index) => {
            const theta = (360 / images.length) * index;
            const radius = 400;
            return (
              <div
                key={index}
                className="carousel-item absolute w-[250px] h-[333px] md:w-[300px] md:h-[400px] top-0 left-0 right-0 mx-auto"
                style={{
                  transformOrigin: 'center center',
                  transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                  transition: 'all 0.5s ease-out',
                  backfaceVisibility: 'hidden',
                  zIndex: Math.round(Math.cos((theta - currentAngle) * Math.PI / 180) * 100),
                  filter: `brightness(${Math.max(0.4, Math.cos((theta - currentAngle) * Math.PI / 180) * 0.6 + 0.4)})`,
                }}
              >
                <motion.div 
                  className="h-full w-full overflow-hidden rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
      
      <div className="flex justify-center mt-8 gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="bg-brown hover:bg-brown-light text-gold hover:text-gold-light rounded-full transition-colors"
                onClick={() => rotateCarousel('prev')}
                aria-label="Previous image"
              >
                <i className="fas fa-chevron-left"></i>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="bg-brown hover:bg-brown-light text-gold hover:text-gold-light rounded-full transition-colors"
                onClick={() => rotateCarousel('next')}
                aria-label="Next image"
              >
                <i className="fas fa-chevron-right"></i>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Carousel3D;
