import { AnimationPreset } from '@/types';

export const animationPresets: Record<string, AnimationPreset> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  pageFlip: {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 },
    transition: { duration: 0.4, type: 'spring', stiffness: 100 },
  },
  stickerPop: {
    initial: { scale: 0, rotate: -10 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 10 },
    transition: { duration: 0.3, type: 'spring', stiffness: 400, damping: 15 },
  },
  bounce: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { 
      duration: 0.5,
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
  wiggle: {
    initial: { rotate: 0 },
    animate: { rotate: [-3, 3, -3, 3, 0] },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.2 },
  },
  hoverLift: {
    initial: { y: 0, boxShadow: '2px 2px 0px rgba(43, 43, 43, 0.15)' },
    animate: { y: -4, boxShadow: '4px 4px 0px rgba(43, 43, 43, 0.15)' },
    transition: { duration: 0.2 },
  },
  paperDrop: {
    initial: { y: -50, opacity: 0, rotate: -5 },
    animate: { y: 0, opacity: 1, rotate: 0 },
    exit: { y: 50, opacity: 0, rotate: 5 },
    transition: { duration: 0.4, type: 'spring', stiffness: 200, damping: 15 },
  },
};

export const getAnimation = (name: string): AnimationPreset => {
  return animationPresets[name] || animationPresets.fadeIn;
};

export const createStaggerChildren = (delayPerChild = 0.05) => ({
  animate: {
    transition: {
      staggerChildren: delayPerChild,
    },
  },
});
