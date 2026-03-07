import React, { useState, useEffect } from 'react';
import { generateResumePDF } from '../utils/generateResume';

const links = [
  { label: 'About',    href: '#about'   },
  { label: 'Skills',   href: '#skills'  },
  { label: 'Projects', href: '#projects'},
  { label: 'GitHub',   href: '#github'  },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [active, setActive]       = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = links.map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-2.5 bg-black/88 backdrop-blur-2xl border-b border-gray-800/60 shadow-lg shadow-black/40'
               : 'py-5 bg-transparent'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:bg-cyan-400 transition-colors">
            <span className="text-black font-black text-[11px]">SC</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors hidden sm:block">
            Suraj Chauhan
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`px-4 py-2 rounded-lg font-mono text-[11px] uppercase tracking-widest transition-all ${
                active === l.href.slice(1)
                  ? 'text-cyan-400 bg-cyan-400/8'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-gray-900/60'}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <button onClick={generateResumePDF}
            className="px-4 py-2 border border-gray-700 hover:border-cyan-500/50 rounded-lg font-mono text-[11px] uppercase tracking-widest text-gray-400 hover:text-cyan-400 transition-all">
            Resume
          </button>
          <a href="#contact"
            className="btn-glow px-5 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-mono text-[11px] uppercase tracking-widest text-black font-bold transition-colors">
            Hire Me
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-[5px] p-1 group" onClick={() => setOpen(!open)} aria-label="menu">
          <span className={`w-5 h-0.5 bg-gray-400 group-hover:bg-white rounded-full transition-all origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-400 group-hover:bg-white rounded-full transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-gray-400 group-hover:bg-white rounded-full transition-all origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 border-t border-gray-800/60 bg-black/95 backdrop-blur-xl flex flex-col gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`py-3 px-4 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${
                active === l.href.slice(1) ? 'text-cyan-400 bg-cyan-400/8' : 'text-gray-500 hover:text-gray-200 hover:bg-gray-900'}`}>
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-gray-800/40">
            <button onClick={generateResumePDF}
              className="flex-1 py-3 border border-gray-700 rounded-xl font-mono text-xs uppercase tracking-widest text-gray-400 hover:border-cyan-500/40 transition-all">
              Resume
            </button>
            <a href="#contact" onClick={() => setOpen(false)}
              className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-mono text-xs uppercase tracking-widest text-black font-bold text-center transition-colors">
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
