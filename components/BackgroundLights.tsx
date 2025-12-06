import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundLights: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate blobs floating around
      const blobs = gsap.utils.toArray<HTMLElement>('.light-blob');
      
      blobs.forEach((blob) => {
        gsap.to(blob, {
          x: "random(-200, 200)", 
          y: "random(-200, 200)",
          scale: "random(0.8, 1.5)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        
        gsap.to(blob, {
          opacity: "random(0.1, 0.4)",
          duration: "random(5, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top Left Neon */}
      <div className="light-blob absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-neon/10 rounded-full blur-[100px] mix-blend-screen" />
      
      {/* Middle Right Blue */}
      <div className="light-blob absolute top-[30%] -right-[10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
      
      {/* Bottom Left Darker */}
      <div className="light-blob absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[100px] mix-blend-screen" />
      
      {/* Moving Accent */}
      <div className="light-blob absolute top-[40%] left-[30%] w-[20vw] h-[20vw] bg-neon/5 rounded-full blur-[80px] mix-blend-overlay" />
    </div>
  );
};

export default BackgroundLights;