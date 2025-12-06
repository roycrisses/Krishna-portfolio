import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Instagram, Facebook, Twitter, Github } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Scramble Text Effect Logic
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      const scrambleIntervals = new Map<Element, ReturnType<typeof setInterval>>();
      const scrambleTimeouts = new Map<Element, ReturnType<typeof setTimeout>>();

      const scrambleText = (element: Element) => {
        const originalText = element.getAttribute('data-original') || element.textContent || "";
        if (!element.getAttribute('data-original')) {
          element.setAttribute('data-original', originalText);
        }

        // Clear existing timers
        if (scrambleIntervals.has(element)) {
          clearInterval(scrambleIntervals.get(element));
          scrambleIntervals.delete(element);
        }
        if (scrambleTimeouts.has(element)) {
          clearTimeout(scrambleTimeouts.get(element));
          scrambleTimeouts.delete(element);
        }

        // Start scrambling
        const interval = setInterval(() => {
          element.textContent = chars[Math.floor(Math.random() * chars.length)];
        }, 50);
        scrambleIntervals.set(element, interval);

        // Stop after 2 seconds and revert
        const timeout = setTimeout(() => {
          clearInterval(interval);
          element.textContent = originalText;
          scrambleIntervals.delete(element);
          scrambleTimeouts.delete(element);
        }, 2000);
        scrambleTimeouts.set(element, timeout);
      };

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
          gsap.to(this, { color: '#00f3ff', scale: 1.1, duration: 0.2 });
          scrambleText(this);
        });
        char.addEventListener('mouseleave', function (this: Element) {
          gsap.to(this, { color: 'white', scale: 1, duration: 0.2, delay: 0.5 });
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
        <a href="https://github.com/roycrisses" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300"><Github size={20} /></a>
        <a href="https://x.com/m_Krishnakarki" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300"><Twitter size={20} /></a>
        <a href="https://www.facebook.com/krishna.karki.739201" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300"><Facebook size={20} /></a>
        <a href="https://www.instagram.com/krishnakarki_019/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-500 hover:text-white transition-colors hover-trigger transform hover:-translate-y-1 duration-300"><Instagram size={20} /></a>
      </div>

      {/* Scroll - Bottom Right */}
      <div className="absolute bottom-12 right-8 md:right-12 flex flex-col items-center gap-6 z-20 scroll-indicator">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 [writing-mode:vertical-lr] rotate-180 font-medium">Scroll</span>
        <div className="h-24 w-[1px] bg-white/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-drop"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-[90vw]">
        <p className="hero-sub text-sm md:text-base font-light tracking-[0.4em] mb-2 md:mb-4 text-gray-400 uppercase">I am</p>

        <div className="hero-title relative cursor-default">
          <h1 ref={titleRef} className="text-[18vw] md:text-[14rem] font-bold font-display leading-[0.85] tracking-tighter text-white mix-blend-exclusion select-none">
            <span className="inline-block hero-title-char hover:text-neon transition-colors">K</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors">R</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors">I</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors">S</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors">H</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors">N</span>
            <span className="inline-block hero-title-char hover:text-neon transition-colors">A</span>
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