import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // No complex JS needed for basic sticky stacking, CSS does the heavy lifting.
        // However, we can add scaling effects as cards leave the viewport.
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.project-card');

            cards.forEach((card, index) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                    scale: 1 - (cards.length - index) * 0.05, // Slight shrink effect as it stacks
                    opacity: 1 - (cards.length - index) * 0.1,
                    ease: "none"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={containerRef} className="py-20 md:py-40 bg-transparent border-t border-white/5">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 md:mb-32">
                    <div>
                        <span className="block text-xs font-medium tracking-[0.25em] uppercase text-gray-500 mb-4">
                            (03) — Selected Works
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold font-display text-white uppercase tracking-tight">
                            FEATURED <br /> <span className="text-stroke text-transparent" style={{ WebkitTextStroke: '1px white' }}>PROJECTS</span>
                        </h2>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <a href="#" className="group flex items-center gap-2 text-sm uppercase tracking-widest text-white hover:text-neon transition-colors">
                            View All Work
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                    </div>
                </div>

                {/* Sticky Cards Container */}
                <div className="flex flex-col gap-10">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card sticky top-24 md:top-32 w-full bg-dark-card border border-white/10 p-6 md:p-12 rounded-lg md:rounded-3xl shadow-2xl overflow-hidden group"
                            style={{
                                // Increase z-index so later cards stack on top
                                zIndex: index + 1,
                                // Ensure each card has a background to cover the one behind it
                            }}
                        >
                            {/* Glossy gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full">
                                {/* Left Content */}
                                <div className="flex flex-col justify-between h-full order-2 lg:order-1">
                                    <div>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-xs font-mono text-neon border border-neon/30 px-2 py-1 rounded">0{index + 1}</span>
                                            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{project.category}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight group-hover:text-neon transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed text-lg mb-8 max-w-md">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-3 mb-10">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-wider text-white bg-white/5 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-white hover:text-neon transition-colors group/btn w-fit">
                                        <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-neon group-hover/btn:border-neon group-hover/btn:text-black transition-all">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </span>
                                        View Project
                                    </a>
                                </div>

                                {/* Right - Live Website Preview */}
                                <div className="relative h-[300px] lg:h-auto overflow-hidden rounded-xl order-1 lg:order-2 bg-dark-surface">
                                    <div className="absolute inset-0 bg-neon/10 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    {project.link ? (
                                        <iframe
                                            src={project.link}
                                            title={project.title}
                                            className="w-full h-full min-h-[300px] lg:min-h-[400px] border-0"
                                            loading="lazy"
                                            sandbox="allow-scripts allow-same-origin"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                            No preview available
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;