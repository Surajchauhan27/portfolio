import React, { useRef, useEffect } from 'react';
import { EXPERIENCE } from '../data/config';
import { resolveIcon } from '../utils/icons';
import { SectionHeader } from '../ui/atoms';

export default function ExperienceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        sectionRef.current?.querySelectorAll('.sr:not(.in)').forEach((el, i) => {
          setTimeout(() => el.classList.add('in'), parseInt(el.dataset.delay || 0));
        });
      }
    }, { threshold: 0.05 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="sr">
          <SectionHeader
            num="04 / Career"
            title="Work"
            accent="Experience"
            sub="Professional internships and business operations training"
          />
        </div>

        {/* Timeline body */}
        <div className="relative mt-12 md:mt-16 max-w-4xl mx-auto">
          {/* Main vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-cyan-500 via-blue-500/50 to-transparent" />

          {EXPERIENCE.map((exp, idx) => {
            const Icon = resolveIcon(exp.iconName || 'TrendingUp');
            return (
              <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                {/* Timeline node marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-cyan-400 z-20 shadow-[0_0_8px_#00d4ff] timeline-dot transition-all" />

                {/* Left block (Metadata - Desktop only) */}
                <div className={`hidden md:flex flex-col items-end text-right justify-center sr ${idx % 2 === 0 ? 'order-1 md:translate-x-[-15px]' : 'order-2 md:translate-x-[15px]'}`} data-delay="100">
                  <span className="font-mono text-cyan-400 font-bold tracking-widest text-xs uppercase mb-1">{exp.duration}</span>
                  <h4 className="font-bold text-white text-lg">{exp.company}</h4>
                </div>

                {/* Right block (Interactive experience card) */}
                <div className={`pl-10 md:pl-0 sr ${idx % 2 === 0 ? 'order-2 md:translate-x-[15px]' : 'order-1 md:translate-x-[-15px] md:text-right md:items-end'}`} data-delay="200">
                  <div className="spotlight-card tilt holo rounded-2xl border border-gray-800/80 bg-gray-900/25 p-6 sm:p-8 hover:border-gray-700 hover:bg-gray-900/45 transition-all text-left">
                    
                    {/* Header mobile view helper */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${exp.accent}15`, border: `1px solid ${exp.accent}30` }}>
                        {Icon && <Icon size={18} style={{ color: exp.accent }} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base sm:text-lg leading-tight">{exp.role}</h4>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 mt-0.5">{exp.company} <span className="md:hidden">· {exp.duration}</span></p>
                      </div>
                    </div>

                    {/* Bullet responsibilities */}
                    <ul className="space-y-3 mt-5">
                      {exp.responsibilities.map((resp, rIdx) => {
                        const [title, desc] = resp.split(': ');
                        return (
                          <li key={rIdx} className="text-xs sm:text-sm text-gray-500 leading-relaxed flex items-start gap-2.5">
                            <span className="text-cyan-400 mt-1 flex-shrink-0">✦</span>
                            <div>
                              <strong className="text-gray-300 font-semibold">{title}:</strong>{' '}
                              <span className="text-gray-400">{desc}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
