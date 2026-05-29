import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NAV_LINKS, PERSONAL } from '../data/config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');
  const [progress, setProgress] = useState(0);

  // ✅ Lazy import — jsPDF (158KB) only loaded when user clicks
  const handleResume = useCallback(async () => {
    const { generateResumePDF } = await import('../utils/generateResume');
    generateResumePDF();
  }, []);

  // ✅ Cache section offsets — avoid querySelectorAll on every scroll tick
  const sectionIds  = NAV_LINKS.map(l => l.href.slice(1));

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 40);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollTop >= el.offsetTop - 130) { setActive(sectionIds[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2.5 bg-black/90 backdrop-blur-2xl border-b border-gray-800/60 shadow-xl shadow-black/50'
          : 'py-5 bg-transparent'
      }`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all group-hover:scale-105">
              <span className="text-black font-black text-[11px]">{PERSONAL.initials}</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-mono text-[11px] uppercase tracking-widest text-gray-400 group-hover:text-gray-200 transition-colors block leading-none">{PERSONAL.nameShort}</span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-gray-700 block">{PERSONAL.role}</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className={`relative px-3.5 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all ${
                  active === l.href.slice(1)
                    ? 'text-cyan-400'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-gray-900/60'
                }`}>
                {active === l.href.slice(1) && (
                  <span className="absolute inset-0 rounded-lg bg-cyan-400/8 border border-cyan-400/20" />
                )}
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button onClick={handleResume}
              className="px-4 py-2 border border-gray-700 hover:border-cyan-500/50 rounded-lg font-mono text-[10px] uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-all hover:bg-cyan-500/5">
              Resume
            </button>
            <a href="#contact"
              className="btn-glow px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg font-mono text-[10px] uppercase tracking-widest text-black font-bold transition-all hover:scale-105 shadow-lg shadow-cyan-500/25">
              Hire Me
            </a>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden flex flex-col gap-[5px] p-1 group" onClick={() => setOpen(!open)} aria-label="menu">
            <span className={`w-5 h-0.5 bg-gray-400 group-hover:bg-white rounded-full transition-all origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-400 group-hover:bg-white rounded-full transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-gray-400 group-hover:bg-white rounded-full transition-all origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-4 border-t border-gray-800/60 bg-black/95 backdrop-blur-xl flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`py-3 px-4 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${
                  active === l.href.slice(1) ? 'text-cyan-400 bg-cyan-400/8 border border-cyan-400/20' : 'text-gray-500 hover:text-gray-200 hover:bg-gray-900'
                }`}>
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-gray-800/40">
              <button onClick={handleResume}
                className="flex-1 py-3 border border-gray-700 rounded-xl font-mono text-xs uppercase tracking-widest text-gray-400 hover:border-cyan-500/40 transition-all">
                Resume
              </button>
              <a href="#contact" onClick={() => setOpen(false)}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-mono text-xs uppercase tracking-widest text-black font-bold text-center transition-all">
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
