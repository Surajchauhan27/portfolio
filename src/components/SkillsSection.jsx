import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Terminal, Table, BarChart3, Wrench, PieChart, Lightbulb, Puzzle, MessageSquare, Eye, Microscope, Zap } from 'lucide-react';

const skills = [
  { name: 'Excel & Spreadsheets', level: 90, icon: Table,      color: 'from-emerald-500 to-teal-500'  },
  { name: 'Research Analysis',    level: 88, icon: Microscope, color: 'from-cyan-500 to-blue-500'      },
  { name: 'Data Cleaning',        level: 88, icon: Wrench,     color: 'from-cyan-500 to-blue-500'      },
  { name: 'Python',               level: 80, icon: Terminal,   color: 'from-cyan-400 to-blue-500'      },
  { name: 'Data Visualization',   level: 78, icon: PieChart,   color: 'from-blue-400 to-indigo-500'    },
  { name: 'Power BI',             level: 75, icon: BarChart3,  color: 'from-yellow-500 to-orange-500'  },
];

const tools = [
  'Python','Pandas','Matplotlib','Power BI','Excel','Power Query',
  'GitHub','VS Code','DAX','VBA','Market Analysis','Quantitative Research',
];

const softSkills = [
  { name: 'Analytical Thinking', icon: Lightbulb, desc: 'Breaking down complex problems into clear insights' },
  { name: 'Problem Solving',     icon: Puzzle,    desc: 'Finding efficient solutions with available data'   },
  { name: 'Critical Observation',icon: Eye,       desc: 'Identifying patterns and anomalies in datasets'   },
  { name: 'Report Writing',      icon: MessageSquare, desc: 'Translating data into clear, actionable reports' },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !animated) setAnimated(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [animated]);

  return (
    <section id="skills" ref={sectionRef}
      className="relative border-b border-gray-800 bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">

      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-12 sm:mb-16 sr">
          <div>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-cyan-400 block mb-3">02 / Expertise</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] text-white">
              Technical <span className="text-gray-700">Arsenal</span>
            </h2>
          </div>
          <Cpu size={26} className="text-gray-800 hidden md:block mb-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

          {/* Skill bars card */}
          <div className="tilt md:col-span-2 rounded-2xl p-6 sm:p-8 bg-gray-900/30 border border-gray-800/60 sr" data-delay="0">
            <div className="flex items-center gap-2 mb-7">
              <Zap size={13} className="text-cyan-400" />
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">Proficiency Levels</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              {skills.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon size={13} className="text-cyan-400" />
                        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{s.name}</span>
                      </div>
                      <span className="font-mono text-[10px] text-gray-600">{s.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className={`skill-bar-fill bg-gradient-to-r ${s.color}`}
                        style={{ width: animated ? `${s.level}%` : '0%', transitionDelay: `${i * 110}ms`,
                          boxShadow: animated ? '0 0 8px rgba(34,211,238,.35)' : 'none' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tools + soft skills */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="tilt rounded-2xl p-6 sm:p-7 bg-gray-900/20 border border-gray-800/60 flex-1 sr" data-delay="100">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-5 text-cyan-400">Stack & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((t, i) => (
                  <span key={i}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-cyan-500/40 hover:text-white hover:bg-gray-800 transition-all cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="tilt rounded-2xl p-6 sm:p-7 bg-gray-900/20 border border-gray-800/60 sr" data-delay="200">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-5 text-cyan-400">Mindset</h3>
              <div className="space-y-4">
                {softSkills.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-gray-800/50 border border-transparent flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all flex-shrink-0">
                        <Icon size={13} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors leading-none mb-1">{s.name}</p>
                        <p className="text-[11px] text-gray-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
