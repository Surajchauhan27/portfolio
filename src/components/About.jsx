import React, { useRef } from 'react';
import { User, CheckCircle, ArrowRight, Code, MapPin, Calendar, Award, Zap, BookOpen, Target } from 'lucide-react';
import { useSpotlight } from '../hooks/useEffects';
import { PERSONAL } from '../data/config';

const competencies = [
  { label: 'Data Analysis & Cleaning',      emoji: '🔬' },
  { label: 'Python Scripting & Automation', emoji: '🐍' },
  { label: 'Power BI Dashboard Design',     emoji: '📊' },
  { label: 'Excel Formulas & Pivot Tables', emoji: '📋' },
  { label: 'Research & Insight Generation', emoji: '🔍' },
  { label: 'Data Visualization',            emoji: '🎨' },
];

const quickFacts = [
  { icon: MapPin,   label: 'Location', value: PERSONAL.location,  color: 'text-cyan-400'   },
  { icon: Award,    label: 'Degree',   value: PERSONAL.degree,    color: 'text-blue-400'   },
  { icon: Calendar, label: 'Status',   value: 'Open to Work 🟢',  color: 'text-green-400'  },
  { icon: Target,   label: 'Goal',     value: 'Entry-Level Analyst', color: 'text-purple-400' },
];

const timeline = [
  { year: '2024', event: 'Completed BCA degree with focus on data systems & algorithms', icon: BookOpen },
  { year: '2023', event: 'Built AuraBot — AI assistant using Python & OpenAI API',       icon: Zap     },
  { year: '2023', event: 'Completed Data Analytics & Python professional training',       icon: Award   },
  { year: '2022', event: 'Created Sales Analysis Dashboard in Power BI',                  icon: Target  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  // ✅ FIXED: replaces the 12-line copy-pasted spotlight useEffect
  useSpotlight(sectionRef);

  return (
    <section id="about" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black scroll-mt-20 overflow-hidden">

      {/* BG accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(34,211,238,.04), transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(139,92,246,.04), transparent 65%)' }} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12">

        {/* ── Left column ── */}
        <div className="col-span-1 md:col-span-4 p-6 sm:p-8 md:p-12 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-800 sr sr-left">

          <div>
            <span className="section-num">01 / About Me</span>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
              <User size={18} className="text-cyan-400" />
            </div>
          </div>

          {/* Quick facts */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-500">Quick Info</h3>
            <div className="space-y-2">
              {quickFacts.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="spotlight-card tilt flex items-center gap-3 p-3 rounded-xl border border-gray-800/60 bg-gray-900/20 hover:border-gray-700 hover:bg-gray-900/40 group transition-all">
                    <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:border-gray-700 flex-shrink-0 transition-all">
                      <Icon size={13} className={`${f.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-gray-600">{f.label}</p>
                      <p className="text-sm font-semibold text-gray-200">{f.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core competencies */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-4 text-cyan-400">Core Competencies</h3>
            <div className="space-y-2">
              {competencies.map((c, i) => (
                <div key={i}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg border border-transparent hover:border-gray-800 hover:bg-gray-900/30 group transition-all cursor-default">
                  <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors flex items-center gap-2">
                    <span>{c.emoji}</span> {c.label}
                  </span>
                  <CheckCircle size={13} className="text-cyan-500/40 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Education badge */}
          <div className="spotlight-card tilt p-5 rounded-xl bg-gradient-to-br from-gray-900/60 to-gray-900/20 border border-gray-800 hover:border-cyan-500/20 transition-all">
            <p className="font-mono text-[9px] uppercase tracking-widest text-gray-600 mb-2">🎓 Education</p>
            <p className="font-bold text-white text-base">Bachelor of Computer Applications</p>
            <p className="text-xs text-cyan-400/70 mt-1 font-mono">BCA Graduate · Computer Science</p>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="col-span-1 md:col-span-8 p-6 sm:p-8 md:p-14 flex flex-col justify-center sr sr-right" data-delay="120">

          <h2 className="text-2xl sm:text-3xl md:text-[2.8rem] font-black tracking-[-0.03em] leading-[1.1] mb-7 text-white">
            Turning raw data into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow">actionable insights</span>{' '}
            <span className="text-gray-700">using analytics, visualization, and automation.</span>
          </h2>

          <div className="space-y-4 mb-10">
            <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-2xl">
              Detail-oriented <span className="text-gray-200 font-semibold">BCA graduate</span> with practical experience in Data Analysis, SQL, Python, Excel, Power BI, AI tools, and dashboard development.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-2xl">
              Passionate about transforming raw, messy data into <span className="text-cyan-400 font-semibold">actionable business insights</span>. I specialize in building interactive dashboards, conducting exploratory analysis, and automating reporting pipelines to drive data-driven decision making.
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-10 pl-4 border-l-2 border-gray-800 space-y-5 max-w-xl">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative pl-5 group">
                  <div className="absolute -left-[1.3rem] top-1 w-3.5 h-3.5 rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-cyan-500 timeline-dot transition-all" />
                  <p className="font-mono text-[9px] text-cyan-400/60 mb-1 flex items-center gap-1.5">
                    <Icon size={10} className="inline" /> {item.year}
                  </p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.event}</p>
                </div>
              );
            })}
          </div>

          {/* Mini stats row */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { num: '4+', label: 'Projects' },
              { num: '6+', label: 'Tools'    },
              { num: '200+', label: 'Commits' },
              { num: 'BCA', label: 'Degree'  },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-800 bg-gray-900/30 group hover:border-cyan-500/30 hover:bg-gray-900/50 transition-all">
                <span className="font-black text-white text-lg tracking-tight group-hover:text-cyan-400 transition-colors">{s.num}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="#projects"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black px-7 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 group hover:scale-105">
              View My Work
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={PERSONAL.github} target="_blank" rel="noreferrer"
              className="border border-gray-700 hover:border-gray-600 hover:bg-gray-900/60 text-gray-300 hover:text-white px-7 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
              <Code size={14} /> GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
