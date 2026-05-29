import React, { useRef, useEffect } from 'react';
import { TOOLS } from '../data/config';
import { SectionHeader } from '../ui/atoms';

export default function TechStackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        sectionRef.current?.querySelectorAll('.sr:not(.in)').forEach((el, i) => {
          setTimeout(() => el.classList.add('in'), parseInt(el.dataset.delay || 0));
        });
        io.disconnect();
      }
    }, { threshold: 0.05 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="techstack" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      
      {/* Dynamic light leaks */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="sr">
          <SectionHeader
            num="07 / Core Stack"
            title="Technology"
            accent="Arsenal"
            sub="Frameworks, databases, and analytical toolsets powering my data and full-stack builds"
          />
        </div>

        {/* Dynamic tech grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12 md:mt-16">
          {TOOLS.map((tool, idx) => (
            <div
              key={idx}
              className="spotlight-card tilt holo border border-gray-800/80 bg-gray-900/20 hover:border-cyan-500/30 hover:bg-gray-900/40 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer sr min-h-[120px]"
              data-delay={idx * 50}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Floating icon wrapper */}
              <div className="tilt-inner text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_8px_rgba(0,212,255,0.25)]">
                {tool.emoji}
              </div>
              
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors font-bold">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
