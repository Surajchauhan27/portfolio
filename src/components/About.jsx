import React from 'react';
import { User, CheckCircle, ArrowRight, Code, MapPin, Calendar, Award } from 'lucide-react';

const competencies = [
  'Data Analysis & Cleaning','Python Scripting & Automation',
  'Power BI Dashboard Design','Excel Formulas & Pivot Tables',
  'Research & Insight Generation','Data Visualization',
];

const quickFacts = [
  { icon: MapPin,   label: 'Location', value: 'Haldwani, Uttarakhand' },
  { icon: Award,    label: 'Degree',   value: 'BCA Graduate'          },
  { icon: Calendar, label: 'Status',   value: 'Open to Work'          },
];

const timeline = [
  { year: '2024', event: 'Completed BCA degree with focus on data systems' },
  { year: '2023', event: 'Built AuraBot AI assistant using Python & OpenAI API' },
  { year: '2023', event: 'Completed Data Analytics & Python professional training' },
  { year: '2022', event: 'Created Sales Analysis Dashboard in Power BI' },
];

export default function AboutSection() {
  return (
    <section id="about"
      className="relative grid grid-cols-1 md:grid-cols-12 border-b border-gray-800 bg-black scroll-mt-20 overflow-hidden">

      <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(34,211,238,.04), transparent 70%)' }} />

      {/* Left column */}
      <div className="col-span-1 md:col-span-4 p-6 sm:p-8 md:p-12 flex flex-col gap-7 border-b md:border-b-0 md:border-r border-gray-800 sr sr-left">

        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
          <User size={20} className="text-cyan-400" />
        </div>

        {/* Quick facts */}
        <div>
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-500">Quick Info</h3>
          <div className="space-y-3">
            {quickFacts.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="tilt flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all flex-shrink-0">
                    <Icon size={13} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
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

        {/* Competencies */}
        <div>
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest mb-4 text-cyan-400">Core Competencies</h3>
          <div className="space-y-2.5">
            {competencies.map((c, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-800/50 pb-2.5 group hover:border-gray-700 transition-colors last:border-0">
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{c}</span>
                <CheckCircle size={14} className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Education badge */}
        <div className="tilt p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/20 transition-all">
          <p className="font-mono text-[9px] uppercase tracking-widest text-gray-600 mb-1">Education</p>
          <p className="font-bold text-white text-sm">Bachelor of Computer Applications</p>
          <p className="text-xs text-cyan-400/70 mt-1 font-mono">BCA Graduate</p>
        </div>
      </div>

      {/* Right content */}
      <div className="col-span-1 md:col-span-8 p-6 sm:p-8 md:p-14 flex flex-col justify-center sr sr-right" data-delay="120">

        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] mb-4 block text-cyan-400">
          01 / About Me
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black tracking-[-0.03em] leading-[1.1] mb-7 text-white">
          Turning raw data into{' '}
          <span className="text-cyan-400">actionable insights</span>{' '}
          <span className="text-gray-600">through analysis, automation, and clear storytelling.</span>
        </h2>

        <div className="space-y-4 mb-8">
          <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-2xl">
            I'm an aspiring Research Analyst with hands-on experience in Python, Excel, and Power BI.
            I love working with data — cleaning messy datasets, building dashboards that tell clear stories,
            and automating repetitive tasks so teams can focus on what matters.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-gray-400 max-w-2xl">
            As a BCA graduate, I bring a solid foundation in computer science combined with a genuine
            passion for data. Actively seeking an entry-level opportunity to grow alongside experienced
            professionals and contribute real value from day one.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-8 pl-4 border-l-2 border-gray-800 space-y-5 max-w-lg">
          {timeline.map((item, i) => (
            <div key={i} className="relative pl-4 group">
              <div className="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-cyan-500 group-hover:shadow-[0_0_8px_rgba(34,211,238,.5)] transition-all" />
              <p className="font-mono text-[9px] text-cyan-400/60 mb-1">{item.year}</p>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.event}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="#projects"
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 group">
            View My Work
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="https://github.com/Surajchauhan27" target="_blank" rel="noreferrer"
            className="border border-gray-700 hover:border-gray-600 hover:bg-gray-900 text-gray-300 hover:text-white px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
            <Code size={14} />
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
