import React, { useRef, useEffect } from 'react';
import { SERVICES } from '../data/config';
import { resolveIcon } from '../utils/icons';
import { SectionHeader, GlassCard } from '../ui/atoms';

export default function ServicesSection() {
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
    <section id="services" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="sr">
          <SectionHeader
            num="08 / Offerings"
            title="Professional"
            accent="Services"
            sub="Technical solutions I provide to optimize business operations and engineer digital applications"
          />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 md:mt-16">
          {SERVICES.map((srv, idx) => {
            const Icon = resolveIcon(srv.iconName || 'Code');
            return (
              <GlassCard
                key={idx}
                className="spotlight-card tilt holo rounded-3xl border border-gray-800/80 bg-gray-900/15 p-8 hover:border-gray-700 hover:bg-gray-900/35 transition-all duration-300 sr flex flex-col sm:flex-row gap-6 items-start"
                data-delay={idx * 100}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glowing Icon Wrapper */}
                <div className="tilt-inner w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                  style={{ background: `${srv.accent}12`, border: `1px solid ${srv.accent}25`, boxShadow: `0 0 15px ${srv.accent}10` }}>
                  {Icon && <Icon size={24} style={{ color: srv.accent }} />}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg sm:text-xl mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {srv.desc}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
