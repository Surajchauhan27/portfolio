import React, { memo } from 'react';
import { PERSONAL, SOCIALS } from '../data/config';

/**
 * Footer — extracted from App.jsx
 *
 * Previously: inline JSX inside App.jsx with hardcoded URLs
 * Now: isolated component pulling from config, zero hardcoded strings
 */
const Footer = memo(function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-gray-900 bg-black relative overflow-hidden">
      <div className="footer-glow absolute top-0 inset-x-0 h-px" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-black font-black text-[10px]">{PERSONAL.initials}</span>
          </div>
          <div>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{PERSONAL.name}</p>
            <p className="font-mono text-[9px] text-gray-700 uppercase tracking-widest">{PERSONAL.role}</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="font-mono text-[10px] text-gray-700 uppercase tracking-widest">
          &copy; {year} · Crafted with passion in Haldwani, India
        </p>

        {/* Social links from config — no hardcoded URLs */}
        <nav className="flex items-center gap-5" aria-label="Social links">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="font-mono text-[10px] text-gray-700 uppercase tracking-widest hover:text-cyan-400 transition-colors duration-300">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
});

export default Footer;
