/**
 * Code Playground Renderer
 * Interactive code editor with live execution and test validation.
 */

import React, { useState, useCallback } from 'react';
import { RendererProps } from '../core/types';
import { CodePlaygroundChallenge } from '../../content-engine/schemas';

interface CodePlaygroundRendererConfig {
  theme?: 'light' | 'dark';
  language?: string;
  showLineNumbers?: boolean;
  enableConsole?: boolean;
  autoRun?: boolean;
}

export const CodePlaygroundRenderer: React.FC<RendererProps> = ({
  section,
  challenge,
  state,
  onSubmit,
  onHintRequest,
  isCompleted,
  config,
}) => {
  const playgroundChallenge = challenge as CodePlaygroundChallenge;
  const {
    theme = 'dark',
    language = 'javascript',
    showLineNumbers = true,
    enableConsole = true,
    autoRun = false,
  } = (config || {}) as CodePlaygroundRendererConfig;

  const [code, setCode] = useState(playgroundChallenge.starterCode?.code || '');
  const [output, setOutput] = useState<string>('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; description: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const hintsRemaining = (challenge?.hints?.length || 0) - (state?.hintsUsed || 0);

  // Simulate code execution (in real app, this would use a sandboxed evaluator)
  const runCode = useCallback(async () => {
    setIsRunning(true);
    setError(null);
    setConsoleOutput([]);
    setTestResults([]);

    try {
      // In a real implementation, this would:
      // 1. Sanitize the code
      // 2. Run it in a sandboxed environment (e.g., Web Worker, iframe, or server-side)
      // 3. Capture console output
      // 4. Run tests against the output
      
      // Mock execution for demonstration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock console capture
      setConsoleOutput(['> Code executed successfully']);
      
      // Run tests
      const results = playgroundChallenge.tests.map(test => ({
        passed: Math.random() > 0.3, // Mock result
        description: test.description,
      }));
      
      setTestResults(results);
      
      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        setOutput('All tests passed! ✓');
        onSubmit({ code, testsPassed: true, results });
      } else {
        setOutput(`${results.filter(r => r.passed).length}/${results.length} tests passed`);
        onSubmit({ code, testsPassed: false, results });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, playgroundChallenge.tests, onSubmit]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (autoRun && !isRunning) {
      // Debounced auto-run could be implemented here
    }
  };

  const handleHint = () => {
    onHintRequest();
  };

  const handleReset = () => {
    setCode(playgroundChallenge.starterCode?.code || '');
    setOutput('');
    setConsoleOutput([]);
    setTestResults([]);
    setError(null);
  };

  return (
    <div className="code-playground-section" data-section-id={section.id}>
      <header className="section-header">
        <h2>{section.title}</h2>
        <p className="instructions">{playgroundChallenge.instructions || challenge?.instructions}</p>
      </header>

      {/* Constraints */}
      {playgroundChallenge.constraints && (
        <div className="constraints" role="note" aria-label="Coding constraints">
          <h3>Constraints</h3>
          <ul>
            {playgroundChallenge.constraints.maxLines && (
              <li>Maximum {playgroundChallenge.constraints.maxLines} lines</li>
            )}
            {playgroundChallenge.constraints.forbiddenKeywords && (
              <li>Avoid: {playgroundChallenge.constraints.forbiddenKeywords.join(', ')}</li>
            )}
            {playgroundChallenge.constraints.requiredKeywords && (
              <li>Must use: {playgroundChallenge.constraints.requiredKeywords.join(', ')}</li>
            )}
          </ul>
        </div>
      )}

      <div className="playground-container">
        {/* Code Editor */}
        <div className={`editor theme-${theme}`}>
          <div className="editor-header">
            <span className="language-badge">{language}</span>
            <button
              className="reset-button"
              onClick={handleReset}
              aria-label="Reset code to starter template"
            >
              🔄 Reset
            </button>
          </div>
          
          <div className="editor-content">
            {showLineNumbers && (
              <div className="line-numbers" aria-hidden="true">
                {code.split('\n').map((_, i) => (
                  <span key={i} className="line-number">{i + 1}</span>
                ))}
              </div>
            )}
            <textarea
              className="code-input"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              aria-label="Code editor"
              style={{ tabSize: 2 }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="output-panel">
          <div className="panel-header">
            <h3>Output</h3>
            <button
              className="run-button"
              onClick={runCode}
              disabled={isRunning}
              aria-label="Run code"
            >
              {isRunning ? '⏳ Running...' : '▶ Run'}
            </button>
          </div>

          {error && (
            <div className="error-output" role="alert">
              <pre>{error}</pre>
            </div>
          )}

          {output && (
            <div className={`output-result ${testResults.every(r => r.passed) ? 'success' : ''}`}>
              <pre>{output}</pre>
            </div>
          )}

          {/* Console Output */}
          {enableConsole && consoleOutput.length > 0 && (
            <div className="console-output">
              <h4>Console</h4>
              <pre>
                {consoleOutput.join('\n')}
              </pre>
            </div>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="test-results">
              <h4>Tests</h4>
              <ul>
                {testResults.map((result, index) => (
                  <li
                    key={index}
                    className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                  >
                    <span className="test-icon">{result.passed ? '✓' : '✗'}</span>
                    <span className="test-description">{result.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Hint Button */}
      {!isCompleted && hintsRemaining > 0 && (
        <button
          className="hint-button"
          onClick={handleHint}
          aria-label={`Get a hint (${hintsRemaining} remaining)`}
        >
          💡 Hint ({hintsRemaining} remaining)
        </button>
      )}

      {/* Accessibility note for screen readers */}
      <div className="sr-only" aria-live="polite">
        {isRunning && 'Code is running, please wait...'}
        {error && `Error: ${error}`}
        {testResults.length > 0 && 
          `${testResults.filter(r => r.passed).length} of ${testResults.length} tests passed`}
      </div>
    </div>
  );
};

/**
 * Validator for code playground challenges
 */
export function validateCodePlayground(
  section: any,
  answer: { code: string; testsPassed: boolean; results?: any[] }
): { valid: boolean; feedback?: string } {
  if (!answer || typeof answer.code !== 'string') {
    return { valid: false, feedback: 'Please write some code' };
  }

  if (answer.code.trim().length === 0) {
    return { valid: false, feedback: 'Code cannot be empty' };
  }

  return {
    valid: answer.testsPassed,
    feedback: answer.testsPassed
      ? 'Excellent! All tests passed.'
      : 'Some tests failed. Review the output and try again.',
  };
}

export default {
  type: 'live-playground' as const,
  component: CodePlaygroundRenderer,
  validator: validateCodePlayground,
  defaultConfig: {
    theme: 'dark',
    language: 'javascript',
    showLineNumbers: true,
    enableConsole: true,
    autoRun: false,
  },
};
