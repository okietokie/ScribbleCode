/**
 * ScribbleCode Content Engine - Content Loader
 * 
 * This module provides the content loading layer for all learning content.
 * It loads worlds, chapters, lessons, quizzes, boss battles, achievements, and badges
 * from JSON files and returns strongly typed objects.
 * 
 * This layer only provides data - no UI rendering.
 */

import {
  Course,
  World,
  Chapter,
  BaseLesson,
  Quiz,
  BossBattle,
  Achievement,
  Badge,
  Challenge,
  ContentLoadOptions,
  ContentQueryResult,
  ContentLoader,
} from '../schemas';

// ============================================================================
// CONTENT REGISTRY
// ============================================================================

/**
 * In-memory cache for loaded content
 * This prevents repeated file reads during development
 */
class ContentCache {
  private courses: Map<string, Course> = new Map();
  private worlds: Map<string, World> = new Map();
  private chapters: Map<string, Chapter> = new Map();
  private lessons: Map<string, BaseLesson> = new Map();
  private quizzes: Map<string, Quiz> = new Map();
  private bossBattles: Map<string, BossBattle> = new Map();
  private achievements: Map<string, Achievement> = new Map();
  private badges: Map<string, Badge> = new Map();
  
  clear(): void {
    this.courses.clear();
    this.worlds.clear();
    this.chapters.clear();
    this.lessons.clear();
    this.quizzes.clear();
    this.bossBattles.clear();
    this.achievements.clear();
    this.badges.clear();
  }
  
  // Course cache
  setCourse(id: string, course: Course): void { this.courses.set(id, course); }
  getCourse(id: string): Course | undefined { return this.courses.get(id); }
  getAllCourses(): Course[] { return Array.from(this.courses.values()); }
  
  // World cache
  setWorld(id: string, world: World): void { this.worlds.set(id, world); }
  getWorld(id: string): World | undefined { return this.worlds.get(id); }
  getAllWorlds(): World[] { return Array.from(this.worlds.values()); }
  
  // Chapter cache
  setChapter(id: string, chapter: Chapter): void { this.chapters.set(id, chapter); }
  getChapter(id: string): Chapter | undefined { return this.chapters.get(id); }
  getAllChapters(): Chapter[] { return Array.from(this.chapters.values()); }
  
  // Lesson cache
  setLesson(id: string, lesson: BaseLesson): void { this.lessons.set(id, lesson); }
  getLesson(id: string): BaseLesson | undefined { return this.lessons.get(id); }
  getAllLessons(): BaseLesson[] { return Array.from(this.lessons.values()); }
  
  // Quiz cache
  setQuiz(id: string, quiz: Quiz): void { this.quizzes.set(id, quiz); }
  getQuiz(id: string): Quiz | undefined { return this.quizzes.get(id); }
  getAllQuizzes(): Quiz[] { return Array.from(this.quizzes.values()); }
  
  // Boss Battle cache
  setBossBattle(id: string, bossBattle: BossBattle): void { this.bossBattles.set(id, bossBattle); }
  getBossBattle(id: string): BossBattle | undefined { return this.bossBattles.get(id); }
  getAllBossBattles(): BossBattle[] { return Array.from(this.bossBattles.values()); }
  
  // Achievement cache
  setAchievement(id: string, achievement: Achievement): void { this.achievements.set(id, achievement); }
  getAchievement(id: string): Achievement | undefined { return this.achievements.get(id); }
  getAllAchievements(): Achievement[] { return Array.from(this.achievements.values()); }
  
  // Badge cache
  setBadge(id: string, badge: Badge): void { this.badges.set(id, badge); }
  getBadge(id: string): Badge | undefined { return this.badges.get(id); }
  getAllBadges(): Badge[] { return Array.from(this.badges.values()); }
}

const cache = new ContentCache();

// ============================================================================
// CONTENT IMPORT HELPERS
// ============================================================================

/**
 * Dynamic import helper for JSON files
 * In a real Vite/React environment, these would be imported via import.meta.glob
 */
async function importJSON<T>(path: string): Promise<T | null> {
  try {
    // In development, we'll use dynamic imports
    // In production, this would be pre-bundled
    const module = await import(/* @vite-ignore */ path);
    return module.default as T;
  } catch (error) {
    console.warn(`Failed to load content from ${path}:`, error);
    return null;
  }
}

/**
 * Get base path for content files
 */
function getContentBasePath(technology: string): string {
  return `/src/content/${technology}`;
}

// ============================================================================
// COURSE LOADING
// ============================================================================

/**
 * Load a course by ID
 */
export async function loadCourse(courseId: string): Promise<Course | null> {
  const cached = cache.getCourse(courseId);
  if (cached) return cached;
  
  // Try to load from known course locations
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const path = `${getContentBasePath(tech)}/course.json`;
    const course = await importJSON<Course>(path);
    
    if (course && course.id === courseId) {
      cache.setCourse(courseId, course);
      return course;
    }
  }
  
  return null;
}

/**
 * Load all courses
 */
export async function loadAllCourses(options?: ContentLoadOptions): Promise<ContentQueryResult<Course>> {
  const allCourses: Course[] = [];
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const path = `${getContentBasePath(tech)}/course.json`;
    const course = await importJSON<Course>(path);
    
    if (course) {
      // Apply filters
      if (options?.technology && course.technology !== options.technology) {
        continue;
      }
      
      if (!options?.includeDraft && course.status === 'draft') {
        continue;
      }
      
      allCourses.push(course);
      cache.setCourse(course.id, course);
    }
  }
  
  // Apply pagination
  const offset = options?.offset || 0;
  const limit = options?.limit || allCourses.length;
  const paginated = allCourses.slice(offset, offset + limit);
  
  return {
    items: paginated,
    totalCount: allCourses.length,
    hasMore: offset + limit < allCourses.length,
    nextOffset: offset + limit < allCourses.length ? offset + limit : undefined,
  };
}

// ============================================================================
// WORLD LOADING
// ============================================================================

/**
 * Load a world by ID
 */
export async function loadWorld(worldId: string): Promise<World | null> {
  const cached = cache.getWorld(worldId);
  if (cached) return cached;
  
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const path = `${getContentBasePath(tech)}/world.json`;
    const world = await importJSON<World>(path);
    
    if (world && world.id === worldId) {
      cache.setWorld(worldId, world);
      return world;
    }
  }
  
  return null;
}

/**
 * Load all worlds
 */
export async function loadAllWorlds(options?: ContentLoadOptions): Promise<ContentQueryResult<World>> {
  const allWorlds: World[] = [];
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const path = `${getContentBasePath(tech)}/world.json`;
    const world = await importJSON<World>(path);
    
    if (world) {
      if (options?.technology && world.technology !== options.technology) {
        continue;
      }
      
      if (!world.isAvailable && !options?.includeHidden) {
        continue;
      }
      
      allWorlds.push(world);
      cache.setWorld(world.id, world);
    }
  }
  
  const offset = options?.offset || 0;
  const limit = options?.limit || allWorlds.length;
  const paginated = allWorlds.slice(offset, offset + limit);
  
  return {
    items: paginated,
    totalCount: allWorlds.length,
    hasMore: offset + limit < allWorlds.length,
    nextOffset: offset + limit < allWorlds.length ? offset + limit : undefined,
  };
}

/**
 * Load worlds for a specific course
 */
export async function loadWorldsForCourse(courseId: string): Promise<World[]> {
  const course = await loadCourse(courseId);
  if (!course) return [];
  
  const worlds: World[] = [];
  
  for (const worldId of course.worldIds) {
    const world = await loadWorld(worldId);
    if (world) {
      worlds.push(world);
    }
  }
  
  return worlds.sort((a, b) => a.order - b.order);
}

// ============================================================================
// CHAPTER LOADING
// ============================================================================

/**
 * Load a chapter by ID
 */
export async function loadChapter(chapterId: string): Promise<Chapter | null> {
  const cached = cache.getChapter(chapterId);
  if (cached) return cached;
  
  // Chapters are typically in chapter directories
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const basePath = getContentBasePath(tech);
    const chapterDirs = ['chapters', 'chapters/*'];
    
    for (const dir of chapterDirs) {
      const path = `${basePath}/${dir}/${chapterId}.json`;
      const chapter = await importJSON<Chapter>(path);
      
      if (chapter && chapter.id === chapterId) {
        cache.setChapter(chapterId, chapter);
        return chapter;
      }
    }
  }
  
  return null;
}

/**
 * Load chapters for a world
 */
export async function loadChaptersForWorld(worldId: string): Promise<Chapter[]> {
  const world = await loadWorld(worldId);
  if (!world) return [];
  
  const chapters: Chapter[] = [];
  
  for (const chapterId of world.chapterIds) {
    const chapter = await loadChapter(chapterId);
    if (chapter) {
      chapters.push(chapter);
    }
  }
  
  return chapters.sort((a, b) => a.order - b.order);
}

// ============================================================================
// LESSON LOADING
// ============================================================================

/**
 * Load a lesson by ID
 */
export async function loadLesson(lessonId: string): Promise<BaseLesson | null> {
  const cached = cache.getLesson(lessonId);
  if (cached) return cached;
  
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const basePath = getContentBasePath(tech);
    
    // Try lessons directory
    const lessonPath = `${basePath}/lessons/${lessonId}.json`;
    const lesson = await importJSON<BaseLesson>(lessonPath);
    
    if (lesson && lesson.id === lessonId) {
      cache.setLesson(lessonId, lesson);
      return lesson;
    }
  }
  
  return null;
}

/**
 * Load lessons for a chapter
 */
export async function loadLessonsForChapter(chapterId: string): Promise<BaseLesson[]> {
  const chapter = await loadChapter(chapterId);
  if (!chapter) return [];
  
  const lessons: BaseLesson[] = [];
  
  for (const lessonId of chapter.lessonIds) {
    const lesson = await loadLesson(lessonId);
    if (lesson) {
      lessons.push(lesson);
    }
  }
  
  return lessons;
}

/**
 * Get lesson by path/slug
 */
export async function getLessonByPath(path: string): Promise<BaseLesson | null> {
  // Path format: /learn/javascript/chapter-1/lesson-1
  const parts = path.split('/').filter(Boolean);
  
  if (parts.length < 4) {
    return null;
  }
  
  const technology = parts[1];
  const lessonId = parts[parts.length - 1];
  
  const basePath = getContentBasePath(technology);
  const lessonPath = `${basePath}/lessons/${lessonId}.json`;
  const lesson = await importJSON<BaseLesson>(lessonPath);
  
  if (lesson) {
    cache.setLesson(lesson.id, lesson);
  }
  
  return lesson;
}

// ============================================================================
// QUIZ LOADING
// ============================================================================

/**
 * Load a quiz by ID
 */
export async function loadQuiz(quizId: string): Promise<Quiz | null> {
  const cached = cache.getQuiz(quizId);
  if (cached) return cached;
  
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const basePath = getContentBasePath(tech);
    const quizPath = `${basePath}/quizzes/${quizId}.json`;
    const quiz = await importJSON<Quiz>(quizPath);
    
    if (quiz && quiz.id === quizId) {
      cache.setQuiz(quizId, quiz);
      return quiz;
    }
  }
  
  return null;
}

// ============================================================================
// BOSS BATTLE LOADING
// ============================================================================

/**
 * Load a boss battle by ID
 */
export async function loadBossBattle(bossBattleId: string): Promise<BossBattle | null> {
  const cached = cache.getBossBattle(bossBattleId);
  if (cached) return cached;
  
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const basePath = getContentBasePath(tech);
    const bossPath = `${basePath}/boss-battles/${bossBattleId}.json`;
    const bossBattle = await importJSON<BossBattle>(bossPath);
    
    if (bossBattle && bossBattle.id === bossBattleId) {
      cache.setBossBattle(bossBattleId, bossBattle);
      return bossBattle;
    }
  }
  
  return null;
}

// ============================================================================
// ACHIEVEMENT LOADING
// ============================================================================

/**
 * Load an achievement by ID
 */
export async function loadAchievement(achievementId: string): Promise<Achievement | null> {
  const cached = cache.getAchievement(achievementId);
  if (cached) return cached;
  
  const achievementsPath = '/src/content/shared/achievements.json';
  const achievementsData = await importJSON<{ achievements: Achievement[] }>(achievementsPath);
  
  if (achievementsData) {
    const achievement = achievementsData.achievements.find(a => a.id === achievementId);
    if (achievement) {
      cache.setAchievement(achievementId, achievement);
      return achievement;
    }
  }
  
  return null;
}

/**
 * Load all achievements
 */
export async function loadAllAchievements(): Promise<Achievement[]> {
  const cached = cache.getAllAchievements();
  if (cached.length > 0) return cached;
  
  const achievementsPath = '/src/content/shared/achievements.json';
  const achievementsData = await importJSON<{ achievements: Achievement[] }>(achievementsPath);
  
  if (achievementsData) {
    achievementsData.achievements.forEach(a => cache.setAchievement(a.id, a));
    return achievementsData.achievements;
  }
  
  return [];
}

// ============================================================================
// BADGE LOADING
// ============================================================================

/**
 * Load a badge by ID
 */
export async function loadBadge(badgeId: string): Promise<Badge | null> {
  const cached = cache.getBadge(badgeId);
  if (cached) return cached;
  
  const badgesPath = '/src/content/shared/badges.json';
  const badgesData = await importJSON<{ badges: Badge[] }>(badgesPath);
  
  if (badgesData) {
    const badge = badgesData.badges.find(b => b.id === badgeId);
    if (badge) {
      cache.setBadge(badgeId, badge);
      return badge;
    }
  }
  
  return null;
}

/**
 * Load all badges
 */
export async function loadAllBadges(): Promise<Badge[]> {
  const cached = cache.getAllBadges();
  if (cached.length > 0) return cached;
  
  const badgesPath = '/src/content/shared/badges.json';
  const badgesData = await importJSON<{ badges: Badge[] }>(badgesPath);
  
  if (badgesData) {
    badgesData.badges.forEach(b => cache.setBadge(b.id, b));
    return badgesData.badges;
  }
  
  return [];
}

// ============================================================================
// SEARCH
// ============================================================================

/**
 * Search content across all types
 */
export async function searchContent(
  query: string,
  options?: ContentLoadOptions
): Promise<ContentQueryResult<BaseLesson | World | Chapter>> {
  const results: (BaseLesson | World | Chapter)[] = [];
  const queryLower = query.toLowerCase();
  
  // Search lessons
  const technologies = ['javascript', 'typescript', 'react', 'node', 'shared'];
  
  for (const tech of technologies) {
    const basePath = getContentBasePath(tech);
    
    // Would need glob import for full search
    // For now, search is limited
    
    if (options?.tags) {
      // Tag-based filtering would go here
    }
    
    if (options?.difficulty) {
      // Difficulty filtering would go here
    }
  }
  
  const offset = options?.offset || 0;
  const limit = options?.limit || results.length;
  const paginated = results.slice(offset, offset + limit);
  
  return {
    items: paginated,
    totalCount: results.length,
    hasMore: offset + limit < results.length,
    nextOffset: offset + limit < results.length ? offset + limit : undefined,
  };
}

// ============================================================================
// CONTENT LOADER CLASS
// ============================================================================

/**
 * Main ContentLoader class implementing the ContentLoader interface
 */
export class ScribbleCodeContentLoader implements ContentLoader {
  async loadCourse(courseId: string): Promise<Course | null> {
    return loadCourse(courseId);
  }
  
  async loadAllCourses(options?: ContentLoadOptions): Promise<ContentQueryResult<Course>> {
    return loadAllCourses(options);
  }
  
  async loadWorld(worldId: string): Promise<World | null> {
    return loadWorld(worldId);
  }
  
  async loadWorldsForCourse(courseId: string): Promise<World[]> {
    return loadWorldsForCourse(courseId);
  }
  
  async loadChapter(chapterId: string): Promise<Chapter | null> {
    return loadChapter(chapterId);
  }
  
  async loadChaptersForWorld(worldId: string): Promise<Chapter[]> {
    return loadChaptersForWorld(worldId);
  }
  
  async loadLesson(lessonId: string): Promise<BaseLesson | null> {
    return loadLesson(lessonId);
  }
  
  async loadLessonsForChapter(chapterId: string): Promise<BaseLesson[]> {
    return loadLessonsForChapter(chapterId);
  }
  
  async loadQuiz(quizId: string): Promise<Quiz | null> {
    return loadQuiz(quizId);
  }
  
  async loadBossBattle(bossBattleId: string): Promise<BossBattle | null> {
    return loadBossBattle(bossBattleId);
  }
  
  async loadAchievement(achievementId: string): Promise<Achievement | null> {
    return loadAchievement(achievementId);
  }
  
  async loadAllAchievements(): Promise<Achievement[]> {
    return loadAllAchievements();
  }
  
  async loadBadge(badgeId: string): Promise<Badge | null> {
    return loadBadge(badgeId);
  }
  
  async loadAllBadges(): Promise<Badge[]> {
    return loadAllBadges();
  }
  
  async searchContent(
    query: string,
    options?: ContentLoadOptions
  ): Promise<ContentQueryResult<BaseLesson | World | Chapter>> {
    return searchContent(query, options);
  }
  
  async getLessonByPath(path: string): Promise<BaseLesson | null> {
    return getLessonByPath(path);
  }
  
  /**
   * Clear the content cache
   * Useful for hot-reloading during development
   */
  clearCache(): void {
    cache.clear();
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

/**
 * Default content loader instance
 */
export const contentLoader = new ScribbleCodeContentLoader();

// ============================================================================
// EXPORT ALL
// ============================================================================

export {
  ContentCache,
};

export default contentLoader;
