import React from 'react';
import { GraduationCap, BarChart3, Terminal, Github, ExternalLink, Code2 } from 'lucide-react';

const languages = [
  { name: 'Python',    pct: 65, color: '#22d3ee' },
  { name: 'Excel/VBA', pct: 20, color: '#0891b2' },
  { name: 'Other',     pct: 15, color: '#1e293b'  },
];

const certifications = [
  {
    title: 'Retail Training Course', org: 'Professional Development', duration: '3 Months',
    icon: GraduationCap,
    desc: 'Professional retail operations and customer analytics training covering business reporting and data-driven decision making.',
    tags: ['Business Analytics','Customer Data','Reporting'],
  },
  {
    title: 'Data Analytics Training', org: 'Professional Course', duration: 'Professional',
    icon: BarChart3,
    desc: 'Hands-on training covering data wrangling, visualization, Power BI dashboarding, and insight generation from raw datasets.',
    tags: ['Power BI','Data Wrangling','Visualization'],
  },
  {
    title: 'Python Training', org: 'Professional Course', duration: 'Professional',
    icon: Terminal,
    desc: 'Scripting, automation, and data analysis using Python and its ecosystem — Pandas, Matplotlib, and API integrations.',
    tags: ['Python','Pandas','Automation'],
  },
];

const ghStats = [
  { label: 'Repositories',  value: '10+',     sub: 'Public & Private' },
  { label: 'Contributions', value: '200+',    sub: 'Commits & PRs'    },
  { label: 'Followers',     value: 'Growing', sub: 'Community'         },
];

export default function GitHubSection() {
  return (
    <section id="github"
      className="relative border-b border-gray-800 bg-black overflow-hidden scroll-mt-20">

      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/4 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-28 max-w-7xl mx-auto">

        {/* Header */}
        <div className="sr mb-12 sm:mb-14">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] block mb-3 text-cyan-400">04 / GitHub</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] text-white">
            Open Source <span className="text-gray-700">Activity</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sr" data-delay="80">
          {ghStats.map((s, i) => (
            <div key={i}
              className="tilt bg-gray-900/30 border border-gray-800/60 rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:border-cyan-500/20 hover:bg-gray-900/50 transition-all group cursor-default">
              <p className="text-2xl sm:text-3xl md:text-5xl font-black font-mono tracking-[-0.04em] mb-1 text-white group-hover:text-cyan-400 transition-colors">
                {s.value}
              </p>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">{s.label}</p>
              <p className="text-[9px] text-gray-700 hidden sm:block">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Language bar */}
        <div className="tilt bg-gray-900/20 border border-gray-800/60 rounded-2xl p-5 sm:p-7 mb-5 sr" data-delay="150">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">Top Languages</h3>
            <Code2 size={14} className="text-gray-700" />
          </div>
          <div className="flex gap-1 h-2.5 rounded-full overflow-hidden mb-4 bg-gray-800">
            {languages.map((l, i) => (
              <div key={i} className="h-full" style={{ width: `${l.pct}%`, background: l.color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {languages.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="font-mono text-[11px] text-gray-400">
                  {l.name} <span className="text-gray-600">{l.pct}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution grid */}
        <div className="tilt bg-gray-900/20 border border-gray-800/60 rounded-2xl p-5 sm:p-7 mb-8 sm:mb-10 sr overflow-x-auto" data-delay="200">
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-4 text-cyan-400">Contribution Activity</h3>
          <div className="flex gap-[3px] flex-wrap min-w-[300px]">
            {Array.from({ length: 52 * 7 }).map((_, i) => {
              const r = Math.random();
              const bg = r>.88?'#22d3ee':r>.7?'#0891b2':r>.45?'#164e63':r>.22?'#0c2231':'#111827';
              return <div key={i} className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: bg }} />;
            })}
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-gray-700 mt-3">Simulated — visit GitHub for live data</p>
        </div>

        {/* GitHub CTA */}
        <div className="flex justify-center mb-16 sm:mb-20 sr" data-delay="250">
          <a href="https://github.com/Surajchauhan27" target="_blank" rel="noreferrer"
            className="group btn-glow flex items-center gap-3 bg-white hover:bg-cyan-400 text-black px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm transition-all">
            <Github size={17} />
            Visit GitHub Profile
            <ExternalLink size={13} className="opacity-50 group-hover:opacity-100" />
          </a>
        </div>

        <div className="divider-glow mb-16 sm:mb-20" />

        {/* Certifications */}
        <div className="sr mb-10 sm:mb-12" data-delay="0">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] block mb-3 text-cyan-400">05 / Credentials</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] text-white">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <div key={i}
                className="tilt group bg-gray-900/30 border border-gray-800/60 rounded-2xl p-6 sm:p-8 hover:bg-gray-900 hover:border-cyan-500/20 transition-all duration-400 flex flex-col sr"
                style={{ transitionDelay: `${(i+1)*120}ms` }}
                data-delay={(i+1)*120}>
                <div className="flex items-start justify-between mb-5">
                  <div className="tilt-inner w-11 h-11 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/15 transition-all">
                    <Icon size={19} className="text-cyan-400" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-gray-600 border border-gray-800 px-2 py-1 rounded-lg">{cert.duration}</span>
                </div>
                <h4 className="font-bold text-base sm:text-lg text-white mb-1 group-hover:text-cyan-50 transition-colors">{cert.title}</h4>
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500/60 mb-3">{cert.org}</p>
                <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors mb-4 flex-1">{cert.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 rounded-md bg-gray-800/60 text-[10px] font-mono text-gray-600 uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
