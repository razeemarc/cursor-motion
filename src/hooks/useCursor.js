import { useCursorContext } from '../components/CursorProvider';
export const useCursor = () => {
    const { state, setHovering, setVisible, } = useCursorContext();
    return {
        position: { x: state.x, y: state.y },
        isHovering: state.isHovering,
        isVisible: state.isVisible,
        setHovering,
        setVisible,
    };
};
