import { useRef, useEffect, useCallback, useState } from 'react';
import { useCursorContext } from './CursorProvider';
import type { MagneticProps } from '../types';

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.3,
  enabled = true,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { state } = useCursorContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const applyMagneticEffect = useCallback((mouseX: number, mouseY: number) => {
    if (!elementRef.current || !enabled) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    setPosition({
      x: deltaX * strength,
      y: deltaY * strength,
    });
  }, [enabled, strength]);

  useEffect(() => {
    if (!enabled || !state.isVisible) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    applyMagneticEffect(state.x, state.y);
  }, [state.x, state.y, state.isVisible, enabled, applyMagneticEffect]);

  const handleMouseEnter = () => {
    if (elementRef.current) {
      elementRef.current.style.transition = 'transform 0.1s ease-out';
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    if (elementRef.current) {
      elementRef.current.style.transition = 'transform 0.3s ease-out';
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
};