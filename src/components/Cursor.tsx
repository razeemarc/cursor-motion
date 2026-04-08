import { useRef, useEffect, useCallback } from 'react';
import { useCursorContext } from './CursorProvider';
import { lerp, easeOutQuad, isMobile, prefersReducedMotion } from '../utils/animations';

interface CursorComponentProps {
  className?: string;
  hoverColor?: string;
  hoverScale?: number;
}

export const Cursor: React.FC<CursorComponentProps> = ({
  className = '',
  hoverColor,
  hoverScale = 1.5,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const animationRef = useRef<number | undefined>(undefined);

  const {
    size = 20,
    color = '#000000',
    smoothness = 0.15,
    enableTrail = false,
    variant = 'default',
    state,
  } = useCursorContext();

  const shouldShowCursor = !isMobile() && !prefersReducedMotion() && state.isVisible;

  useEffect(() => {
    if (shouldShowCursor) {
      targetRef.current = { x: state.x, y: state.y };
    } else {
      targetRef.current = { x: -100, y: -100 };
    }
  }, [state.x, state.y, shouldShowCursor]);

  const animate = useCallback(() => {
    const smoothValue = smoothness ?? 0.15;
    positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, smoothValue);
    positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, smoothValue);

    const scale = state.isHovering ? easeOutQuad(hoverScale) : easeOutQuad(1);
    const isHoveringScale = variant === 'scale' || variant === 'glow';

    if (cursorRef.current) {
      const finalScale = isHoveringScale ? scale : 1;
      cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) scale(${finalScale})`;
    }

    if (trailRef.current && enableTrail) {
      trailRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [smoothness, state.isHovering, hoverScale, variant, enableTrail]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'glow':
        return {
          boxShadow: state.isHovering
            ? `0 0 30px ${hoverColor || color}`
            : `0 0 10px ${hoverColor || color}`,
        };
      case 'trail':
        return enableTrail ? { opacity: 0.7 } : {};
      case 'scale':
        return {};
      default:
        return {};
    }
  };

  const currentColor = state.isHovering && hoverColor ? hoverColor : color;
  const currentSize = state.isHovering && (variant === 'scale' || variant === 'glow')
    ? size * hoverScale
    : size;

  return (
    <>
      {enableTrail && shouldShowCursor && (
        <div
          ref={trailRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: currentSize,
            height: currentSize,
            borderRadius: '50%',
            backgroundColor: currentColor,
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.2s ease',
          }}
        />
      )}
      <div
        ref={cursorRef}
        className={className}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: currentSize,
          height: currentSize,
          borderRadius: '50%',
          backgroundColor: currentColor,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.2s ease, width 0.2s ease, height 0.2s ease',
          opacity: shouldShowCursor ? 1 : 0,
          ...getVariantStyles(),
        }}
      />
    </>
  );
};