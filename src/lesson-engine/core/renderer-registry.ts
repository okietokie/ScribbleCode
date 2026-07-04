/**
 * Renderer Registry
 * Central registry for all lesson section renderers.
 * Follows the plugin pattern for extensibility.
 */

import { RendererModule, RendererRegistry as RegistryInterface, SectionType } from './types';

class RendererRegistry implements RegistryInterface {
  private renderers: Map<string, RendererModule> = new Map();

  /**
   * Register a new renderer module
   */
  register(module: RendererModule): void {
    if (this.renderers.has(module.type)) {
      console.warn(`Renderer "${module.type}" is being overwritten.`);
    }
    this.renderers.set(module.type, module);
  }

  /**
   * Get a renderer by type
   */
  get(type: string): RendererModule | undefined {
    return this.renderers.get(type);
  }

  /**
   * Get all registered renderer types
   */
  getAllTypes(): string[] {
    return Array.from(this.renderers.keys());
  }

  /**
   * Check if a renderer exists
   */
  has(type: string): boolean {
    return this.renderers.has(type);
  }

  /**
   * Unregister a renderer (useful for hot-reloading in development)
   */
  unregister(type: string): boolean {
    return this.renderers.delete(type);
  }

  /**
   * Clear all renderers (useful for testing)
   */
  clear(): void {
    this.renderers.clear();
  }
}

// Singleton instance
const globalRegistry = new RendererRegistry();

/**
 * Default export for direct usage
 */
export const rendererRegistry: RegistryInterface = globalRegistry;

/**
 * Hook-friendly getter
 */
export function getRenderer(type: string): RendererModule | undefined {
  return globalRegistry.get(type);
}

/**
 * Register multiple renderers at once
 */
export function registerRenderers(modules: RendererModule[]): void {
  modules.forEach(module => globalRegistry.register(module));
}

/**
 * Get component for a section type
 */
export function getRendererComponent(type: string): React.FC<any> | undefined {
  const module = globalRegistry.get(type);
  return module?.component;
}

/**
 * Validate answer using the appropriate renderer's validator
 */
export function validateAnswer(
  type: string,
  section: any,
  answer: any
): { valid: boolean; feedback?: string } {
  const module = globalRegistry.get(type);
  if (!module) {
    return {
      valid: false,
      feedback: `No validator found for section type: ${type}`,
    };
  }
  return module.validator(section, answer);
}

export default globalRegistry;
