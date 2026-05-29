import React, { useState, useEffect, useRef, memo } from 'react';
import { Cpu, Zap, Lightbulb, Puzzle, MessageSquare, Eye } from 'lucide-react';
import { useSpotlight } from '../hooks/useEffects';
import { SKILLS, TOOLS } from '../data/config';
import { resolveIcon } from '../utils/icons';
import { SectionHeader, ToolChip, GlassCard } from '../ui/atoms';

/* ─────────────────────────────────────────────────────────────
 * Soft skills — section-specific data (not shared across sections,
 * so it lives here rather than in global config)
 * ───────────────────────────────────────────────────────────── */
const SOFT_SKILLS = [
  { name: 'Analytical Thinking',  iconName: 'Lightbulb',     desc: 'Breaking complex problems into clear, actionable insights',   color: 'text-yellow-400' },
  { name: 'Problem Solving',      iconName: 'Puzzle',        desc: 'Finding efficient data-driven solutions with available tools', color: 'text-cyan-400'   },
  { name: 'Critical Observation', iconName: 'Eye',           desc: 'Identifying patterns, anomalies & trends in large datasets',  color: 'text-blue-400'   },
  { name: 'Report Writing',       iconName: 'MessageSquare', desc: 'Translating raw data into clear, compelling narratives',      color: 'text-purple-400' },
];

/* ── Skill bar row ── */
const SkillBar = memo(function SkillBar({ skill, animated, index }) {
  const Icon = resolveIcon(skill.icon);
  const glowStrong = skill.glow.replace('.4', '.9');
  const glowFaint  = skill.glow.replace('.4', '.15');
  const glowBorder = skill.glow.replace('.4', '.3');

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${glowFaint}, transparent)`, border: `1px solid ${glowBorder}` }}>
            {Icon && <Icon size={13} className="text-white" />}
          </div>
          <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
        </div>
        <span className="font-mono text-[10px] font-bold" style={{ color: glowStrong }}>{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className={`skill-bar-fill bg-gradient-to-r ${skill.color}`}
          style={{
            width:          animated ? `${skill.level}%` : '0%',
            transitionDelay:`${index * 120}ms`,
            boxShadow:      animated ? `0 0 12px ${skill.glow}` : 'none',
          }}
        />
      </div>
    </div>
  );
});

/* ── Soft skill row ── */
const SoftSkillRow = memo(function SoftSkillRow({ skill }) {
  const Icon = resolveIcon(skill.iconName);
  return (
    <div className="flex items-start gap-3 group">
      <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-transparent flex items-center justify-center group-hover:bg-gray-800 group-hover:border-gray-700 transition-all flex-shrink-0">
        {Icon && <Icon size={13} className={`${skill.color} opacity-60 group-hover:opacity-100 transition-opacity`} />}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors leading-none mb-1">{skill.name}</p>
        <p className="text-[11px] text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors">{skill.desc}</p>
      </div>
    </div>
  );
});

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useSpotlight(sectionRef);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !animated) setAnimated(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [animated]);

  return (
    <section id="skills" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">

      {/* BG accents */}
      <div className="absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        <SectionHeader
          num="02 / Expertise"
          title="Technical"
          accent="Arsenal"
          sub="Tools & skills I wield to turn data into decisions"
          RightSlot={<Cpu size={28} className="text-gray-800 hidden md:block mb-2" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Skill bars (2 cols) */}
          <GlassCard className="lg:col-span-2 rounded-2xl p-6 sm:p-8 bg-gray-900/30 border border-gray-800/60 sr" data-delay="0">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Zap size={12} className="text-cyan-400" />
              </div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">Proficiency Levels</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} animated={animated} index={i} />
              ))}
            </div>
          </GlassCard>

          {/* Right column */}
          <div className="flex flex-col gap-5">

            {/* Tools grid — now from config */}
            <GlassCard className="rounded-2xl p-6 sm:p-7 bg-gray-900/20 border border-gray-800/60 flex-1 sr" data-delay="100">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-5 text-cyan-400">Stack & Tools</h3>
              <div className="grid grid-cols-3 gap-2">
                {TOOLS.map(t => <ToolChip key={t.name} name={t.name} emoji={t.emoji} />)}
              </div>
            </GlassCard>

            {/* Mindset */}
            <GlassCard className="rounded-2xl p-6 sm:p-7 bg-gray-900/20 border border-gray-800/60 sr" data-delay="200">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-5 text-cyan-400">Mindset</h3>
              <div className="space-y-4">
                {SOFT_SKILLS.map(s => <SoftSkillRow key={s.name} skill={s} />)}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sr" data-delay="200">
          <GlassCard className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-gray-900/60 via-gray-900/30 to-gray-900/60 border border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 mb-1">Always Learning</p>
              <p className="text-lg font-bold text-white">Continuously expanding my data science toolkit 🚀</p>
              <p className="text-sm text-gray-500 mt-1">Currently exploring: SQL, Tableau, Machine Learning fundamentals</p>
            </div>
            <a href="#contact"
              className="btn-glow flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-7 py-3.5 rounded-xl font-bold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all hover:scale-105 shadow-lg shadow-cyan-500/25">
              Let's Collaborate
            </a>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
