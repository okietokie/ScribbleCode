import { Variants } from 'framer-motion';

/**
 * ScribbleCode Motion Library
 * 
 * A comprehensive collection of reusable animation presets that embody
 * the handcrafted, playful, and encouraging personality of ScribbleCode.
 * 
 * Philosophy:
 * - Soft, playful, organic movements
 * - Never fast, sharp, or mechanical
 * - Every animation reinforces learning and exploration
 */

// ============================================================================
// TIMING CONSTANTS
// ============================================================================

export const timing = {
  hover: 0.15,      // 150ms for hover states
  click: 0.1,       // 100ms for click feedback
  cardEntrance: 0.4, // 400ms for card animations
  pageTransition: 0.5, // 500ms for page changes
  celebration: 1.0,    // 1000ms for celebrations
} as const;

// ============================================================================
// EASING CURVES
// ============================================================================

export const easing = {
  // Soft, organic easings
  gentle: [0.25, 0.1, 0.25, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  spring: [0.175, 0.885, 0.32, 1.1],
  wobble: [0.45, 0.05, 0.55, 0.95],
  smooth: [0.4, 0, 0.2, 1],
} as const;

// ============================================================================
// BASIC MOTIONS
// ============================================================================

/**
 * Fade In - Gentle appearance
 * Used for: Tooltips, dialogs, subtle entrances
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: timing.cardEntrance, ease: easing.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

/**
 * Slide Up - Natural upward movement
 * Used for: Cards, modals, notifications
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: timing.cardEntrance, ease: easing.spring },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

/**
 * Scale - Gentle growth
 * Used for: Buttons, icons, emphasis
 */
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: timing.cardEntrance, ease: easing.bounce },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

// ============================================================================
// NOTEBOOK MOTIONS
// ============================================================================

/**
 * Notebook Open - Cover opening animation
 * Used for: App launch, major section reveals
 */
export const notebookOpen: Variants = {
  hidden: { rotateY: -15, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: timing.pageTransition, ease: easing.spring },
  },
  exit: {
    rotateY: -15,
    opacity: 0,
    transition: { duration: timing.pageTransition, ease: easing.smooth },
  },
};

/**
 * Notebook Close - Cover closing animation
 * Used for: App exit, section hiding
 */
export const notebookClose: Variants = {
  hidden: { rotateY: 0, opacity: 1 },
  visible: {
    rotateY: -15,
    opacity: 0,
    transition: { duration: timing.pageTransition, ease: easing.gentle },
  },
};

/**
 * Page Flip - Turning a notebook page
 * Used for: Navigation between lessons, chapters
 */
export const pageFlip: Variants = {
  hidden: { rotateY: -90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: timing.pageTransition, ease: easing.spring },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    transition: { duration: timing.pageTransition, ease: easing.gentle },
  },
};

/**
 * Paper Slide - Paper sliding into view
 * Used for: Cards, notes, sticky notes
 */
export const paperSlide: Variants = {
  hidden: { x: -30, rotate: -2, opacity: 0 },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: { duration: timing.cardEntrance, ease: easing.spring },
  },
  exit: {
    x: 30,
    rotate: 2,
    opacity: 0,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

// ============================================================================
// STICKER & BADGE MOTIONS
// ============================================================================

/**
 * Sticker Pop - Sticker appearing with a pop
 * Used for: Achievements, badges, stickers
 */
export const stickerPop: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { duration: timing.celebration, ease: easing.bounce },
  },
  exit: {
    scale: 0,
    rotate: 180,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

/**
 * Paper Drop - Paper falling onto surface
 * Used for: Notes, cards dropping in
 */
export const paperDrop: Variants = {
  hidden: { y: -100, rotate: 5, opacity: 0 },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { duration: timing.celebration, ease: easing.bounce },
  },
  exit: {
    y: 100,
    rotate: -5,
    opacity: 0,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

/**
 * Badge Stamp - Badge stamping onto page
 * Used for: Achievement unlocks, completions
 */
export const badgeStamp: Variants = {
  hidden: { scale: 1.5, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.3, ease: easing.bounce },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

// ============================================================================
// INTERACTION MOTIONS
// ============================================================================

/**
 * Button Wiggle - Playful button wiggle on hover
 * Used for: Primary buttons, CTAs
 */
export const buttonWiggle: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: [-2, 2, -2, 2, 0],
    transition: { duration: 0.3, repeat: Infinity, repeatDelay: 1 },
  },
  tap: { scale: 0.95, rotate: 0 },
};

/**
 * Hover Lift - Card lifting on hover
 * Used for: Cards, interactive elements
 */
export const hoverLift: Variants = {
  rest: { y: 0, shadow: 'var(--shadow-paper)' },
  hover: {
    y: -4,
    transition: { duration: timing.hover, ease: easing.spring },
  },
  tap: { y: -2, scale: 0.98 },
};

/**
 * Card Float - Gentle floating animation
 * Used for: Featured cards, highlights
 */
export const cardFloat: Variants = {
  rest: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: { duration: 3, repeat: Infinity, ease: easing.smooth },
  },
};

/**
 * Tooltip Fade - Quick tooltip appearance
 * Used for: Tooltips, hints
 */
export const tooltipFade: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 5 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: timing.hover, ease: easing.spring },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 5,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

/**
 * Dialog Bounce - Dialog appearing with a bounce
 * Used for: Modals, dialogs
 */
export const dialogBounce: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: -20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: timing.cardEntrance, ease: easing.bounce },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -20,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

// ============================================================================
// CELEBRATION MOTIONS
// ============================================================================

/**
 * Success Pulse - Pulsing success indicator
 * Used for: Completed tasks, achievements
 */
export const successPulse: Variants = {
  rest: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.6, repeat: Infinity, ease: easing.smooth },
  },
};

/**
 * Coin Bounce - Coin bouncing animation
 * Used for: XP gains, rewards
 */
export const coinBounce: Variants = {
  hidden: { y: 0, scale: 0 },
  visible: {
    y: [0, -30, 0, -15, 0],
    scale: [0, 1.2, 1, 1.1, 1],
    rotate: [0, 180, 360],
    transition: { duration: timing.celebration, ease: easing.bounce },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: timing.hover, ease: easing.smooth },
  },
};

/**
 * XP Float - XP number floating up
 * Used for: XP gain displays
 */
export const xpFloat: Variants = {
  hidden: { y: 0, opacity: 1, scale: 0.8 },
  visible: {
    y: -40,
    opacity: 0,
    scale: 1.2,
    transition: { duration: timing.celebration, ease: easing.spring },
  },
};

/**
 * Mission Unlock - Road drawing animation
 * Used for: Unlocking new chapters, missions
 */
export const missionUnlock: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: timing.celebration, ease: easing.smooth },
  },
};

/**
 * Checkmark Draw - Checkmark being drawn
 * Used for: Task completion, form validation
 */
export const checkmarkDraw: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.4, ease: easing.smooth },
  },
};

/**
 * Pencil Draw - Line being drawn
 * Used for: Progress indicators, road maps
 */
export const pencilDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.5 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: easing.smooth },
  },
};

// ============================================================================
// MAP & WORLD MOTIONS
// ============================================================================

/**
 * Map Zoom - Zooming into map area
 * Used for: World map navigation
 */
export const mapZoom: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: timing.pageTransition, ease: easing.spring },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    transition: { duration: timing.pageTransition, ease: easing.smooth },
  },
};

/**
 * Building Complete - Building gaining color
 * Used for: Completed locations on map
 */
export const buildingComplete: Variants = {
  hidden: { filter: 'grayscale(100%)', opacity: 0.5 },
  visible: {
    filter: 'grayscale(0%)',
    opacity: 1,
    transition: { duration: timing.celebration, ease: easing.spring },
  },
};

// ============================================================================
// COMPOUND ANIMATIONS
// ============================================================================

/**
 * Celebration Sequence - Combined celebration
 * Used for: Major achievements, level ups
 */
export const celebrationSequence = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: [0, 1.3, 1],
    rotate: [-180, 10, -5, 0],
    transition: {
      duration: timing.celebration,
      ease: easing.bounce,
      times: [0, 0.5, 1],
    },
  },
};

/**
 * Success Shake - Gentle success shake
 * Used for: Form submission, task completion
 */
export const successShake: Variants = {
  rest: { rotate: 0 },
  animate: {
    rotate: [-5, 5, -5, 5, 0],
    transition: { duration: 0.4, ease: easing.wobble },
  },
};

// ============================================================================
// REDUCED MOTION SUPPORT
// ============================================================================

/**
 * Creates a motion variant that respects reduced motion preferences
 * @param variants - The original variants
 * @returns Variants with reduced motion support
 */
export const withReducedMotion = (variants: Variants): Variants => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
      exit: { opacity: 0, transition: { duration: 0.01 } },
    };
  }

  return variants;
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export const motionLibrary = {
  // Basic
  fadeIn,
  slideUp,
  scale,
  
  // Notebook
  notebookOpen,
  notebookClose,
  pageFlip,
  paperSlide,
  
  // Stickers & Badges
  stickerPop,
  paperDrop,
  badgeStamp,
  
  // Interactions
  buttonWiggle,
  hoverLift,
  cardFloat,
  tooltipFade,
  dialogBounce,
  
  // Celebrations
  successPulse,
  coinBounce,
  xpFloat,
  missionUnlock,
  checkmarkDraw,
  pencilDraw,
  celebrationSequence,
  successShake,
  
  // Map & World
  mapZoom,
  buildingComplete,
  
  // Utilities
  withReducedMotion,
};

export type MotionKey = keyof typeof motionLibrary;
