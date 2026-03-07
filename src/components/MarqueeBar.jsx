import React from 'react';

const items = ['Python','·','Power BI','·','Data Analysis','·','Excel','·','BCA Graduate','·','Open to Work','·','Research Analyst','·','Data Visualization','·'];

export default function MarqueeBar() {
  return (
    <div className="relative overflow-hidden border-b border-gray-800/60 py-4"
      style={{ background: 'rgba(34,211,238,.025)' }}>

      {/* Fade edges */}
      <div className="absolute left-0 inset-y-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
      <div className="absolute right-0 inset-y-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #000, transparent)' }} />

      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`font-mono text-[10px] uppercase tracking-[0.2em] mx-7 ${item==='·'?'text-cyan-400 font-bold':'text-gray-600'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
