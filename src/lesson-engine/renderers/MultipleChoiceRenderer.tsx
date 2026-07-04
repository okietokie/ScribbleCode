/**
 * Multiple Choice Renderer
 * Renders multiple choice questions with single or multiple selection.
 */

import React, { useState } from 'react';
import { RendererProps } from '../core/types';
import { MultipleChoiceChallenge } from '../../content-engine/schemas';

interface MultipleChoiceRendererConfig {
  shuffleOptions?: boolean;
  showExplanation?: boolean;
}

export const MultipleChoiceRenderer: React.FC<RendererProps> = ({
  section,
  challenge,
  state,
  onSubmit,
  onHintRequest,
  isCompleted,
  config,
}) => {
  const mcChallenge = challenge as MultipleChoiceChallenge;
  const { shuffleOptions = false, showExplanation = true } = (config || {}) as MultipleChoiceRendererConfig;
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string | undefined>(undefined);

  const handleOptionSelect = (optionId: string) => {
    if (hasSubmitted) return;

    setSelectedOptions(prev => {
      if (mcChallenge.allowMultiple) {
        // Toggle selection for multiple choice
        return prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId];
      } else {
        // Single selection
        return [optionId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;

    setHasSubmitted(true);

    // Find correct options
    const correctOptionIds = mcChallenge.options
      .filter(opt => opt.isCorrect)
      .map(opt => opt.id);

    // Check if answer is correct
    const isCorrect = mcChallenge.allowMultiple
      ? selectedOptions.every(id => correctOptionIds.includes(id)) &&
        selectedOptions.length === correctOptionIds.length
      : selectedOptions[0] === correctOptionIds[0];

    // Get feedback
    const selectedOption = mcChallenge.options.find(opt => opt.id === selectedOptions[0]);
    const optionFeedback = selectedOption?.explanation;
    
    const resultFeedback = isCorrect
      ? (challenge?.feedback?.correct || 'Correct! Well done.')
      : (challenge?.feedback?.incorrect || 'Not quite right. ' + (optionFeedback || 'Try again.'));

    setFeedback(resultFeedback);
    onSubmit({
      selectedOptions,
      isCorrect,
    });
  };

  const handleHint = () => {
    onHintRequest();
  };

  const hintsRemaining = (challenge?.hints?.length || 0) - (state?.hintsUsed || 0);

  return (
    <div className="multiple-choice-section" data-section-id={section.id}>
      <header className="section-header">
        <h2>{section.title}</h2>
        <p className="instructions">{challenge?.instructions}</p>
      </header>

      <div className="options-container" role="group" aria-label="Answer options">
        {(shuffleOptions ? [...mcChallenge.options].sort(() => Math.random() - 0.5) : mcChallenge.options).map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const isCorrect = option.isCorrect;
          
          let optionClass = 'option';
          if (hasSubmitted) {
            if (isCorrect) {
              optionClass += ' option-correct';
            } else if (isSelected && !isCorrect) {
              optionClass += ' option-incorrect';
            }
          } else if (isSelected) {
            optionClass += ' option-selected';
          }

          return (
            <button
              key={option.id}
              className={optionClass}
              onClick={() => handleOptionSelect(option.id)}
              disabled={hasSubmitted}
              aria-pressed={isSelected}
              aria-label={`${option.text}${isCorrect ? ' (correct answer)' : ''}`}
            >
              <span className="option-marker">
                {mcChallenge.allowMultiple ? (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    aria-hidden="true"
                  />
                ) : (
                  <input
                    type="radio"
                    checked={isSelected}
                    readOnly
                    aria-hidden="true"
                  />
                )}
              </span>
              <span className="option-text">{option.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`feedback ${hasSubmitted && state?.correct ? 'feedback-correct' : 'feedback-incorrect'}`} role="alert">
          {feedback}
        </div>
      )}

      {/* Hint Button */}
      {!hasSubmitted && hintsRemaining > 0 && (
        <button
          className="hint-button"
          onClick={handleHint}
          aria-label={`Get a hint (${hintsRemaining} remaining)`}
        >
          💡 Hint ({hintsRemaining} remaining)
        </button>
      )}

      {/* Submit Button */}
      {!hasSubmitted && (
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
          aria-label="Submit answer"
        >
          Submit Answer
        </button>
      )}

      {/* Explanation (shown after submission if enabled) */}
      {hasSubmitted && showExplanation && state?.correct === false && (
        <div className="explanation">
          <h3>Explanation</h3>
          <p>
            {mcChallenge.options.find(opt => opt.isCorrect)?.explanation ||
              'Review the lesson content and try again.'}
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Validator for multiple choice challenges
 */
export function validateMultipleChoice(
  section: any,
  answer: { selectedOptions: string[]; isCorrect: boolean }
): { valid: boolean; feedback?: string } {
  if (!answer || !Array.isArray(answer.selectedOptions)) {
    return { valid: false, feedback: 'Please select an answer' };
  }

  return {
    valid: answer.isCorrect,
    feedback: answer.isCorrect ? 'Correct!' : 'Not quite right. Keep trying!',
  };
}

export default {
  type: 'multiple-choice' as const,
  component: MultipleChoiceRenderer,
  validator: validateMultipleChoice,
  defaultConfig: {
    shuffleOptions: false,
    showExplanation: true,
  },
};
