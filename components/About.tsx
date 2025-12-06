import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(".about-img-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      });

      // Text Highlight Scrub Effect
      // We split text into words or lines and change opacity based on scroll
      const spans = gsap.utils.toArray<HTMLElement>('.scrub-text span');

      gsap.to(spans, {
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
        color: "#ffffff",
        stagger: 0.1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-20 md:py-40 bg-transparent relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-start">

          {/* Left Column - Big Label & Image (Sticky) */}
          <div className="w-full lg:w-5/12 sticky top-24">
            <span className="block text-xs font-medium tracking-[0.25em] uppercase text-gray-500 mb-8 md:mb-16">
              (01) — Profile
            </span>

            <div className="relative w-full aspect-[3/4] overflow-hidden bg-white/5 group rounded-sm">
              <div className="about-img-reveal w-full h-full">
                <img
                  src={`${import.meta.env.BASE_URL}images/profile.png`}
                  alt="Krishna Karki"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30"></div>
            </div>
          </div>

          {/* Right Column - Editorial Text */}
          <div className="w-full lg:w-7/12 pt-10 lg:pt-32">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[0.9] tracking-tight mb-12 text-white mix-blend-difference">
              CRAFTING <br />
              DIGITAL <br />
              <span className="text-neon">EXPERIENCES</span>
            </h2>

            {/* Text that lights up on scroll */}
            <div ref={textContainerRef} className="space-y-8 text-2xl md:text-3xl font-light leading-relaxed max-w-xl scrub-text text-gray-700">
              <p>
                <span>I</span> <span>am</span> <span>Krishna</span> <span>Karki</span> <span>(Krish),</span> <span>a</span> <span>19-year-old</span> <span>multidisciplinary</span> <span>developer</span> <span>and</span> <span>designer</span> <span>based</span> <span>in</span> <span>Nepal.</span>
              </p>
              <p>
                <span>I</span> <span>operate</span> <span>at</span> <span>the</span> <span>intersection</span> <span>of</span> <span className="font-medium">design</span> <span>and</span> <span className="font-medium">engineering</span>. <span>My</span> <span>work</span> <span>is</span> <span>driven</span> <span>by</span> <span>the</span> <span>belief</span> <span>that</span> <span>software</span> <span>should</span> <span>not</span> <span>just</span> <span>function,</span> <span>but</span> <span>perform</span> <span>elegantly.</span>
              </p>
              <p>
                <span>Currently,</span> <span>I</span> <span>am</span> <span>focused</span> <span>on</span> <span>building</span> <span>immersive</span> <span>web</span> <span>applications</span> <span>that</span> <span>challenge</span> <span>the</span> <span>standard</span> <span>browsing</span> <span>experience.</span>
              </p>
            </div>

            {/* Minimal Stats Grid */}
            <div className="grid grid-cols-2 gap-8 mt-20 pt-8 border-t border-white/10 about-line">
              <div>
                <span className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Age</span>
                <span className="text-3xl font-display font-bold text-white">19</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Projects</span>
                <span className="text-3xl font-display font-bold text-white">10+</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Location</span>
                <span className="text-xl font-display font-medium text-white">Nepal</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-gray-600 mb-2">Focus</span>
                <span className="text-xl font-display font-medium text-white">Web & Design</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;