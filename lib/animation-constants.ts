// Animation easing functions
export const EASING = {
  EASE_IN: [0.4, 0, 1, 1],
  EASE_OUT: [0, 0, 0.2, 1],
  EASE_IN_OUT: [0.4, 0, 0.2, 1],
  BOUNCE: [0.68, -0.55, 0.265, 1.55],
  SMOOTH: [0.25, 0.46, 0.45, 0.94],
  SHARP: [0.4, 0, 0.6, 1],
} as const;

// Animation durations
export const DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
} as const;

// Animation delays
export const DELAY = {
  NONE: 0,
  SMALL: 0.1,
  MEDIUM: 0.2,
  LARGE: 0.5,
} as const;

// Common animation variants
export const VARIANTS = {
  FADE_IN: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  FADE_IN_UP: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  FADE_IN_DOWN: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  FADE_IN_LEFT: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  FADE_IN_RIGHT: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  SCALE_IN: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  SLIDE_UP: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  SLIDE_DOWN: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  SLIDE_LEFT: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  SLIDE_RIGHT: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
} as const;

// Hover animations
export const HOVER_VARIANTS = {
  SCALE: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  LIFT: {
    hover: { y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
    tap: { y: 0, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' },
  },
  GLOW: {
    hover: { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
    tap: { boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)' },
  },
} as const;

// Stagger animations
export const STAGGER_CONFIG = {
  CONTAINER: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  ITEM: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.NORMAL,
        ease: EASING.SMOOTH,
      },
    },
  },
} as const;

// Page transitions
export const PAGE_TRANSITIONS = {
  FADE: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: DURATION.NORMAL, ease: EASING.SMOOTH },
  },
  SLIDE: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: DURATION.NORMAL, ease: EASING.SMOOTH },
  },
  SCALE: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: DURATION.NORMAL, ease: EASING.SMOOTH },
  },
} as const; 