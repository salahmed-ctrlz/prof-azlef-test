import { Variants } from 'framer-motion';

// Fade in animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

// Fade in with Y offset
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

// Fade in with X offset (from left)
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6
    }
  }
};

// Fade in with X offset (from right)
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6
    }
  }
};

// Scale in animation variants
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Stagger child item animation
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Navbar animation variants
export const navbarVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Mobile menu animation variants
export const menuVariants: Variants = {
  closed: { 
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  },
  open: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
};

// Section title animation
export const sectionTitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Button hover animation
export const buttonHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Floating bubble animation
export const bubbleVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 0.3, 
    scale: 1,
    transition: {
      duration: 1.5
    }
  }
};

// Text reveal from bottom
export const textRevealFromBottom: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
    }
  }
};

// Text reveal letter by letter
export const letterByLetter: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

export const letter: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

// Word reveal animation
export const wordReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const word: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: "blur(10px)" 
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6
    }
  }
};

// Text line animation that reveals on scroll
export const textLineReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6
    }
  })
};
