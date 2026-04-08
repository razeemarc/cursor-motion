import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { isMobile, prefersReducedMotion } from '../utils/animations';
const CursorContext = createContext(null);
export const useCursorContext = () => {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursorContext must be used within a CursorProvider');
    }
    return context;
};
export const CursorProvider = ({ children, size = 20, color = '#000000', smoothness = 0.15, enableTrail = false, variant = 'default', }) => {
    const [state, setState] = useState({
        x: -100,
        y: -100,
        isHovering: false,
        isVisible: false,
    });
    useEffect(() => {
        if (isMobile() || prefersReducedMotion()) {
            return;
        }
        const handleMouseMove = (e) => {
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
    const setHovering = useCallback((isHovering) => {
        setState(prev => ({ ...prev, isHovering }));
    }, []);
    const setVisible = useCallback((isVisible) => {
        setState(prev => ({ ...prev, isVisible }));
    }, []);
    const value = {
        size,
        color,
        smoothness,
        enableTrail,
        variant,
        state,
        setHovering,
        setVisible,
    };
    return (_jsx(CursorContext.Provider, { value: value, children: children }));
};
