import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Track mouse position instantly
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth animation loop using requestAnimationFrame
    const animate = () => {
      // Dot follows instantly
      if (dot) {
        dot.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;
      }

      // Ring follows with smooth lerp
      const lerp = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ring) {
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${isHovering.current ? 1.5 : 1})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Hover detection
    const handleMouseEnter = () => {
      isHovering.current = true;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.borderColor = 'rgba(0, 243, 255, 0.8)';
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.borderColor = 'rgba(0, 243, 255, 0.4)';
    };

    // Hide cursor when leaving window
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        if (dot) dot.style.opacity = '0';
        if (ring) ring.style.opacity = '0';
      }
    };

    const handleMouseOver = () => {
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseover', handleMouseOver);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"], .hover-trigger');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    const interactiveElements = addHoverListeners();

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseover', handleMouseOver);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Main dot - follows instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#00f3ff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'opacity 0.15s ease',
        }}
      />
      {/* Ring - follows with smooth delay */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1.5px solid rgba(0, 243, 255, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 0.1s ease-out, border-color 0.2s ease, opacity 0.15s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;