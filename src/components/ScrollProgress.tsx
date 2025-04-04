import { useEffect, useState, useCallback } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function(...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  };

  const handleScroll = useCallback(throttle(() => {
    const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentScroll = document.documentElement.scrollTop;
    const progress = (currentScroll / totalScroll) * 100;
    setScrollProgress(progress);
  }, 100), []); // Throttle to 100ms

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-gold transform-gpu" 
        style={{ 
          width: `${scrollProgress}%`,
          willChange: 'width'
        }}
      />
    </div>
  );
};

export default ScrollProgress; 