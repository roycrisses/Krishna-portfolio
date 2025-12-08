import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Instagram, Facebook, Twitter, Github } from 'lucide-react';
import { getGlobalAudioManager } from '../hooks/useAudioManager';
import AudioControl from './AudioControl';

const playHoverSound = () => {
  const manager = getGlobalAudioManager();
  if (manager) manager.playSound('hover');
};

const playClickSound = () => {
  const manager = getGlobalAudioManager();
  if (manager) manager.playSound('click');
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Typewriter Effect Logic
      const typeText = (element: Element, text: string) => {
        element.textContent = "";
        let i = 0;
        const speed = 50;
        const type = () => {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        };
        type();
      };

      // Initial Animation Sequence
      tl.from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      })
        .from('.hero-title-char', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power4.out',
          onComplete: () => {
            // Trigger subtle glitch/scramble on title letters occasionally?
            // For now, let's just leave the entry impactful.
          }
        }, "-=0.8")
        .add(() => {
          const descEl = document.querySelector('.hero-desc-text');
          if (descEl) typeText(descEl, "A Senior Web Designer");
        }, "-=0.5")
        .from('.hero-desc-label', {
          opacity: 0,
          x: -20,
          duration: 0.5
        }, "-=1")
        .from('.social-icon', {
          x: -20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }, "-=0.8")
        .from('.scroll-indicator', {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out'
        }, "-=0.8");

      // Interactive hover effect for title
      const titleChars = document.querySelectorAll('.hero-title-char');
      titleChars.forEach(char => {
        char.addEventListener('mouseenter', function (this: Element) {
          gsap.to(this, {
            scale: 1.1,
            y: -10,
            textShadow: "0 0 20px rgba(0, 243, 255, 0.5)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
        char.addEventListener('mouseleave', function (this: Element) {
          gsap.to(this, {
            scale: 1,
            y: 0,
            textShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Mouse movement parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.hero-title', {
          x: x,
          y: y,
          duration: 1,
          ease: 'power2.out'
        });

        gsap.to('.hero-desc', {
          x: -x * 1.5,
          y: -y * 1.5,
          duration: 1.2,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Socials - Bottom Left */}
      <div className="absolute bottom-12 left-8 md:left-12 hidden md:flex flex-col gap-8 z-20">
        <a href="https://github.com/roycrisses" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300" onMouseEnter={playHoverSound} onClick={playClickSound}><Github size={20} /></a>
        <a href="https://x.com/m_Krishnakarki" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300" onMouseEnter={playHoverSound} onClick={playClickSound}><Twitter size={20} /></a>
        <a href="https://www.facebook.com/krishna.karki.739201" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300" onMouseEnter={playHoverSound} onClick={playClickSound}><Facebook size={20} /></a>
        <a href="https://www.instagram.com/krishnakarki_019/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300" onMouseEnter={playHoverSound} onClick={playClickSound}><Instagram size={20} /></a>
      </div>

      {/* Scroll - Bottom Right */}
      <div className="absolute bottom-12 right-8 md:right-12 flex flex-col items-center gap-6 z-20 scroll-indicator">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 [writing-mode:vertical-lr] rotate-180 font-medium">Scroll</span>
        <div className="h-24 w-[1px] bg-white/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-drop"></div>
        </div>
      </div>

      {/* Audio Control - Bottom Center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <AudioControl />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-[90vw]">
        <p className="hero-sub text-sm md:text-base font-light tracking-[0.4em] mb-2 md:mb-4 text-gray-400 uppercase">I am</p>

        <div className="hero-title relative cursor-default">
          <h1 ref={titleRef} className="text-[18vw] md:text-[14rem] font-bold font-display leading-[0.85] tracking-tighter text-white mix-blend-exclusion select-none">
            <span className="inline-block hero-title-char hover:text-neon transition-colors" onMouseEnter={playHoverSound}>K</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors" onMouseEnter={playHoverSound}>R</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors" onMouseEnter={playHoverSound}>I</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors" onMouseEnter={playHoverSound}>S</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors" onMouseEnter={playHoverSound}>H</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors" onMouseEnter={playHoverSound}>N</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors" onMouseEnter={playHoverSound}>A</span>
          </h1>
        </div>

        <div className="w-full flex justify-end md:pr-12 mt-6 md:-mt-8 relative z-20">
          <div className="hero-desc text-right">
            <p className="text-[10px] md:text-xs font-medium tracking-[0.25em] text-gray-400 uppercase leading-relaxed">
              <span className="hero-desc-label block mb-1">Based in Nepal</span>
              <span className="hero-desc-text text-white min-h-[1.5em] block"></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;