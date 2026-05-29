import React, { useState, useEffect, useRef, memo } from 'react';
import { ACHIEVEMENTS } from '../data/config';
import { SectionHeader, GlassCard } from '../ui/atoms';

const CountUp = memo(function CountUp({ target, suffix, started, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    if (animRef.current) return;

    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(ease * target));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [started, target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
});

export default function AchievementsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          sectionRef.current?.querySelectorAll('.sr:not(.in)').forEach((el, i) => {
            setTimeout(() => el.classList.add('in'), parseInt(el.dataset.delay || 0));
          });
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="achievements" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      
      {/* Background neon blur accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="sr">
          <SectionHeader
            num="05 / Milestones"
            title="Key"
            accent="Achievements"
            sub="Empirical evidence of transforming datasets into actionable insights"
          />
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 md:mt-16">
          {ACHIEVEMENTS.map((ach, idx) => (
            <GlassCard
              key={idx}
              className="spotlight-card tilt grad-border rounded-2xl p-6 sm:p-8 bg-gray-900/20 border border-gray-800/60 hover:border-cyan-500/20 transition-all flex flex-col justify-between group sr text-center min-h-[220px]"
              data-delay={idx * 80}
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-gray-700 mb-3">0{idx + 1}</div>
              
              <div>
                <h3 className="tilt-inner text-4xl sm:text-5xl font-black tracking-[-0.04em] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all leading-none mb-3">
                  <CountUp target={ach.value} suffix={ach.suffix} started={visible} />
                </h3>
                
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-300 font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {ach.title}
                </h4>
              </div>

              <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors leading-relaxed mt-2">
                {ach.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
