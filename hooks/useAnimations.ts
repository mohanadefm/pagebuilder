import { useState, useEffect } from 'react';

export const useAnimations = () => {
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getAnimationConfig = (baseConfig: any) => {
    if (!isAnimationsEnabled || prefersReducedMotion) {
      return {
        ...baseConfig,
        duration: 0,
        delay: 0,
      };
    }
    return baseConfig;
  };

  const toggleAnimations = () => {
    setIsAnimationsEnabled(!isAnimationsEnabled);
  };

  return {
    isAnimationsEnabled,
    prefersReducedMotion,
    getAnimationConfig,
    toggleAnimations,
  };
};

export const useScrollAnimation = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    const element = document.querySelector('[data-scroll-animation]');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return isInView;
};

export const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}; 