import { useEffect, useRef, useState } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const position = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      velocity.current = {
        x: newPos.x - lastPosition.current.x,
        y: newPos.y - lastPosition.current.y
      };
      lastPosition.current = newPos;
      position.current = newPos;
    };

    const animate = () => {
      if (cursorRef.current && dotRef.current) {
        const { x, y } = position.current;
        const angle = Math.atan2(velocity.current.y, velocity.current.x) * 180 / Math.PI;
        const scale = isClicking ? 0.8 : 1;

        cursorRef.current.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${angle}deg)`;
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;

        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      if (['BUTTON', 'A'].includes(e.target.tagName)) setIsHovered(true);
    };

    const handleMouseOut = () => setIsHovered(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isClicking]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovered ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
      />
      <div
        ref={dotRef}
        className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
