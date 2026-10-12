import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'open' | 'explore' | 'go' | 'lens' | 'drag'>('default');
  const [isClicking, setIsClicking] = useState(false);
  
  // Motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth physics (inertia)
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const ringSpringConfig = { stiffness: 150, damping: 22, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
        if (target.closest('.project-card')) {
          setCursorState('view');
        } else {
          setCursorState('open');
        }
      } else if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setCursorState('go');
      } else if (target.closest('.explore-area')) {
        setCursorState('explore');
      } else if (target.closest('.font-display') && target.textContent && target.textContent.length > 3) {
        setCursorState('lens');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const getLabel = () => {
    switch (cursorState) {
      case 'view': return 'VIEW';
      case 'open': return 'OPEN';
      case 'explore': return 'EXPLORE';
      case 'go': return 'GO';
      case 'drag': return 'DRAG';
      default: return '';
    }
  };

  const isHovered = cursorState !== 'default' && cursorState !== 'lens';
  const isLens = cursorState === 'lens';

  return (
    <>
      {/* Lagging Ring / Lens */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[100] flex items-center justify-center overflow-hidden backdrop-blur-[2px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isLens ? 120 : (isHovered ? 80 : 32),
          height: isLens ? 120 : (isHovered ? 80 : 32),
          borderColor: isHovered || isLens ? 'rgba(255,255,255,0.2)' : 'rgba(244, 247, 250, 0.1)',
          backgroundColor: isLens ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.2)',
          mixBlendMode: isLens ? 'difference' : 'normal',
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.span 
          className="font-mono text-[8px] font-medium tracking-widest text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {getLabel()}
        </motion.span>

        {/* Click ripple effect */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-cyan-400/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isClicking ? 1 : 0, 
            opacity: isClicking ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      
      {/* Precise Dot with Trailing Light */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[101]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: (isHovered || isLens) ? 0 : (isClicking ? 0.5 : 1),
          opacity: (isHovered || isLens) ? 0 : 1,
          boxShadow: '0 0 10px 2px rgba(0, 217, 255, 0.5)'
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
