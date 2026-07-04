/**
 * Content Loaders
 * Load structured content from JSON files.
 * Returns strongly typed objects.
 */

import { Course, World, Chapter, Lesson, Quiz, BossBattle, Achievement, Badge } from '../schemas';

// -----------------------------------------------------------------------------
// Loader Configuration
// -----------------------------------------------------------------------------

export interface LoaderConfig {
  basePath: string;
  technology: string; // 'javascript', 'react', 'typescript', etc.
}

// -----------------------------------------------------------------------------
// Error Types
// -----------------------------------------------------------------------------

export class ContentLoadError extends Error {
  constructor(
    message: string,
    public contentType: string,
    public contentId?: string,
    public cause?: Error
  ) {
    super(message);
    this.name = 'ContentLoadError';
  }
}

export class ContentNotFoundError extends ContentLoadError {
  constructor(contentType: string, contentId: string) {
    super(`Content not found: ${contentType}/${contentId}`, contentType, contentId);
    this.name = 'ContentNotFoundError';
  }
}

export class ContentValidationError extends ContentLoadError {
  constructor(
    message: string,
    contentType: string,
    public errors: string[]
  ) {
    super(message, contentType);
    this.name = 'ContentValidationError';
  }
}

// -----------------------------------------------------------------------------
// Base Loader Functions
// -----------------------------------------------------------------------------

/**
 * Load and parse a JSON file
 */
async function loadJSON<T>(path: string): Promise<T> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      if (response.status === 404) {
        throw new ContentNotFoundError('unknown', path);
      }
      throw new Error(`Failed to load content from ${path}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      throw error;
    }
    throw new ContentLoadError(
      `Error loading JSON from ${path}`,
      'unknown',
      undefined,
      error as Error
    );
  }
}

/**
 * Dynamically import a TypeScript/JavaScript module
 */
async function loadModule<T>(path: string): Promise<T> {
  try {
    const module = await import(/* @vite-ignore */ path);
    return module.default || module;
  } catch (error) {
    throw new ContentLoadError(
      `Error loading module from ${path}`,
      'unknown',
      undefined,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// Course Loader
// -----------------------------------------------------------------------------

export async function loadCourse(technology: string): Promise<Course> {
  const path = `/src/content/${technology}/course.json`;
  try {
    const course = await loadJSON<Course>(path);
    
    // Validate required fields
    const errors: string[] = [];
    if (!course.id) errors.push('Missing course id');
    if (!course.title) errors.push('Missing course title');
    if (!course.worlds || course.worlds.length === 0) errors.push('Course must have at least one world');
    
    if (errors.length > 0) {
      throw new ContentValidationError(
        `Invalid course content for ${technology}`,
        'course',
        errors
      );
    }
    
    return course;
  } catch (error) {
    if (error instanceof ContentLoadError) {
      throw error;
    }
    throw new ContentLoadError(
      `Failed to load course for ${technology}`,
      'course',
      technology,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// World Loader
// -----------------------------------------------------------------------------

export async function loadWorld(technology: string, worldId: string): Promise<World> {
  const path = `/src/content/${technology}/world.json`;
  try {
    const world = await loadJSON<World>(path);
    
    if (world.id !== worldId) {
      throw new ContentValidationError(
        `World ID mismatch: expected ${worldId}, got ${world.id}`,
        'world',
        ['World ID does not match requested ID']
      );
    }
    
    return world;
  } catch (error) {
    if (error instanceof ContentLoadError) {
      throw error;
    }
    throw new ContentLoadError(
      `Failed to load world ${worldId}`,
      'world',
      worldId,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// Chapter Loader
// -----------------------------------------------------------------------------

export async function loadChapter(technology: string, chapterId: string): Promise<Chapter> {
  const path = `/src/content/${technology}/chapters/${chapterId}.json`;
  try {
    const chapter = await loadJSON<Chapter>(path);
    
    // Validate required fields
    const errors: string[] = [];
    if (!chapter.id) errors.push('Missing chapter id');
    if (!chapter.title) errors.push('Missing chapter title');
    if (!chapter.lessons || chapter.lessons.length === 0) errors.push('Chapter must have at least one lesson');
    
    if (errors.length > 0) {
      throw new ContentValidationError(
        `Invalid chapter content: ${chapterId}`,
        'chapter',
        errors
      );
    }
    
    return chapter;
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      throw error;
    }
    throw new ContentLoadError(
      `Failed to load chapter ${chapterId}`,
      'chapter',
      chapterId,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// Lesson Loader
// -----------------------------------------------------------------------------

export async function loadLesson(technology: string, lessonId: string): Promise<Lesson> {
  const path = `/src/content/${technology}/lessons/${lessonId}.json`;
  try {
    const lesson = await loadJSON<Lesson>(path);
    
    // Validate required fields
    const errors: string[] = [];
    if (!lesson.id) errors.push('Missing lesson id');
    if (!lesson.title) errors.push('Missing lesson title');
    if (!lesson.sections || lesson.sections.length === 0) errors.push('Lesson must have at least one section');
    if (!lesson.difficulty) errors.push('Missing difficulty level');
    if (!lesson.learningObjectives || lesson.learningObjectives.length === 0) {
      errors.push('Lesson must have at least one learning objective');
    }
    
    if (errors.length > 0) {
      throw new ContentValidationError(
        `Invalid lesson content: ${lessonId}`,
        'lesson',
        errors
      );
    }
    
    return lesson;
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      throw error;
    }
    throw new ContentLoadError(
      `Failed to load lesson ${lessonId}`,
      'lesson',
      lessonId,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// Quiz Loader
// -----------------------------------------------------------------------------

export async function loadQuiz(technology: string, quizId: string): Promise<Quiz> {
  const path = `/src/content/${technology}/quizzes/${quizId}.json`;
  try {
    const quiz = await loadJSON<Quiz>(path);
    
    // Validate required fields
    const errors: string[] = [];
    if (!quiz.id) errors.push('Missing quiz id');
    if (!quiz.title) errors.push('Missing quiz title');
    if (!quiz.questions || quiz.questions.length === 0) errors.push('Quiz must have at least one question');
    
    if (errors.length > 0) {
      throw new ContentValidationError(
        `Invalid quiz content: ${quizId}`,
        'quiz',
        errors
      );
    }
    
    return quiz;
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      throw error;
    }
    throw new ContentLoadError(
      `Failed to load quiz ${quizId}`,
      'quiz',
      quizId,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// Boss Battle Loader
// -----------------------------------------------------------------------------

export async function loadBossBattle(technology: string, bossId: string): Promise<BossBattle> {
  const path = `/src/content/${technology}/boss-battles/${bossId}.json`;
  try {
    const boss = await loadJSON<BossBattle>(path);
    
    // Validate required fields
    const errors: string[] = [];
    if (!boss.id) errors.push('Missing boss battle id');
    if (!boss.title) errors.push('Missing boss battle title');
    if (!boss.bossName) errors.push('Missing boss name');
    if (!boss.challenges || boss.challenges.length === 0) errors.push('Boss battle must have at least one challenge');
    
    if (errors.length > 0) {
      throw new ContentValidationError(
        `Invalid boss battle content: ${bossId}`,
        'boss-battle',
        errors
      );
    }
    
    return boss;
  } catch (error) {
    if (error instanceof ContentNotFoundError) {
      throw error;
    }
    throw new ContentLoadError(
      `Failed to load boss battle ${bossId}`,
      'boss-battle',
      bossId,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// Shared Content Loaders
// -----------------------------------------------------------------------------

export async function loadAchievements(): Promise<Achievement[]> {
  const path = '/src/content/shared/achievements.json';
  try {
    return await loadJSON<Achievement[]>(path);
  } catch (error) {
    throw new ContentLoadError(
      'Failed to load achievements',
      'achievement',
      undefined,
      error as Error
    );
  }
}

export async function loadBadges(): Promise<Badge[]> {
  const path = '/src/content/shared/badges.json';
  try {
    return await loadJSON<Badge[]>(path);
  } catch (error) {
    throw new ContentLoadError(
      'Failed to load badges',
      'badge',
      undefined,
      error as Error
    );
  }
}

// -----------------------------------------------------------------------------
// Bulk Loaders
// -----------------------------------------------------------------------------

export interface CourseContent {
  course: Course;
  world: World;
  chapters: Chapter[];
  lessons: Lesson[];
  quizzes: Quiz[];
  bossBattles: BossBattle[];
}

export async function loadFullCourse(technology: string): Promise<CourseContent> {
  const course = await loadCourse(technology);
  const world = await loadWorld(technology, course.worlds[0]);
  
  const chapters: Chapter[] = [];
  const lessons: Lesson[] = [];
  const quizzes: Quiz[] = [];
  const bossBattles: BossBattle[] = [];
  
  // Load all chapters
  for (const chapterId of world.chapters) {
    const chapter = await loadChapter(technology, chapterId);
    chapters.push(chapter);
    
    // Load all lessons in chapter
    for (const lessonId of chapter.lessons) {
      try {
        const lesson = await loadLesson(technology, lessonId);
        lessons.push(lesson);
      } catch (error) {
        console.warn(`Failed to load lesson ${lessonId}:`, error);
      }
    }
    
    // Load quiz if exists
    if (chapter.quizId) {
      try {
        const quiz = await loadQuiz(technology, chapter.quizId);
        quizzes.push(quiz);
      } catch (error) {
        console.warn(`Failed to load quiz ${chapter.quizId}:`, error);
      }
    }
    
    // Load boss battle if exists
    if (chapter.bossBattleId) {
      try {
        const boss = await loadBossBattle(technology, chapter.bossBattleId);
        bossBattles.push(boss);
      } catch (error) {
        console.warn(`Failed to load boss battle ${chapter.bossBattleId}:`, error);
      }
    }
  }
  
  return { course, world, chapters, lessons, quizzes, bossBattles };
}

// -----------------------------------------------------------------------------
// Content Index (for search and discovery)
// -----------------------------------------------------------------------------

export interface ContentIndex {
  lessons: Array<{
    id: string;
    title: string;
    technology: string;
    difficulty: string;
    tags: string[];
    keywords: string[];
    estimatedTimeMinutes: number;
  }>;
  chapters: Array<{
    id: string;
    title: string;
    technology: string;
    lessonCount: number;
  }>;
  courses: Array<{
    id: string;
    title: string;
    technology: string;
    totalXP: number;
  }>;
}

export async function buildContentIndex(technologies: string[]): Promise<ContentIndex> {
  const index: ContentIndex = {
    lessons: [],
    chapters: [],
    courses: [],
  };
  
  for (const tech of technologies) {
    try {
      const course = await loadCourse(tech);
      index.courses.push({
        id: course.id,
        title: course.title,
        technology: tech,
        totalXP: course.totalXP,
      });
      
      const world = await loadWorld(tech, course.worlds[0]);
      
      for (const chapterId of world.chapters) {
        const chapter = await loadChapter(tech, chapterId);
        index.chapters.push({
          id: chapter.id,
          title: chapter.title,
          technology: tech,
          lessonCount: chapter.lessons.length,
        });
        
        for (const lessonId of chapter.lessons) {
          try {
            const lesson = await loadLesson(tech, lessonId);
            index.lessons.push({
              id: lesson.id,
              title: lesson.title,
              technology: tech,
              difficulty: lesson.difficulty,
              tags: lesson.tags,
              keywords: lesson.keywords,
              estimatedTimeMinutes: lesson.estimatedTimeMinutes,
            });
          } catch (error) {
            console.warn(`Failed to index lesson ${lessonId}:`, error);
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to index course ${tech}:`, error);
    }
  }
  
  return index;
}
