export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const easeOutQuad = (t: number): number => {
  return t * (2 - t);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const isMobile = (): boolean => {
  return typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
};

export const prefersReducedMotion = (): boolean => {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};