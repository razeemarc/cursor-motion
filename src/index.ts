export { CursorProvider } from './components/CursorProvider';
export { Cursor } from './components/Cursor';
export { Magnetic } from './components/Magnetic';
export { useCursor } from './hooks/useCursor';

export type {
  CursorProps,
  CursorState,
  CursorContextValue,
  MagneticProps,
  UseCursorReturn,
} from './types';

export { lerp, easeOutQuad, easeInOutCubic, clamp, isMobile, prefersReducedMotion } from './utils/animations';