import type { Variants } from "framer-motion";

export const exerciseAnimations = {
  page: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      }
    },
    exit: { opacity: 0 }
  } satisfies Variants,
  
  section: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  } satisfies Variants,
  
  header: {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  } satisfies Variants,
  
  testResult: {
    initial: { transform: "scale(0)", opacity: 0 },
    animate: { 
      transform: "scale(1)", 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      transform: "scale(0)", 
      opacity: 0,
      transition: {
        duration: 0.15
      }
    }
  } satisfies Variants,
  
  staggeredList: {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  } satisfies Variants,
  
  listItem: {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  } satisfies Variants,
  
  tab: {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: 10,
      transition: {
        duration: 0.2
      }
    }
  } satisfies Variants,
}; 
