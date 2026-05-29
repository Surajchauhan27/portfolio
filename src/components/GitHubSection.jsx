import React, { useMemo, memo } from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { CERTIFICATIONS, PERSONAL } from '../data/config';
import { resolveIcon } from '../utils/icons';
import { SectionHeader, Tag } from '../ui/atoms';

/* ─────────────────────────────────────────────────────────────
 * Section-specific static data.
 * This data is unique to the GitHub section and not reused
 * elsewhere, so it lives here rather than in global config.
 * ───────────────────────────────────────────────────────────── */
const LANGUAGES = [
  { name: 'Python',    pct: 65, color: '#22d3ee', emoji: '🐍' },
  { name: 'Excel/VBA', pct: 20, color: '#0891b2', emoji: '📋' },
  { name: 'Other',     pct: 15, color: '#1e293b', emoji: '⚙️' },
];

const GH_STATS = [
  { label: 'Repositories',  value: '10+',     sub: 'Public & Private', iconName: 'Code2',    color: '#22d3ee' },
  { label: 'Contributions', value: '200+',    sub: 'Commits & PRs',    iconName: 'GitCommit', color: '#3b82f6' },
  { label: 'Community',     value: 'Growing', sub: 'Followers',        iconName: 'Users',    color: '#8b5cf6' },
];

/* Seeded deterministic contribution grid — pure function, no side effects */
function buildContributionGrid(seed = 42) {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
  return Array.from({ length: 52 * 7 }, () => {
    const r  = rand();
    const bg = r > .88 ? '#22d3ee' : r > .7 ? '#0891b2' : r > .45 ? '#164e63' : r > .22 ? '#0c2231' : '#0d1117';
    const opacity = r > .88 ? 1 : r > .7 ? .8 : r > .45 ? .6 : r > .22 ? .4 : 1;
    return { bg, opacity };
  });
}

/* ── CertCard — isolated, memo'd ── */
const CertCard = memo(function CertCard({ cert, index }) {
  const Icon = resolveIcon(cert.iconName);
  return (
    <div
      className="cert-card spotlight-card tilt group bg-gray-900/30 border border-gray-800/60 rounded-2xl p-6 sm:p-8 hover:border-gray-700 transition-all flex flex-col sr"
      data-delay={(index + 1) * 120}
      style={{ transitionDelay: `${(index + 1) * 120}ms` }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="tilt-inner w-12 h-12 rounded-xl flex items-center justify-center transition-all"
          style={{ background: `${cert.accent}15`, border: `1px solid ${cert.accent}30` }}>
          {Icon && <Icon size={20} style={{ color: cert.accent }} />}
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-gray-600 border border-gray-800 px-2.5 py-1 rounded-lg">
          {cert.duration}
        </span>
      </div>
      <h4 className="font-bold text-base sm:text-lg text-white mb-1">{cert.title}</h4>
      <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: cert.accent + 'aa' }}>{cert.org}</p>
      <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors mb-5 flex-1">{cert.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {cert.tags.map(tag => (
          <Tag key={tag} accent={cert.accent}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
});

export default function GitHubSection() {
  // Computed once — never changes, seeded deterministic output
  const cells = useMemo(() => buildContributionGrid(42), []);

  return (
    <section id="github" className="relative border-b border-gray-800 bg-black overflow-hidden scroll-mt-20">

      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-28 max-w-7xl mx-auto">

        <div className="sr mb-12 sm:mb-14">
          <SectionHeader
            num="04 / GitHub"
            title="Open Source"
            accent="Activity"
            sub="Commits, repos, and the journey in code"
          />
        </div>

        {/* GitHub stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sr" data-delay="80">
          {GH_STATS.map(s => {
            const Icon = resolveIcon(s.iconName);
            return (
              <div key={s.label}
                className="spotlight-card tilt bg-gray-900/30 border border-gray-800/60 rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:border-gray-700 hover:bg-gray-900/50 transition-all group cursor-default">
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-xl border border-gray-800 flex items-center justify-center group-hover:border-gray-700 transition-all"
                    style={{ background: `${s.color}12` }}>
                    {Icon && <Icon size={16} style={{ color: s.color }} className="opacity-70 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl md:text-5xl font-black font-mono tracking-[-0.04em] mb-1 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all"
                  style={{ backgroundImage: `linear-gradient(135deg, ${s.color}, ${s.color}88)` }}>
                  {s.value}
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">{s.label}</p>
                <p className="text-[9px] text-gray-700 hidden sm:block">{s.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Language bar */}
        <div className="tilt bg-gray-900/20 border border-gray-800/60 rounded-2xl p-5 sm:p-7 mb-5 sr" data-delay="150">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">Top Languages</h3>
            <Code2 size={14} className="text-gray-700" />
          </div>
          <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-5 bg-gray-800">
            {LANGUAGES.map(l => (
              <div key={l.name} className="h-full transition-all duration-1000" style={{ width: `${l.pct}%`, background: l.color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {LANGUAGES.map(l => (
              <div key={l.name} className="flex items-center gap-2.5 group">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: l.color }} />
                <span className="text-lg">{l.emoji}</span>
                <span className="font-mono text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">
                  {l.name} <span className="text-gray-600">{l.pct}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution grid */}
        <div className="tilt bg-gray-900/20 border border-gray-800/60 rounded-2xl p-5 sm:p-7 mb-8 sm:mb-10 sr overflow-x-auto" data-delay="200">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">Contribution Activity</h3>
            <span className="font-mono text-[9px] uppercase tracking-widest text-gray-700">Last 52 weeks</span>
          </div>
          <div className="flex gap-[3px] flex-nowrap min-w-max">
            {cells.map((cell, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-sm flex-shrink-0 hover:scale-125 transition-transform cursor-default"
                style={{ background: cell.bg, opacity: cell.opacity }} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 font-mono text-[9px] uppercase tracking-widest text-gray-700">
            <span>Less</span>
            {['#0d1117', '#0c2231', '#164e63', '#0891b2', '#22d3ee'].map(c => (
              <div key={c} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
            ))}
            <span>More</span>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-gray-800 mt-2">Simulated · Visit GitHub for live data</p>
        </div>

        {/* GitHub CTA */}
        <div className="flex justify-center mb-16 sm:mb-20 sr" data-delay="250">
          <a href={PERSONAL.github} target="_blank" rel="noreferrer"
            className="group btn-glow flex items-center gap-3 bg-white hover:bg-cyan-400 text-black px-8 sm:px-10 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 shadow-xl shadow-white/10">
            <Github size={18} />
            Visit GitHub Profile
            <ExternalLink size={13} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="divider-glow mb-16 sm:mb-20" />

        {/* Certifications — from config */}
        <SectionHeader
          num="05 / Credentials"
          title="Certifications"
          sub="Professional training & completed courses"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
