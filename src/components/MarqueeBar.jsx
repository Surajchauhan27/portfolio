import React from 'react';

const items = [
  'Python', '·', 'Power BI', '·', 'Data Analysis', '·', 'Excel',
  '·', 'BCA Graduate', '·', 'Open to Work', '·', 'Research Analyst',
  '·', 'Data Visualization', '·', 'Pandas', '·', 'Matplotlib', '·',
];

const items2 = [
  'SQL', '·', 'DAX', '·', 'Power Query', '·', 'VBA', '·',
  'NumPy', '·', 'Automation', '·', 'Dashboards', '·', 'Insights',
  '·', 'Storytelling', '·', 'Machine Learning', '·', 'APIs', '·',
];

export default function MarqueeBar() {
  return (
    <div className="relative overflow-hidden border-b border-gray-800/60 py-0" style={{ background: 'rgba(34,211,238,.02)' }}>

      {/* Fade edges */}
      <div className="absolute left-0 inset-y-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
      <div className="absolute right-0 inset-y-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #000, transparent)' }} />

      {/* Row 1 – forward */}
      <div className="py-3 border-b border-gray-900/60">
        <div className="marquee-track">
          {[...items, ...items].map((item, i) => (
            <span key={i} className={`font-mono text-[10px] uppercase tracking-[0.25em] mx-6 ${item === '·' ? 'text-cyan-500/60 font-bold' : 'text-gray-600 hover:text-gray-400 transition-colors'}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 – reverse */}
      <div className="py-3">
        <div className="marquee-track-rev">
          {[...items2, ...items2].map((item, i) => (
            <span key={i} className={`font-mono text-[10px] uppercase tracking-[0.25em] mx-6 ${item === '·' ? 'text-purple-500/50 font-bold' : 'text-gray-700 hover:text-gray-500 transition-colors'}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
