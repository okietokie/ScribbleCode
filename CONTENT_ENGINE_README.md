# ScribbleCode Content & Lesson Engine

## Overview

This directory contains the complete content architecture and universal lesson engine for ScribbleCode. The system is designed to be:

- **Data-driven**: All learning content lives in JSON files, not React components
- **Extensible**: New courses, lessons, and challenge types can be added without modifying the engine
- **Type-safe**: Full TypeScript support with strict interfaces
- **Accessible**: Built with WCAG guidelines in mind
- **Scalable**: Supports thousands of lessons across multiple technologies

## Architecture

```
src/
├── content-engine/          # Content layer (schemas, loaders, validators)
│   ├── schemas/             # TypeScript interfaces for all content types
│   ├── loaders/             # Load content from JSON files
│   ├── validators/          # Validate content during development
│   └── utils/               # Utility functions
│
├── lesson-engine/           # Runtime engine (renders lessons)
│   ├── core/                # State machine, types, renderer registry
│   ├── renderers/           # Section renderers (Reading, MCQ, Playground, etc.)
│   ├── hooks/               # React hooks (useLessonEngine)
│   └── utils/               # XP calculator, helpers
│
└── content/                 # Actual lesson content (JSON files)
    ├── javascript/          # JavaScript course
    ├── react/               # React course
    ├── typescript/          # TypeScript course
    ├── node/                # Node.js course
    └── shared/              # Shared achievements, badges
```

## Content Hierarchy

```
Course → World → Chapter → Lesson → Section → Challenge
```

### Example Structure

```
JavaScript Fundamentals (Course)
└── World 1: The Basics
    ├── Chapter 1: Variables
    │   ├── Lesson 1.1: Introduction to Variables
    │   ├── Lesson 1.2: let vs const
    │   └── Lesson 1.3: Variable Naming
    └── Chapter 2: Data Types
        ├── Lesson 2.1: Strings
        ├── Lesson 2.2: Numbers
        └── Boss Battle: Type Mastery
```

## Schemas

All content types are defined in `content-engine/schemas/index.ts`:

| Type | Description |
|------|-------------|
| `Course` | Top-level course definition |
| `World` | Thematic grouping of chapters |
| `Chapter` | Collection of related lessons |
| `Lesson` | Single learning unit with sections |
| `Section` | Content block (reading, challenge, reflection) |
| `Challenge` | Interactive exercise (12 types supported) |
| `Quiz` | Assessment with multiple questions |
| `BossBattle` | Capstone challenge for chapters/worlds |
| `Achievement` | Unlockable milestone |
| `Badge` | Visual recognition |

### Challenge Types

1. `multiple-choice` - Select correct option(s)
2. `fill-blank` - Complete missing text
3. `ordering` - Arrange items in sequence
4. `matching` - Pair related items
5. `arrange-code` - Order code lines correctly
6. `code-repair` - Fix broken code
7. `predict-output` - Guess code output
8. `drag-drop` - Drag items to zones
9. `interactive-simulation` - Interact with simulation
10. `code-playground` - Write and run code
11. `arrange-steps` - Order procedural steps
12. `debug-code` - Find and fix bugs
13. `true-false` - Boolean questions
14. `code-completion` - Complete partial code

## Adding a New Lesson

**No React components required!** Just create a JSON file:

```json
// src/content/javascript/lessons/js-lesson-1-1.json
{
  "id": "js-lesson-1-1",
  "title": "Introduction to Variables",
  "description": "Learn what variables are and how to use them",
  "type": "reading",
  "difficulty": "beginner",
  "estimatedTimeMinutes": 10,
  "learningObjectives": [
    {
      "id": "obj-1",
      "description": "Understand what a variable is",
      "bloomLevel": "understand"
    }
  ],
  "xpReward": 20,
  "coinReward": 5,
  "sections": [
    {
      "id": "section-1",
      "type": "reading",
      "title": "What is a Variable?",
      "order": 0,
      "isRequired": true,
      "content": {
        "markdown": "A variable is like a container that holds data..."
      }
    },
    {
      "id": "section-2",
      "type": "multiple-choice",
      "title": "Check Your Understanding",
      "order": 1,
      "isRequired": true,
      "challenge": {
        "id": "challenge-1",
        "type": "multiple-choice",
        "title": "What is a variable?",
        "instructions": "Select the best answer",
        "xpReward": 10,
        "difficulty": "beginner",
        "options": [
          { "id": "a", "text": "A container for data", "isCorrect": true },
          { "id": "b", "text": "A type of function", "isCorrect": false },
          { "id": "c", "text": "A loop structure", "isCorrect": false }
        ],
        "feedback": {
          "correct": "Excellent! Variables store data.",
          "incorrect": "Think about what variables do."
        }
      }
    },
    {
      "id": "section-3",
      "type": "reflection",
      "title": "Reflect",
      "order": 2,
      "isRequired": false,
      "question": {
        "prompt": "How might you use variables in your own projects?",
        "guidance": "Think about data you'd want to store"
      }
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "createdAt": "2025-01-01",
    "author": "ScribbleCode Team",
    "tags": ["variables", "basics", "javascript"],
    "keywords": ["var", "let", "const", "storage"],
    "category": "fundamentals",
    "technology": "javascript",
    "isPublished": true
  }
}
```

## Using the Lesson Engine

### Basic Usage

```tsx
import { useLessonEngine, rendererRegistry } from '@/lesson-engine';
import { loadLesson } from '@/content-engine';

function LessonPage({ lessonId, technology }: { lessonId: string; technology: string }) {
  const {
    state,
    currentSection,
    progressPercent,
    submitChallenge,
    nextSection,
    prevSection,
    requestHint,
    isCompleted,
    xpBreakdown,
  } = useLessonEngine({
    currentStreak: 5,
    onComplete: (xp) => console.log('Earned:', xp.totalXP),
  });

  // Load lesson on mount
  useEffect(() => {
    loadLesson(technology, lessonId).then(lesson => {
      // Register renderers if not already done
      registerDefaultRenderers();
      // Load the lesson into the engine
      loadLessonIntoEngine(lesson);
    });
  }, [lessonId, technology]);

  if (state.isLoading) return <LoadingSpinner />;
  if (state.error) return <ErrorDisplay error={state.error} />;
  if (!currentSection) return null;

  // Get the appropriate renderer for this section type
  const Renderer = getRendererComponent(currentSection.type);
  
  return (
    <div className="lesson-container">
      <ProgressBar value={progressPercent} />
      
      <Renderer
        section={currentSection}
        challenge={currentSection.challenge}
        state={getChallengeState(currentSection.challenge?.id)}
        onSubmit={(answer) => submitChallenge(currentSection.challenge.id, answer)}
        onHintRequest={() => requestHint(currentSection.challenge.id)}
        isCompleted={isCompleted}
      />
      
      <Navigation
        onPrev={prevSection}
        onNext={nextSection}
        canProceed={canProceed()}
      />
      
      {isCompleted && <CompletionScreen xp={xpBreakdown} />}
    </div>
  );
}
```

### Registering Renderers

```tsx
// In your app initialization
import { registerRenderers } from '@/lesson-engine';
import ReadingRenderer from '@/lesson-engine/renderers/ReadingRenderer';
import MultipleChoiceRenderer from '@/lesson-engine/renderers/MultipleChoiceRenderer';
import CodePlaygroundRenderer from '@/lesson-engine/renderers/CodePlaygroundRenderer';
import ReflectionRenderer from '@/lesson-engine/renderers/ReflectionRenderer';

function App() {
  useEffect(() => {
    registerRenderers([
      ReadingRenderer,
      MultipleChoiceRenderer,
      CodePlaygroundRenderer,
      ReflectionRenderer,
      // Add more as needed
    ]);
  }, []);
  
  return <Routes>...</Routes>;
}
```

### Adding a Custom Renderer

```tsx
// src/lesson-engine/renderers/CustomRenderer.tsx
import { RendererProps } from '../core/types';

export const CustomRenderer: React.FC<RendererProps> = ({
  section,
  challenge,
  state,
  onSubmit,
  onHintRequest,
  isCompleted,
}) => {
  // Your custom rendering logic
  return <div>Custom content...</div>;
};

export function validateCustom(section: any, answer: any) {
  return { valid: answer.correct, feedback: 'Good job!' };
}

export default {
  type: 'custom-type' as const,
  component: CustomRenderer,
  validator: validateCustom,
  defaultConfig: { /* ... */ },
};

// Register it
registerRenderers([CustomRenderer]);
```

## Validation

Content is validated automatically during loading:

```ts
import { validateLesson } from '@/content-engine';

const result = validateLesson(lessonData);
if (!result.isValid) {
  console.error('Validation errors:', result.errors);
  console.warn('Warnings:', result.warnings);
}
```

### Built-in Validation Rules

| Rule | Description |
|------|-------------|
| `has-id` | Lesson must have an ID |
| `has-sections` | At least one section required |
| `has-learning-objectives` | Learning objectives required |
| `unique-section-ids` | No duplicate section IDs |
| `challenge-has-challenge` | Challenge sections must have challenges |
| `reasonable-xp` | XP values must be reasonable |
| `ordered-hints` | Hints must be in ascending order |
| `valid-prerequisites` | Prerequisites must be properly configured |
| `mc-has-options` | Multiple choice must have options with correct answers |

## XP System

XP is calculated dynamically based on performance:

```ts
import { calculateLessonXP } from '@/lesson-engine';

const xpBreakdown = calculateLessonXP(lesson, progress, config, streakDays);
console.log(xpBreakdown);
// {
//   baseXP: 20,
//   challengeXP: 15,
//   perfectScoreBonus: 20,
//   firstTryBonus: 10,
//   streakBonus: 25,
//   hintPenalty: -5,
//   totalXP: 85,
//   coinReward: 8,
//   breakdown: [...]
// }
```

### XP Configuration

```ts
const xpConfig = {
  baseLessonXP: 10,
  challengeBonusMultiplier: 1.5,
  perfectScoreBonus: 20,
  firstTryBonus: 10,
  streakBonusPerDay: 5,
  maxStreakBonus: 50,
  hintPenaltyPercent: 10,
  maxHintPenalty: 50,
};
```

## Error Handling

The engine gracefully handles errors:

```ts
try {
  const lesson = await loadLesson('javascript', 'js-lesson-1-1');
} catch (error) {
  if (error instanceof ContentNotFoundError) {
    // Show friendly "not found" page
  } else if (error instanceof ContentValidationError) {
    // Log validation errors for developers
    console.error(error.errors);
  }
}
```

## Accessibility

All renderers include:
- Keyboard navigation
- Screen reader support (ARIA labels, live regions)
- Focus management
- Reduced motion support
- Semantic HTML

## Performance

- Lazy-load lesson assets
- Memoized renders
- Efficient state updates via useReducer
- No unnecessary re-renders

## Future Extensibility

### Adding a New Course

1. Create folder: `src/content/python/`
2. Add `course.json`, `world.json`
3. Create chapters and lessons
4. Done! No engine changes needed.

### Adding a New Challenge Type

1. Add schema to `content-engine/schemas/index.ts`
2. Create renderer in `lesson-engine/renderers/`
3. Register the renderer
4. Use in lesson JSON files

### Adding Premium Content

Add `"isPremium": true` to metadata. The engine supports this field for future gating.

## Documentation

- `content-engine/schemas/index.ts` - All content type definitions
- `lesson-engine/core/types.ts` - Engine state and action types
- `lesson-engine/hooks/useLessonEngine.ts` - Main hook API
- This README - Usage guide

---

**Remember**: Content defines behavior. The engine renders the experience. Never hardcode lesson content in React components.
