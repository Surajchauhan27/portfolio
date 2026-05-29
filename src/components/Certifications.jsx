import React, { useRef, useEffect, memo } from 'react';
import { CERTIFICATIONS } from '../data/config';
import { resolveIcon } from '../utils/icons';
import { SectionHeader, Tag } from '../ui/atoms';

const CertCard = memo(function CertCard({ cert, index }) {
  const Icon = resolveIcon(cert.iconName || 'Award');
  
  // Status color styles helper
  const getStatusStyle = (duration) => {
    if (duration === 'In Progress') {
      return 'border-yellow-500/20 bg-yellow-500/5 text-yellow-400';
    }
    if (duration === 'Learning') {
      return 'border-purple-500/20 bg-purple-500/5 text-purple-400';
    }
    return 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400';
  };

  return (
    <div
      className="cert-card spotlight-card tilt group bg-gray-900/25 border border-gray-800/60 rounded-2xl p-6 sm:p-8 hover:border-gray-700 transition-all flex flex-col justify-between min-h-[260px] sr"
      data-delay={(index + 1) * 80}
    >
      <div>
        <div className="flex items-start justify-between mb-5">
          <div className="tilt-inner w-12 h-12 rounded-xl flex items-center justify-center transition-all"
            style={{ background: `${cert.accent}15`, border: `1px solid ${cert.accent}30` }}>
            {Icon && <Icon size={20} style={{ color: cert.accent }} />}
          </div>
          <span className={`font-mono text-[9px] uppercase tracking-widest border px-3 py-1 rounded-full ${getStatusStyle(cert.duration)}`}>
            {cert.duration}
          </span>
        </div>
        
        <h4 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors leading-tight mb-1">{cert.title}</h4>
        <p className="font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color: cert.accent + 'dd' }}>{cert.org}</p>
        <p className="text-xs sm:text-sm leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors mb-5">{cert.desc}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {cert.tags.map(tag => (
          <Tag key={tag} accent={cert.accent}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
});

export default function CertificationsSection() {
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
    <section id="credentials" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="sr">
          <SectionHeader
            num="06 / Credentials"
            title="Certifications"
            sub="Professional specializations and ongoing learning paths"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-12 md:mt-16">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
