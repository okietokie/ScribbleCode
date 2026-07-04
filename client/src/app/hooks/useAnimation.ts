import { useCallback } from 'react';
import { getAnimation, type AnimationPreset } from './animations';

export const useAnimation = () => {
  const get = useCallback((name: string): AnimationPreset => {
    return getAnimation(name);
  }, []);

  const fadeIn = useCallback(() => getAnimation('fadeIn'), []);
  const slideUp = useCallback(() => getAnimation('slideUp'), []);
  const pageFlip = useCallback(() => getAnimation('pageFlip'), []);
  const stickerPop = useCallback(() => getAnimation('stickerPop'), []);
  const bounce = useCallback(() => getAnimation('bounce'), []);
  const wiggle = useCallback(() => getAnimation('wiggle'), []);
  const scale = useCallback(() => getAnimation('scale'), []);
  const hoverLift = useCallback(() => getAnimation('hoverLift'), []);
  const paperDrop = useCallback(() => getAnimation('paperDrop'), []);

  return {
    get,
    fadeIn,
    slideUp,
    pageFlip,
    stickerPop,
    bounce,
    wiggle,
    scale,
    hoverLift,
    paperDrop,
  };
};
