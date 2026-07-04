# ScribbleCode Content Engine Documentation

## Overview

The ScribbleCode Content Engine is a complete, production-ready content architecture that powers the entire learning platform. It separates **Presentation**, **Business Logic**, and **Learning Content** so that adding new lessons only requires creating structured JSON files—no React components needed.

---

## Architecture Principles

1. **Content-Driven**: All learning content lives in JSON files, not hardcoded in components
2. **Type-Safe**: Every content type has a TypeScript interface with strict typing
3. **Extensible**: New courses, lessons, and challenges can be added without engine changes
4. **Validated**: Content files are validated at load time with meaningful error messages
5. **Searchable**: Rich metadata enables filtering and search capabilities

---

## Folder Structure

```
src/
├── content/                    # Learning content files (JSON)
│   ├── javascript/            # JavaScript course content
│   │   ├── course.json        # Course definition
│   │   ├── world.json         # World definition
│   │   ├── chapters/          # Chapter definitions
│   │   ├── lessons/           # Lesson definitions
│   │   ├── quizzes/           # Quiz definitions
│   │   ├── boss-battles/      # Boss battle definitions
│   │   └── assets/            # Course-specific assets
│   ├── react/                 # React course content
│   ├── typescript/            # TypeScript course content
│   ├── node/                  # Node.js course content
│   └── shared/                # Shared content across courses
│       ├── achievements.json  # Global achievements
│       └── badges.json        # Global badges
│
└── content-engine/            # Content engine code
    ├── schemas/               # TypeScript interfaces
    │   └── index.ts           # All content type definitions
    ├── validators/            # Content validation utilities
    │   └── index.ts           # Validation functions
    ├── loaders/               # Content loading layer
    │   └── index.ts           # ContentLoader implementation
    └── utils/                 # Utility functions
```

---

## Content Hierarchy

```
Course
└── World
    └── Chapter
        └── Lesson
            ├── Mission (narrative)
            ├── Sections (content blocks)
            ├── Challenges (interactive exercises)
            └── Reflection (closing question)
```

---

## Core Schemas

### Course

The top-level container for all learning content.

**Required Fields:**
- `id`: Unique identifier
- `title`: Course name
- `slug`: URL-friendly identifier
- `description`: Short description
- `technology`: Primary technology (javascript, typescript, etc.)
- `skillLevel`: beginner | intermediate | advanced | expert
- `worldIds`: Array of world IDs in this course
- `estimatedDurationHours`: Total estimated time
- `totalXP`: Total XP available
- `status`: draft | beta | published | archived

**Optional Fields:**
- `longDescription`: Extended description
- `certificateOffered`: Whether certificate is available
- `instructors`: Array of instructor objects
- `coverImage`, `bannerImage`: Image URLs
- `pricing`: Pricing configuration
- `seoDescription`, `seoKeywords`: SEO metadata

### World

A themed collection of chapters within a course.

**Required Fields:**
- `id`: Unique identifier
- `title`: World name
- `order`: Display order
- `technology`: Technology focus
- `chapterIds`: Array of chapter IDs
- `totalXPAvailable`: Total XP in this world
- `isAvailable`: Whether world is accessible
- `introduction`: Welcome message and lore

### Chapter

A grouping of related lessons.

**Required Fields:**
- `id`: Unique identifier
- `title`: Chapter name
- `order`: Display order
- `lessonIds`: Array of lesson IDs
- `summary`: Chapter overview with learning objectives

### Lesson

The core learning unit containing content and challenges.

**Required Fields:**
- `id`: Unique identifier
- `title`: Lesson title
- `description`: Short description
- `lessonType`: Type of lesson (reading, interactive-explanation, etc.)
- `difficulty`: Difficulty level
- `estimatedTimeMinutes`: Estimated completion time
- `learningObjectives`: Array of learning objectives
- `rewards`: XP and coin rewards
- `sections`: Content sections (text, code, callouts)
- `challenges`: Interactive challenges
- `completionConditions`: Requirements to complete

**Optional Fields:**
- `missionNarrative`: Story/motivation context
- `prerequisites`: Requirements to unlock
- `hints`: Progressive hint system
- `reflectionQuestion`: Closing reflection prompt
- `nextLessonId`: Linear progression link
- `resources`: External learning resources

---

## Challenge Types

The engine supports multiple challenge formats:

| Type | Description | Key Fields |
|------|-------------|------------|
| `multiple-choice` | Select correct option(s) | `options[]`, `allowMultiple` |
| `fill-blank` | Fill in missing words/code | `content`, `answers[]` |
| `code-completion` | Complete partial code | `codeTemplate`, `expectedSolution` |
| `code-repair` | Fix buggy code | `buggyCode`, `expectedBehavior` |
| `ordering` | Arrange items in order | `items[]`, `orderingContext` |
| `matching` | Match pairs | `leftItems[]`, `rightItems[]`, `correctPairs[]` |
| `true-false` | True/false questions | `statement`, `correctAnswer` |
| `code-playground` | Write full solution | `taskDescription`, `testCases[]` |
| `drag-drop` | Categorize items | `draggableItems[]`, `dropZones[]` |
| `arrange-steps` | Order procedure steps | `steps[]`, `procedureContext` |
| `debug-code` | Identify bugs | `codeWithBugs`, `issues[]` |

---

## Reward System

XP and coins are fully configurable per content item.

### XP Reward Structure

```json
{
  "xp": {
    "base": 50,           // Base XP for completion
    "perfectBonus": 20,   // Bonus for 100% accuracy
    "firstAttemptBonus": 10, // Bonus for first-try success
    "minimum": 25,        // Minimum XP earnable
    "maximum": 80         // Maximum XP cap
  },
  "coins": {
    "base": 15,           // Base coins
    "bonus": 5            // Optional bonus coins
  }
}
```

### Achievement Rewards

Achievements provide additional XP and coins when triggered:

```json
{
  "id": "achievement-week-warrior",
  "name": "Week Warrior",
  "triggers": [{ "type": "streak-days", "threshold": 7 }],
  "xpReward": 500,
  "coinReward": 200,
  "rarity": "rare"
}
```

---

## Unlock Rules

Lessons, chapters, and worlds can have prerequisites:

```json
"prerequisites": [
  {
    "type": "complete-lesson",
    "targetId": "js-lesson-1-1-intro-variables",
    "minCompletion": 100
  },
  {
    "type": "reach-xp-threshold",
    "threshold": 500
  }
]
```

**Supported Types:**
- `complete-lesson`: Must complete specific lesson
- `complete-chapter`: Must complete specific chapter
- `complete-world`: Must complete specific world
- `reach-xp-threshold`: Must reach XP level
- `complete-boss-battle`: Must defeat boss
- `earn-achievement`: Must earn achievement
- `consecutive-days`: Streak requirement

---

## Hint System

Progressive hints help learners without giving away answers:

```json
"hints": {
  "enabled": true,
  "maxHints": 3,
  "hints": [
    { "id": "hint-1", "text": "First hint...", "order": 1 },
    { "id": "hint-2", "text": "Second hint...", "order": 2 },
    { "id": "hint-3", "text": "Third hint...", "order": 3 }
  ],
  "finalExplanation": "Full explanation after all hints or failure"
}
```

---

## Content Loader API

Use the ContentLoader to access content programmatically:

```typescript
import { contentLoader } from '@/content-engine/loaders';

// Load a specific lesson
const lesson = await contentLoader.loadLesson('js-lesson-1-1-intro-variables');

// Load all lessons in a chapter
const lessons = await contentLoader.loadLessonsForChapter('js-chapter-1-variables');

// Load all achievements
const achievements = await contentLoader.loadAllAchievements();

// Search content
const results = await contentLoader.searchContent('variables', {
  difficulty: 'beginner',
  technology: 'javascript'
});
```

---

## Validation

Content is validated automatically on load. Validators check:

- Required fields are present
- Values are correct types
- Enum values are valid
- Arrays meet length requirements
- Numeric values are in valid ranges
- References point to existing entities

Validation errors include:
- Entity ID and type
- Field path
- Error message
- Severity (error/warning/info)

---

## Adding a New Lesson

1. Create a new JSON file in `src/content/{technology}/lessons/`
2. Follow the Lesson schema
3. Add the lesson ID to the parent chapter's `lessonIds` array
4. Set `nextLessonId` in the previous lesson

That's it! No React components, no backend changes.

---

## Extensibility

To add a new course:

1. Create folder: `src/content/{technology}/`
2. Add `course.json` with course metadata
3. Add `world.json` for each world
4. Add chapter and lesson files
5. Update parent references

The engine automatically discovers and loads new content.

---

## Example: Creating a Lesson

See `src/content/javascript/lessons/js-lesson-1-1-intro-variables.json` for a complete example including:

- Learning objectives
- Mission narrative
- Mixed content sections (text, code, callouts)
- Multiple challenge types
- Progressive hints
- Reflection question
- Resource links

---

## Future Support

The architecture supports future features without structural changes:

- **Premium content**: Via `pricing` and `requiredTier` fields
- **Seasonal achievements**: Via `seasonalEvent` and `dateRange`
- **Multi-language**: Via `LocalizedString` type
- **Video lessons**: Via `hasVideo` and `videoUrl` fields
- **Mastery levels**: Via progress tracking interfaces
- **Social features**: Via social achievement categories
