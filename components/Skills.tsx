import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SKILLS } from '../constants';
import { getGlobalAudioManager } from '../hooks/useAudioManager';

const playHoverSound = () => {
  const manager = getGlobalAudioManager();
  if (manager) manager.playSound('hover');
};

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-row", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-20 md:py-40 bg-dark-bg relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 md:mb-32">
          <span className="block text-xs font-medium tracking-[0.25em] uppercase text-gray-500 mb-4">
            (02) — Expertise
          </span>
          <h2 className="text-[12vw] md:text-[8rem] leading-none font-bold font-display text-white/5 uppercase select-none absolute top-0 left-0 w-full text-center pointer-events-none z-0">
            Capabilities
          </h2>
          <h2 className="relative z-10 text-4xl md:text-6xl font-bold font-display text-white">
            TECHNICAL <span className="text-neon">STACK</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
          <div className="md:col-span-4 text-gray-400 text-lg leading-relaxed">
            <p>My arsenal of tools and technologies used to create high-performance digital products. I constantly explore new frameworks to stay on the cutting edge.</p>
          </div>

          <div className="md:col-span-8">
            <div className="flex flex-col">
              {SKILLS.map((skill, index) => (
                <div
                  key={index}
                  className="skill-row group flex items-center justify-between py-8 border-b border-white/10 hover:border-white/30 transition-colors"
                  onMouseEnter={playHoverSound}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-neon/50">0{index + 1}</span>
                    <h3 className="text-2xl md:text-4xl font-display font-medium text-gray-300 group-hover:text-white group-hover:translate-x-4 transition-all duration-300">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-gray-500 group-hover:text-neon transition-colors">{skill.level}%</span>
                    <div className="w-24 h-[1px] bg-white/10 hidden md:block">
                      <div className="h-full bg-neon w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;