/**
 * ScribbleCode Progression Engine - Event System
 * 
 * Centralized event emission and handling for progression events.
 * Enables loose coupling between systems and UI notifications.
 */

import { ProgressEvent, ProgressEventType, NotificationData, CelebrationData } from '../types';

// ============================================================================
// Event Listener Types
// ============================================================================

export type EventListener = (event: ProgressEvent) => void;

export interface EventSubscription {
  unsubscribe: () => void;
}

// ============================================================================
// Event Emitter Class
// ============================================================================

export class ProgressionEventEmitter {
  private listeners: Map<ProgressEventType | '*', Set<EventListener>> = new Map();
  private eventHistory: ProgressEvent[] = [];
  private maxHistoryLength: number = 100;

  /**
   * Subscribe to a specific event type or all events ('*')
   */
  on(eventType: ProgressEventType | '*', listener: EventListener): EventSubscription {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    const eventListeners = this.listeners.get(eventType)!;
    eventListeners.add(listener);
    
    return {
      unsubscribe: () => {
        eventListeners.delete(listener);
        if (eventListeners.size === 0) {
          this.listeners.delete(eventType);
        }
      },
    };
  }

  /**
   * Subscribe to an event type once (auto-unsubscribes after first trigger)
   */
  once(eventType: ProgressEventType | '*', listener: EventListener): EventSubscription {
    const wrappedListener = (event: ProgressEvent) => {
      listener(event);
      subscription.unsubscribe();
    };
    
    const subscription = this.on(eventType, wrappedListener);
    return subscription;
  }

  /**
   * Emit a progression event
   */
  emit(eventType: ProgressEventType, payload: Record<string, any>, playerId: string): ProgressEvent {
    const event: ProgressEvent = {
      type: eventType,
      payload,
      timestamp: new Date().toISOString(),
      playerId,
    };
    
    // Store in history
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistoryLength) {
      this.eventHistory.shift();
    }
    
    // Notify wildcard listeners first
    const wildcardListeners = this.listeners.get('*');
    if (wildcardListeners) {
      wildcardListeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.error('Error in wildcard event listener:', error);
        }
      });
    }
    
    // Notify specific event listeners
    const specificListeners = this.listeners.get(eventType);
    if (specificListeners) {
      specificListeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.error(`Error in event listener for ${eventType}:`, error);
        }
      });
    }
    
    return event;
  }

  /**
   * Get recent event history
   */
  getHistory(limit: number = 10): ProgressEvent[] {
    return this.eventHistory.slice(-limit);
  }

  /**
   * Clear event history
   */
  clearHistory(): void {
    this.eventHistory = [];
  }

  /**
   * Remove all listeners
   */
  removeAllListeners(): void {
    this.listeners.clear();
  }

  /**
   * Get listener count for an event type
   */
  listenerCount(eventType: ProgressEventType | '*'): number {
    const listeners = this.listeners.get(eventType);
    return listeners ? listeners.size : 0;
  }
}

// ============================================================================
// Notification Helper Functions
// ============================================================================

/**
 * Create a notification from a progression event
 */
export function createNotificationFromEvent(
  event: ProgressEvent
): NotificationData | null {
  switch (event.type) {
    case 'xp_earned':
      return {
        id: `notif_${Date.now()}_${Math.random()}`,
        type: 'success',
        title: '+XP Earned!',
        message: `+${event.payload.amount} XP from ${event.payload.source || 'activity'}`,
        icon: '⭐',
        isDismissible: true,
        duration: 3000,
      };
    
    case 'level_up':
      return {
        id: `notif_${Date.now()}_${Math.random()}`,
        type: 'celebration',
        title: '🎉 Level Up!',
        message: `You reached Level ${event.payload.newLevel}!`,
        icon: '🆙',
        action: {
          label: 'View Progress',
          handler: () => console.log('Navigate to progress screen'),
        },
        isDismissible: false,
        duration: 5000,
      };
    
    case 'achievement_unlocked':
      return {
        id: `notif_${Date.now()}_${Math.random()}`,
        type: 'celebration',
        title: '🏆 Achievement Unlocked!',
        message: event.payload.name || 'New Achievement',
        icon: '✨',
        isDismissible: false,
        duration: 6000,
      };
    
    case 'badge_earned':
      return {
        id: `notif_${Date.now()}_${Math.random()}`,
        type: 'celebration',
        title: '🎖️ Badge Earned!',
        message: event.payload.name || 'New Badge',
        icon: '🌟',
        isDismissible: false,
        duration: 6000,
      };
    
    case 'streak_updated':
      if (event.payload.isRecord) {
        return {
          id: `notif_${Date.now()}_${Math.random()}`,
          type: 'celebration',
          title: '🔥 New Record!',
          message: `${event.payload.newStreak} day streak!`,
          icon: '💫',
          isDismissible: true,
          duration: 4000,
        };
      }
      return null;
    
    case 'challenge_completed':
      return {
        id: `notif_${Date.now()}_${Math.random()}`,
        type: 'success',
        title: '✅ Challenge Complete!',
        message: event.payload.title || 'Daily Challenge Completed',
        icon: '🎯',
        isDismissible: true,
        duration: 4000,
      };
    
    default:
      return null;
  }
}

/**
 * Create celebration data from a progression event
 */
export function createCelebrationFromEvent(
  event: ProgressEvent
): CelebrationData | null {
  switch (event.type) {
    case 'level_up':
      return {
        type: 'fireworks',
        intensity: 'high',
        duration: 2000,
        metadata: {
          level: event.payload.newLevel,
        },
      };
    
    case 'achievement_unlocked':
      return {
        type: 'stamp',
        intensity: 'medium',
        duration: 1500,
        metadata: {
          achievementId: event.payload.id,
          rarity: event.payload.rarity,
        },
      };
    
    case 'badge_earned':
      return {
        type: 'pop',
        intensity: 'medium',
        duration: 1500,
        metadata: {
          badgeId: event.payload.id,
          tier: event.payload.tier,
        },
      };
    
    case 'xp_earned':
      if (event.payload.amount >= 50) {
        return {
          type: 'float',
          intensity: 'low',
          duration: 1000,
          metadata: {
            amount: event.payload.amount,
          },
        };
      }
      return null;
    
    case 'world_completed':
      return {
        type: 'confetti',
        intensity: 'high',
        duration: 3000,
        metadata: {
          worldId: event.payload.worldId,
        },
      };
    
    case 'boss_defeated':
      return {
        type: 'burst',
        intensity: 'high',
        duration: 2500,
        metadata: {
          bossName: event.payload.bossName,
        },
      };
    
    default:
      return null;
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let globalEventEmitter: ProgressionEventEmitter | null = null;

/**
 * Get the global progression event emitter instance
 */
export function getProgressionEventEmitter(): ProgressionEventEmitter {
  if (!globalEventEmitter) {
    globalEventEmitter = new ProgressionEventEmitter();
  }
  return globalEventEmitter;
}

/**
 * Reset the global event emitter (useful for testing)
 */
export function resetProgressionEventEmitter(): void {
  if (globalEventEmitter) {
    globalEventEmitter.removeAllListeners();
    globalEventEmitter.clearHistory();
    globalEventEmitter = null;
  }
}
