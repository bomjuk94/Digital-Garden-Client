import { useEffect, useState } from 'react';
import type { CursorFollowerProps } from '../types/props/CursorFollowerProps';

const CursorFollower = ({ img }: CursorFollowerProps) => {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveHandler = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', moveHandler);
        return () => window.removeEventListener('mousemove', moveHandler);
    }, []);

    return (
        <img
            src={img}
            style={{
                position: 'fixed',
                left: pos.x,
                top: pos.y,
                width: 100, // or 150
                height: 100,
                objectFit: 'contain',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
};

export default CursorFollower;
