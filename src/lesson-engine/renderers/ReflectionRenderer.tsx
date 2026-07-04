/**
 * Reflection Section Renderer
 * Prompts learners to reflect on what they've learned.
 */

import React, { useState } from 'react';
import { RendererProps } from '../core/types';
import { ReflectionSection } from '../../content-engine/schemas';

interface ReflectionRendererConfig {
  minLength?: number;
  showExample?: boolean;
  allowSkip?: boolean;
}

export const ReflectionRenderer: React.FC<RendererProps> = ({
  section,
  state,
  onSubmit,
  isCompleted,
  config,
}) => {
  const reflectionSection = section as ReflectionSection;
  const {
    minLength = 20,
    showExample = true,
    allowSkip = reflectionSection.isSkippable ?? false,
  } = (config || {}) as ReflectionRendererConfig;

  const [reflection, setReflection] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (reflection.trim().length < minLength) {
      setError(`Please write at least ${minLength} characters to reflect on your learning.`);
      return;
    }

    setHasSubmitted(true);
    setError(null);
    
    // Reflections are subjective, so we accept any thoughtful response
    onSubmit({
      text: reflection,
      length: reflection.length,
    });
  };

  const handleSkip = () => {
    if (allowSkip) {
      onSubmit({ skipped: true });
    }
  };

  const characterCount = reflection.length;
  const meetsMinimum = characterCount >= minLength;

  return (
    <div className="reflection-section" data-section-id={section.id}>
      <header className="section-header">
        <h2>{section.title}</h2>
        <p className="section-subtitle">Take a moment to reflect on what you've learned</p>
      </header>

      <article className="reflection-content">
        {/* Prompt */}
        <div className="prompt">
          <h3>🤔 {reflectionSection.question.prompt}</h3>
          
          {reflectionSection.question.guidance && (
            <div className="guidance">
              <p>{reflectionSection.question.guidance}</p>
            </div>
          )}
        </div>

        {/* Example Answer (optional) */}
        {showExample && reflectionSection.question.exampleAnswer && (
          <details className="example-answer">
            <summary>💡 See an example answer</summary>
            <blockquote>
              {reflectionSection.question.exampleAnswer}
            </blockquote>
          </details>
        )}

        {/* Text Area */}
        <div className="reflection-input-container">
          <label htmlFor="reflection-input" className="sr-only">
            Your reflection
          </label>
          <textarea
            id="reflection-input"
            className="reflection-input"
            value={reflection}
            onChange={(e) => {
              setReflection(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Type your thoughts here..."
            rows={6}
            disabled={hasSubmitted}
            aria-describedby="character-count"
            aria-invalid={!!error}
          />
          
          {/* Character Count */}
          <div 
            id="character-count" 
            className={`character-count ${meetsMinimum ? 'met' : ''}`}
            aria-live="polite"
          >
            {characterCount} / {minLength} characters
            {!meetsMinimum && (
              <span className="remaining">
                ({minLength - characterCount} more needed)
              </span>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* Success Message */}
        {hasSubmitted && (
          <div className="success-message" role="status">
            ✓ Thank you for reflecting! Taking time to think about what you've learned helps reinforce the concepts.
          </div>
        )}
      </article>

      {/* Actions */}
      <div className="reflection-actions">
        {!hasSubmitted && (
          <>
            <button
              className="submit-button primary"
              onClick={handleSubmit}
              disabled={characterCount === 0}
              aria-label="Submit reflection"
            >
              Submit Reflection
            </button>
            
            {allowSkip && (
              <button
                className="skip-button"
                onClick={handleSkip}
                aria-label="Skip reflection (optional)"
              >
                Skip (Optional)
              </button>
            )}
          </>
        )}
      </div>

      {/* Why Reflection Matters */}
      <aside className="reflection-info">
        <h4>Why reflect?</h4>
        <p>
          Research shows that taking time to reflect on what you've learned 
          improves retention and helps you connect new knowledge with existing understanding.
        </p>
      </aside>
    </div>
  );
};

/**
 * Validator for reflection sections
 * Validates that the reflection meets minimum requirements
 */
export function validateReflection(
  section: any,
  answer: { text?: string; length?: number; skipped?: boolean }
): { valid: boolean; feedback?: string } {
  const reflectionSection = section as ReflectionSection;
  const minLength = reflectionSection.question.minLength || 20;

  if (answer?.skipped) {
    // Skippable reflections are always valid if skipped
    return { valid: true, feedback: 'Reflection skipped.' };
  }

  if (!answer?.text || answer.length === undefined) {
    return { valid: false, feedback: 'Please provide a reflection' };
  }

  if (answer.length < minLength) {
    return { 
      valid: false, 
      feedback: `Please write at least ${minLength} characters` 
    };
  }

  return {
    valid: true,
    feedback: 'Thank you for reflecting!',
  };
}

export default {
  type: 'reflection' as const,
  component: ReflectionRenderer,
  validator: validateReflection,
  defaultConfig: {
    minLength: 20,
    showExample: true,
  },
};
