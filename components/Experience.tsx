import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".exp-row", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-20 md:py-40 bg-dark-bg border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 md:mb-32">
            <div>
                <span className="block text-xs font-medium tracking-[0.25em] uppercase text-gray-500 mb-4">
                    (04) — History
                </span>
                <h2 className="text-4xl md:text-6xl font-bold font-display text-white uppercase">
                    Education & <br/> <span className="text-neon">Experience</span>
                </h2>
            </div>
        </div>

        <div className="space-y-0">
            {EXPERIENCES.map((exp, index) => (
                <div key={exp.id} className="exp-row group relative py-12 border-t border-white/10 hover:bg-white/5 transition-colors duration-500">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-8 md:gap-0 px-4">
                        <div className="md:w-1/4">
                            <span className="text-6xl font-display font-bold text-white/10 group-hover:text-neon transition-colors duration-300">
                                {exp.year}
                            </span>
                        </div>
                        <div className="md:w-1/3">
                            <h4 className="text-2xl font-bold text-white mb-2">{exp.title}</h4>
                            <span className="text-sm uppercase tracking-widest text-gray-500">{exp.organization}</span>
                        </div>
                        <div className="md:w-5/12">
                            <p className="text-gray-400 leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
             <div className="w-full h-[1px] bg-white/10"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;