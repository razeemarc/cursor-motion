import { useCursorContext } from '../components/CursorProvider';
import type { UseCursorReturn } from '../types';

export const useCursor = (): UseCursorReturn => {
  const {
    state,
    setHovering,
    setVisible,
  } = useCursorContext();

  return {
    position: { x: state.x, y: state.y },
    isHovering: state.isHovering,
    isVisible: state.isVisible,
    setHovering,
    setVisible,
  };
};