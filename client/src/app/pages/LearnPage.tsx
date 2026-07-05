/**
 * LearnPage - Main Lesson Player
 * Integrates Learning Engine, Progression Engine, and Content Engine
 */

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLessonEngine } from '../../../lesson-engine/hooks/useLessonEngine';
import { contentLoader } from '../../content-engine/loaders';
import type { BaseLesson } from '../../content-engine/schemas';
import { useProgressionStore } from '../store/useProgressionStore';
import { getRendererComponent } from '../../../lesson-engine/core/renderer-registry';
import { ReadingRenderer } from '../../../lesson-engine/renderers/ReadingRenderer';
import { MultipleChoiceRenderer } from '../../../lesson-engine/renderers/MultipleChoiceRenderer';
import { ReflectionRenderer } from '../../../lesson-engine/renderers/ReflectionRenderer';
import { CodePlaygroundRenderer } from '../../../lesson-engine/renderers/CodePlaygroundRenderer';

// Register renderers
import { registerRenderers } from '../../../lesson-engine/core/renderer-registry';

registerRenderers([
  { type: 'text', component: ReadingRenderer as any, validator: () => ({ valid: true }) },
  { type: 'code', component: CodePlaygroundRenderer as any, validator: () => ({ valid: true }) },
  { type: 'markdown', component: ReadingRenderer as any, validator: () => ({ valid: true }) },
  { type: 'callout', component: ReadingRenderer as any, validator: () => ({ valid: true }) },
  { type: 'multiple-choice', component: MultipleChoiceRenderer as any, validator: () => ({ valid: true }) },
  { type: 'fill-blank', component: MultipleChoiceRenderer as any, validator: () => ({ valid: true }) },
  { type: 'reflection', component: ReflectionRenderer as any, validator: () => ({ valid: true }) },
]);

export default function LearnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lessonId = searchParams.get('lesson');
  
  const { profile, completeLesson: completeLessonInStore, lastLessonSummary, dismissCelebration } = useProgressionStore();
  
  const [lesson, setLesson] = useState<BaseLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [currentSectionAnswer, setCurrentSectionAnswer] = useState<any>(null);

  const lessonEngine = useLessonEngine({
    initialLesson: lesson || undefined,
    onComplete: (xpBreakdown) => {
      console.log('Lesson completed! XP:', xpBreakdown.totalXP);
    },
    debug: true,
  });

  // Load lesson content
  useEffect(() => {
    async function loadLessonContent() {
      if (!lessonId) {
        setError('No lesson ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const loadedLesson = await contentLoader.loadLesson(lessonId);
        
        if (!loadedLesson) {
          setError(`Lesson "${lessonId}" not found`);
          setLoading(false);
          return;
        }

        setLesson(loadedLesson);
        lessonEngine.loadLesson(loadedLesson);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lesson');
        setLoading(false);
      }
    }

    loadLessonContent();
  }, [lessonId]);

  // Handle lesson completion
  useEffect(() => {
    if (lessonEngine.isCompleted && lesson && !showSummary) {
      const xpBreakdown = lessonEngine.xpBreakdown;
      
      if (xpBreakdown && profile) {
        // Record lesson completion in progression store
        completeLessonInStore({
          playerId: profile.id,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          xpEarned: xpBreakdown.totalXP,
          coinsEarned: lesson.rewards?.coins?.base || 10,
          accuracy: xpBreakdown.accuracy || 100,
          timeSpentMinutes: lesson.estimatedTimeMinutes || 5,
          hintsUsed: 0,
          attempts: 1,
          completedAt: new Date().toISOString(),
        });
        
        setShowSummary(true);
      }
    }
  }, [lessonEngine.isCompleted, lesson, profile, showSummary]);

  const handleContinue = useCallback(() => {
    if (lesson?.nextLessonId) {
      navigate(`/learn?lesson=${lesson.nextLessonId}`);
    } else {
      navigate('/map');
    }
  }, [lesson, navigate]);

  const handleCloseSummary = useCallback(() => {
    dismissCelebration();
    setShowSummary(false);
  }, [dismissCelebration]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-ink mx-auto mb-4"></div>
          <p className="text-xl font-handwriting text-ink/80">Loading lesson...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-body text-ink/80 mb-6">{error || 'Lesson not found'}</p>
          <button
            onClick={() => navigate('/map')}
            className="px-6 py-3 bg-ink text-paper rounded-lg hover:opacity-90 transition"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  // Summary screen
  if (showSummary && lastLessonSummary) {
    return (
      <div className="min-h-screen bg-paper p-8">
        <div className="max-w-2xl mx-auto">
          <div className="notebook-page p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-green-600 mb-2">🎉 Lesson Complete!</h1>
              <p className="text-xl text-ink/70">{lesson.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-paper/50 p-4 rounded-lg text-center">
                <p className="text-sm text-ink/60">XP Earned</p>
                <p className="text-3xl font-bold text-ink">{lastLessonSummary.xpEarned.totalXP}</p>
              </div>
              <div className="bg-paper/50 p-4 rounded-lg text-center">
                <p className="text-sm text-ink/60">Coins Earned</p>
                <p className="text-3xl font-bold text-yellow-600">{lastLessonSummary.coinsEarned}</p>
              </div>
              <div className="bg-paper/50 p-4 rounded-lg text-center">
                <p className="text-sm text-ink/60">Accuracy</p>
                <p className="text-3xl font-bold text-ink">{Math.round(lastLessonSummary.accuracy)}%</p>
              </div>
              <div className="bg-paper/50 p-4 rounded-lg text-center">
                <p className="text-sm text-ink/60">Current Streak</p>
                <p className="text-3xl font-bold text-orange-500">{lastLessonSummary.streakAfter} 🔥</p>
              </div>
            </div>

            {lastLessonSummary.leveledUp && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg mb-8 text-center animate-pulse">
                <p className="text-2xl font-bold">🎊 Level Up! 🎊</p>
                <p className="text-lg">You reached Level {lastLessonSummary.levelAfter}!</p>
              </div>
            )}

            {lastLessonSummary.newAchievements && lastLessonSummary.newAchievements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">🏆 New Achievements</h2>
                <div className="space-y-2">
                  {lastLessonSummary.newAchievements.map((achievement, idx) => (
                    <div key={idx} className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                      <p className="font-semibold">{achievement.name}</p>
                      <p className="text-sm text-ink/70">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCloseSummary}
                className="px-6 py-3 border-2 border-ink rounded-lg hover:bg-ink/10 transition"
              >
                Review Lesson
              </button>
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-ink text-paper rounded-lg hover:opacity-90 transition font-semibold"
              >
                {lesson.nextLessonId ? 'Next Lesson →' : 'Back to Map'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main lesson player
  const currentSection = lessonEngine.currentSection;
  const progressPercent = lessonEngine.progressPercent;

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b-2 border-ink/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate('/map')}
              className="text-ink/60 hover:text-ink transition"
            >
              ← Back to Map
            </button>
            <span className="text-sm text-ink/60">
              {lessonEngine.currentSectionIndex + 1} / {lessonEngine.totalSections}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-3 bg-ink/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          <h1 className="text-xl font-bold mt-2">{lesson.title}</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentSection && (
          <div className="notebook-page p-8 rounded-lg shadow-lg">
            {/* Section title */}
            {currentSection.title && (
              <h2 className="text-2xl font-bold mb-6 text-ink">{currentSection.title}</h2>
            )}

            {/* Render section based on type */}
            {(() => {
              const Renderer = getRendererComponent(currentSection.type);
              
              if (!Renderer) {
                return (
                  <div className="text-red-600">
                    No renderer found for type: {currentSection.type}
                  </div>
                );
              }

              return (
                <Renderer
                  section={currentSection}
                  value={currentSectionAnswer}
                  onChange={setCurrentSectionAnswer}
                  onSubmit={(answer) => {
                    if (currentSection.challenge) {
                      lessonEngine.submitChallenge(currentSection.challenge.id, answer);
                    } else {
                      lessonEngine.nextSection();
                    }
                  }}
                  disabled={false}
                />
              );
            })()}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t-2 border-ink/10">
              <button
                onClick={lessonEngine.prevSection}
                disabled={lessonEngine.currentSectionIndex === 0}
                className="px-6 py-2 border-2 border-ink/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-ink transition"
              >
                ← Previous
              </button>

              {!currentSection.challenge ? (
                <button
                  onClick={lessonEngine.nextSection}
                  className="px-6 py-2 bg-ink text-paper rounded-lg hover:opacity-90 transition"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (currentSectionAnswer) {
                      lessonEngine.submitChallenge(currentSection.challenge.id, currentSectionAnswer);
                    }
                  }}
                  className="px-6 py-2 bg-ink text-paper rounded-lg hover:opacity-90 transition"
                >
                  Submit Answer
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer with hint button */}
      {currentSection?.challenge && (
        <footer className="fixed bottom-4 right-4">
          <button
            onClick={() => {
              if (currentSection.challenge) {
                lessonEngine.requestHint(currentSection.challenge.id);
              }
            }}
            className="px-4 py-2 bg-yellow-400 text-ink rounded-full shadow-lg hover:bg-yellow-300 transition flex items-center gap-2"
          >
            💡 Hint ({lessonEngine.hintsRemaining(currentSection.challenge.id)})
          </button>
        </footer>
      )}
    </div>
  );
}
