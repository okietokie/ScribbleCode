/**
 * ScribbleCode Brand Guidelines
 * 
 * This module documents the brand personality, visual language, and design
 * principles that define the ScribbleCode experience.
 * 
 * These guidelines should inform every design decision and component implementation.
 */

// ============================================================================
// BRAND PERSONALITY
// ============================================================================

/**
 * ScribbleCode IS:
 * ✓ Creative - Encourages exploration and experimentation
 * ✓ Friendly - Warm, approachable, never intimidating
 * ✓ Curious - Invites discovery and learning
 * ✓ Encouraging - Celebrates progress, not perfection
 * ✓ Handmade - Feels crafted with care, not mass-produced
 * ✓ Clever - Smart without being pretentious
 * ✓ Relaxed - Reduces anxiety around learning programming
 */
export const brandPersonality = {
  positive: ['Creative', 'Friendly', 'Curious', 'Encouraging', 'Handmade', 'Clever', 'Relaxed'],
  
  /**
   * ScribbleCode is NEVER:
   * ✗ Corporate - No sterile enterprise software vibes
   * ✗ Cold - Always warm and inviting
   * ✗ Overly childish - Respectful of learners of all ages
   * ✗ Aggressive - No pressure, no urgency tactics
   * ✗ Minimalist - Embraces warmth and personality
   * ✗ Sci-fi - Grounded in familiar, tactile metaphors
   * ✗ Enterprise software - Never feels like work tools
   */
  negative: ['Corporate', 'Cold', 'Overly childish', 'Aggressive', 'Minimalist', 'Sci-fi', 'Enterprise'],
} as const;

// ============================================================================
// CORE INSPIRATIONS
// ============================================================================

/**
 * Visual references that define the ScribbleCode aesthetic:
 * 
 * • Hand-drawn sketchbooks - Imperfect lines, personal touch
 * • Illustrated adventure journals - Discovery, exploration
 * • Children's science books - Making complex topics accessible
 * • Interactive notebooks - Hands-on learning experience
 * • Sticky notes - Casual, temporary, movable ideas
 * • Washi tape - Decorative, colorful, handcrafted
 * • Paper scraps - Resourceful, creative reuse
 * • Treasure maps - Journey, discovery, adventure
 * • Doodles - Playful, spontaneous expression
 * 
 * The application should look like someone designed their dream
 * programming notebook.
 */
export const visualInspirations = [
  'Hand-drawn sketchbooks',
  'Illustrated adventure journals',
  "Children's science books",
  'Interactive notebooks',
  'Sticky notes',
  'Washi tape',
  'Paper scraps',
  'Treasure maps',
  'Doodles',
] as const;

// ============================================================================
// EMOTIONAL GOALS
// ============================================================================

/**
 * How users should FEEL when using ScribbleCode:
 * 
 * • Curious - Eager to explore what's next
 * • Rewarded - Recognized for their efforts
 * • Relaxed - Comfortable, not stressed
 * • Motivated - Inspired to continue learning
 * • Safe to make mistakes - Errors are part of learning
 * • Excited to continue - Anticipating the next lesson
 * 
 * The application actively reduces anxiety often associated
 * with learning programming.
 */
export const emotionalGoals = [
  'Curious',
  'Rewarded',
  'Relaxed',
  'Motivated',
  'Safe to make mistakes',
  'Excited to continue',
] as const;

// ============================================================================
// MOTION PHILOSOPHY
// ============================================================================

/**
 * Animation Principles:
 * 
 * ✓ Animations communicate feedback, not decoration
 * ✓ Every movement reinforces learning
 * ✓ Soft, playful, organic movements
 * ✓ Handcrafted feel
 * 
 * ✗ Never fast or jarring
 * ✗ Never sharp or mechanical
 * ✗ Never gratuitous animation
 */
export const motionPhilosophy = {
  should: ['Communicate feedback', 'Reinforce learning', 'Feel soft', 'Feel playful', 'Feel organic', 'Feel handcrafted'],
  never: ['Fast', 'Sharp', 'Mechanical', 'Gratuitous'],
} as const;

/**
 * Animation Timing Guidelines:
 * 
 * Hover states:      120–180ms (quick feedback)
 * Click feedback:    80–120ms  (instant response)
 * Card entrance:     300–450ms  (noticeable but not slow)
 * Page transition:   450–650ms  (smooth navigation)
 * Celebration:       800–1200ms (enjoyable moment)
 * 
 * The application should always feel responsive.
 * Avoid long delays that interrupt flow.
 */
export const animationTiming = {
  hover: { min: 120, max: 180, unit: 'ms' },
  click: { min: 80, max: 120, unit: 'ms' },
  cardEntrance: { min: 300, max: 450, unit: 'ms' },
  pageTransition: { min: 450, max: 650, unit: 'ms' },
  celebration: { min: 800, max: 1200, unit: 'ms' },
} as const;

// ============================================================================
// NAVIGATION EXPERIENCE
// ============================================================================

/**
 * The navigation should feel like opening a real notebook:
 * 
 * 1. Opening the app → Notebook cover opens
 * 2. Pages slide into view → Content appears naturally
 * 3. Navigation tabs resemble notebook dividers
 * 4. Changing pages → Turning notebook pages, not replacing screens
 * 
 * This metaphor creates familiarity and reduces cognitive load.
 */
export const navigationExperience = {
  metaphor: 'Opening a real notebook',
  interactions: {
    open: 'Notebook cover opens',
    content: 'Pages slide into view',
    navigation: 'Notebook dividers',
    pageChange: 'Turning pages',
  },
} as const;

// ============================================================================
// MICRO INTERACTIONS
// ============================================================================

/**
 * Every action receives visual feedback:
 * 
 * Completing a lesson:
 *   → Paper stamp appears
 *   → Small confetti
 *   → XP floats upward
 *   → Notebook slightly shakes
 *   → Progress line draws itself
 * 
 * Unlocking a chapter:
 *   → Road draws itself
 *   → Color fills the next area
 *   → Tiny stars appear
 * 
 * Achievement earned:
 *   → Sticker falls from above
 *   → Bounces once
 *   → Pins itself onto notebook
 * 
 * Hovering a lesson:
 *   → Card lifts
 *   → Shadow deepens
 *   → Tiny pencil sparkle appears
 * 
 * Pressing buttons:
 *   → Button compresses
 *   → Slight rotation
 *   → Returns with bounce
 */
export const microInteractions = {
  completingLesson: ['Paper stamp', 'Small confetti', 'XP floats up', 'Notebook shake', 'Progress line draws'],
  unlockingChapter: ['Road draws', 'Color fills area', 'Tiny stars appear'],
  achievementEarned: ['Sticker falls', 'Bounces once', 'Pins to notebook'],
  hoveringLesson: ['Card lifts', 'Shadow deepens', 'Pencil sparkle'],
  pressingButton: ['Button compresses', 'Slight rotation', 'Returns with bounce'],
} as const;

// ============================================================================
// CURSOR BEHAVIOR
// ============================================================================

/**
 * Interactive objects subtly react to cursor presence:
 * 
 * ✓ Buttons tilt slightly
 * ✓ Cards lift on hover
 * ✓ Tooltips fade in smoothly
 * ✓ Icons wiggle playfully
 * ✓ Notebook tabs shift position
 * 
 * ⚠ Avoid exaggerated motion that distracts from content.
 */
export const cursorBehavior = {
  reactions: ['Buttons tilt', 'Cards lift', 'Tooltips fade', 'Icons wiggle', 'Tabs shift'],
  principle: 'Subtle reaction, never exaggerated',
} as const;

// ============================================================================
// WORLD MAP BEHAVIOR
// ============================================================================

/**
 * The world map should feel alive:
 * 
 * Ambient animations:
 *   → Trees sway gently
 *   → Clouds drift slowly
 *   → Water ripples
 * 
 * Progress indicators:
 *   → Roads animate when unlocked
 *   → Completed buildings gain color
 *   → Locked buildings remain pencil sketches
 * 
 * Occasional touches:
 *   → Birds fly across the map
 * 
 * Everything should be SUBTLE - background ambiance, not distraction.
 */
export const worldMapBehavior = {
  ambient: ['Trees sway', 'Clouds drift', 'Water ripples'],
  progress: ['Roads animate when unlocked', 'Buildings gain color', 'Locked = pencil sketch'],
  occasional: ['Birds fly across'],
  principle: 'Subtle background ambiance',
} as const;

// ============================================================================
// ILLUSTRATION GUIDELINES
// ============================================================================

/**
 * Illustration Style:
 * 
 * ✓ Flat - No gradients or 3D effects
 * ✓ Hand-drawn - Imperfect, personal touch
 * ✓ Simple - Clear, understandable at a glance
 * ✓ Friendly - Approachable characters and objects
 * ✓ Consistent line thickness - Cohesive visual language
 * ✓ Rounded corners - Soft, friendly shapes
 * ✓ Warm colors - Inviting palette
 * 
 * ✗ Never photorealistic
 * ✗ Never glossy
 * ✗ Never 3D assets
 */
export const illustrationGuidelines = {
  style: ['Flat', 'Hand-drawn', 'Simple', 'Friendly', 'Consistent lines', 'Rounded corners', 'Warm colors'],
  never: ['Photorealistic', 'Glossy', '3D assets'],
} as const;

// ============================================================================
// TEXTURE GUIDELINES
// ============================================================================

/**
 * Subtle paper textures add depth without distraction:
 * 
 * Usage:
 *   → Very low opacity
 *   → Never distract from readability
 * 
 * Optional texture elements (use sparingly):
 *   → Tiny pencil marks
 *   → Coffee stains
 *   → Fold marks
 *   → Notebook creases
 *   → Masking tape shadows
 *   → Paper clips
 *   → Sticker shadows
 * 
 * These details should be SPARSE and TASTEFUL.
 */
export const textureGuidelines = {
  usage: 'Very low opacity, never distracting',
  optional: [
    'Tiny pencil marks',
    'Coffee stains',
    'Fold marks',
    'Notebook creases',
    'Masking tape',
    'Paper clips',
    'Sticker shadows',
  ],
  principle: 'Sparse and tasteful',
} as const;

// ============================================================================
// STICKER SYSTEM
// ============================================================================

/**
 * Stickers resemble die-cut vinyl stickers placed inside a notebook.
 * 
 * Examples:
 *   → XP - Experience points indicator
 *   → Completed - Task completion marker
 *   → Perfect Score - Flawless achievement
 *   → React Hero - React mastery badge
 *   → Bug Hunter - Debugging expert
 *   → Hook Master - Hooks specialist
 *   → Explorer - Journey milestone
 * 
 * Visual characteristics:
 *   → Slightly raised appearance
 *   → Subtle drop shadow
 *   → Die-cut edges
 *   → Vibrant but not neon colors
 */
export const stickerSystem = {
  examples: [
    'XP',
    'Completed',
    'Perfect Score',
    'React Hero',
    'Bug Hunter',
    'Hook Master',
    'Explorer',
  ],
  visualCharacteristics: ['Die-cut appearance', 'Slightly raised', 'Subtle shadow', 'Vibrant colors'],
} as const;

// ============================================================================
// SOUND SYSTEM (OPTIONAL)
// ============================================================================

/**
 * Architecture prepared for future sound effects.
 * All sounds must be OPTIONAL and respect user preferences.
 * 
 * Potential sound effects:
 *   → Paper flip - Page navigation
 *   → Pencil writing - Code input
 *   → Coin - XP gain
 *   → Stamp - Achievement unlock
 *   → Success - Task completion
 *   → Sticker pop - Badge earned
 *   → Checkbox - Task check
 * 
 * Requirements:
 *   → Mute by default
 *   → Easy to enable/disable
 *   → Low volume, non-intrusive
 *   → High quality, short duration
 */
export const soundSystem = {
  potentialSounds: [
    'Paper flip',
    'Pencil writing',
    'Coin',
    'Stamp',
    'Success',
    'Sticker pop',
    'Checkbox',
  ],
  requirements: ['Mute by default', 'Easy to toggle', 'Low volume', 'High quality', 'Short duration'],
} as const;

// ============================================================================
// CELEBRATION SYSTEM
// ============================================================================

/**
 * Celebration intensity matches accomplishment size:
 * 
 * Small accomplishments → Small celebrations
 *   (e.g., completing a single exercise)
 *   → Quick confetti burst
 *   → XP float animation
 *   → Checkmark draw
 * 
 * Large accomplishments → Larger celebrations
 *   (e.g., completing a chapter, earning achievement)
 *   → Sticker animation
 *   → Extended confetti
 *   → Sound effect (optional)
 *   → Special badge reveal
 * 
 * PRINCIPLES:
 *   ✓ Never interrupt workflow
 *   ✓ Celebrate briefly
 *   ✓ Allow immediate continuation
 */
export const celebrationSystem = {
  smallAccomplishments: {
    examples: ['Single exercise completed'],
    effects: ['Quick confetti', 'XP float', 'Checkmark draw'],
  },
  largeAccomplishments: {
    examples: ['Chapter completed', 'Achievement earned'],
    effects: ['Sticker animation', 'Extended confetti', 'Badge reveal'],
  },
  principles: ['Never interrupt workflow', 'Celebrate briefly', 'Allow immediate continuation'],
} as const;

// ============================================================================
// EMPTY STATES
// ============================================================================

/**
 * Empty states should be friendly and encouraging:
 * 
 * REQUIRED ELEMENTS:
 *   1. Friendly illustration
 *   2. Encouraging message
 *   3. Suggested action
 * 
 * EXAMPLE:
 *   "You haven't started your journey yet."
 *   ↓
 *   "Let's visit JavaScript Forest."
 * 
 * AVOID:
 *   ✗ "No data found."
 *   ✗ "Nothing here."
 *   ✗ Generic error messages
 *   ✗ Technical jargon
 */
export const emptyStateGuidelines = {
  requiredElements: ['Friendly illustration', 'Encouraging message', 'Suggested action'],
  example: {
    message: "You haven't started your journey yet.",
    suggestion: "Let's visit JavaScript Forest.",
  },
  avoid: ['No data found', 'Nothing here', 'Generic messages', 'Technical jargon'],
} as const;

// ============================================================================
// ERROR STATES
// ============================================================================

/**
 * Errors should never feel alarming:
 * 
 * INSTEAD OF:
 *   ✗ "Error"
 *   ✗ "Failed"
 *   ✗ "Invalid input"
 * 
 * SAY:
 *   ✓ "We hit a little bump."
 *   ✓ "Oops! Something went wrong."
 *   ✓ "Let's try that again."
 * 
 * ALWAYS OFFER:
 *   → Retry button
 *   → Helpful hint
 *   → Go back option
 * 
 * Avoid technical jargon unless absolutely necessary.
 */
export const errorStateGuidelines = {
  insteadOf: ['Error', 'Failed', 'Invalid input'],
  say: ["We hit a little bump.", 'Oops! Something went wrong.', "Let's try that again."],
  alwaysOffer: ['Retry button', 'Helpful hint', 'Go back option'],
  principle: 'Avoid technical jargon',
} as const;

// ============================================================================
// ACCESSIBILITY
// ============================================================================

/**
 * Accessibility Requirements:
 * 
 * 1. ANIMATIONS:
 *    → Respect reduced-motion preferences
 *    → Provide equivalent feedback without animation
 *    → Never require animation to understand state
 * 
 * 2. KEYBOARD NAVIGATION:
 *    → All interactions keyboard-accessible
 *    → Visible focus indicators
 *    → Logical tab order
 * 
 * 3. SCREEN READERS:
 *    → Semantic HTML
 *    → Proper ARIA labels
 *    → Meaningful alt text
 * 
 * 4. COLOR CONTRAST:
 *    → WCAG AA compliance minimum
 *    → Never rely on color alone
 * 
 * The application must remain fully usable with animations disabled.
 */
export const accessibilityGuidelines = {
  animations: [
    'Respect reduced-motion preferences',
    'Provide equivalent non-animated feedback',
    'Never require animation for understanding',
  ],
  keyboard: ['All interactions accessible', 'Visible focus indicators', 'Logical tab order'],
  screenReaders: ['Semantic HTML', 'Proper ARIA labels', 'Meaningful alt text'],
  color: ['WCAG AA minimum', 'Never rely on color alone'],
  principle: 'Fully usable with animations disabled',
} as const;

// ============================================================================
// DESIGN TOKENS REFERENCE
// ============================================================================

/**
 * Quick reference to design tokens defined in Tailwind config:
 * 
 * COLORS:
 *   --paper: #FAF6E9         (Main background)
 *   --paper-page: #FFFDF8    (Card/note backgrounds)
 *   --ink: #2B2B2B           (Primary text)
 *   --notebook-yellow: #F4D35E
 *   --notebook-blue: #6FB1FC
 *   --notebook-green: #7BD389
 *   --notebook-purple: #B58CF6
 *   --notebook-red: #F26D6D
 * 
 * TYPOGRAPHY:
 *   --font-primary: 'Patrick Hand'
 *   --font-secondary: 'Comic Neue'
 *   --font-fallback: 'Nunito Sans'
 * 
 * SPACING: 8-point scale (4, 8, 12, 16, 24, 32, 40, 48, 64, 80)
 * 
 * BORDER RADIUS:
 *   --radius-hand: 12px
 *   --radius-hand-lg: 16px
 *   --radius-hand-xl: 20px
 * 
 * SHADOWS:
 *   --shadow-paper: Soft paper shadow
 *   --shadow-paper-hover: Lifted paper
 *   --shadow-sticker: Sticker elevation
 *   --shadow-sticker-hover: Sticker lift
 */
export const designTokensReference = {
  colors: {
    paper: '#FAF6E9',
    paperPage: '#FFFDF8',
    ink: '#2B2B2B',
    yellow: '#F4D35E',
    blue: '#6FB1FC',
    green: '#7BD389',
    purple: '#B58CF6',
    red: '#F26D6D',
  },
  typography: {
    primary: 'Patrick Hand',
    secondary: 'Comic Neue',
    fallback: 'Nunito Sans',
  },
  spacing: '8-point scale',
  borderRadius: {
    hand: '12px',
    handLg: '16px',
    handXl: '20px',
  },
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

export const brandGuidelines = {
  personality: brandPersonality,
  inspirations: visualInspirations,
  emotionalGoals,
  motion: {
    philosophy: motionPhilosophy,
    timing: animationTiming,
  },
  navigation: navigationExperience,
  interactions: {
    micro: microInteractions,
    cursor: cursorBehavior,
    worldMap: worldMapBehavior,
  },
  visuals: {
    illustrations: illustrationGuidelines,
    textures: textureGuidelines,
    stickers: stickerSystem,
  },
  features: {
    sound: soundSystem,
    celebration: celebrationSystem,
    emptyState: emptyStateGuidelines,
    errorState: errorStateGuidelines,
  },
  accessibility: accessibilityGuidelines,
  tokens: designTokensReference,
} as const;

export type BrandGuideline = typeof brandGuidelines;
