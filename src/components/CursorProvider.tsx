import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { CursorProps, CursorState, CursorContextValue } from '../types';
import { isMobile, prefersReducedMotion } from '../utils/animations';

const CursorContext = createContext<CursorContextValue | null>(null);

export const useCursorContext = (): CursorContextValue => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursorContext must be used within a CursorProvider');
  }
  return context;
};

interface CursorProviderProps extends CursorProps {
  children: ReactNode;
}

export const CursorProvider: React.FC<CursorProviderProps> = ({
  children,
  size = 20,
  color = '#000000',
  smoothness = 0.15,
  enableTrail = false,
  variant = 'default',
}) => {
  const [state, setState] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovering: false,
    isVisible: false,
  });

  useEffect(() => {
    if (isMobile() || prefersReducedMotion()) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isVisible: true,
      }));
    };

    const handleMouseEnter = () => {
      setState(prev => ({ ...prev, isVisible: true }));
    };

    const handleMouseLeave = () => {
      setState(prev => ({ ...prev, isVisible: false }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const setHovering = useCallback((isHovering: boolean) => {
    setState(prev => ({ ...prev, isHovering }));
  }, []);

  const setVisible = useCallback((isVisible: boolean) => {
    setState(prev => ({ ...prev, isVisible }));
  }, []);

  const value: CursorContextValue = {
    size,
    color,
    smoothness,
    enableTrail,
    variant,
    state,
    setHovering,
    setVisible,
  };

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
};