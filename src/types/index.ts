export interface CursorProps {
  size?: number;
  color?: string;
  smoothness?: number;
  enableTrail?: boolean;
  variant?: 'default' | 'scale' | 'trail' | 'glow';
}

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isVisible: boolean;
}

export interface CursorContextValue extends CursorProps {
  state: CursorState;
  setHovering: (hovering: boolean) => void;
  setVisible: (visible: boolean) => void;
}

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  enabled?: boolean;
  className?: string;
}

export interface UseCursorReturn {
  position: { x: number; y: number };
  isHovering: boolean;
  isVisible: boolean;
  setHovering: (hovering: boolean) => void;
  setVisible: (visible: boolean) => void;
}