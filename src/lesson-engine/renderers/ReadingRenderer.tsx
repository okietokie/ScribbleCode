/**
 * Reading Section Renderer
 * Renders markdown content with optional code examples.
 */

import React from 'react';
import { RendererProps } from '../core/types';
import { ReadingSection } from '../../content-engine/schemas';

interface ReadingRendererConfig {
  showProgress?: boolean;
  enableNotes?: boolean;
}

export const ReadingRenderer: React.FC<RendererProps> = ({
  section,
  isCompleted,
  config,
}) => {
  const readingSection = section as ReadingSection;
  const { showProgress = true, enableNotes = true } = (config || {}) as ReadingRendererConfig;

  return (
    <div className="reading-section" data-section-id={section.id}>
      <header className="section-header">
        <h2>{section.title}</h2>
        {showProgress && isCompleted && (
          <span className="completion-badge" aria-label="Completed">✓</span>
        )}
      </header>

      <article className="reading-content">
        {/* Markdown content would be rendered here using a markdown parser */}
        <div 
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: readingSection.content.markdown }}
        />

        {/* Code Examples */}
        {readingSection.content.codeExamples && readingSection.content.codeExamples.length > 0 && (
          <div className="code-examples">
            {readingSection.content.codeExamples.map((example, index) => (
              <pre key={index} className="code-block" data-language={example.language}>
                <code>{example.code}</code>
              </pre>
            ))}
          </div>
        )}

        {/* Images */}
        {readingSection.content.images && readingSection.content.images.length > 0 && (
          <div className="images">
            {readingSection.content.images.map((img, index) => (
              <figure key={index}>
                <img src={img.src} alt={img.alt} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </article>

      {enableNotes && (
        <aside className="notes-section">
          <button className="add-note-btn" aria-label="Add note">
            📝 Add Note
          </button>
        </aside>
      )}
    </div>
  );
};

/**
 * Validator for reading sections
 * Reading sections don't have challenges, so they're always "valid" when viewed
 */
export function validateReadingSection(
  section: any,
  answer: any
): { valid: boolean; feedback?: string } {
  // Reading sections are complete when viewed
  return { valid: true };
}

export default {
  type: 'reading' as const,
  component: ReadingRenderer,
  validator: validateReadingSection,
  defaultConfig: {
    showProgress: true,
    enableNotes: true,
  },
};
