export const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
};
export const easeOutQuad = (t) => {
    return t * (2 - t);
};
export const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};
export const isMobile = () => {
    return typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0);
};
export const prefersReducedMotion = () => {
    return typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
