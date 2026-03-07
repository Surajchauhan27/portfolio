import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBar from './components/MarqueeBar';
import About from './components/About';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import GitHubSection from './components/GitHubSection';
import ContactSection from './components/ContactSection';
import { useScrollReveal, useTilt, useCursor } from './hooks/useEffects';

export default function App() {
  useScrollReveal();
  useTilt();
  useCursor();

  return (
    <div className="relative">
      {/* Ambient background orbs */}
      <div className="orb w-[700px] h-[700px] -top-60 -left-60"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.06) 0%, transparent 70%)' }} />
      <div className="orb w-[500px] h-[500px] top-[60%] -right-40"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.05) 0%, transparent 70%)', animationDelay: '-5s' }} />
      <div className="orb w-[400px] h-[400px] top-[30%] left-[45%]"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,.04) 0%, transparent 70%)', animationDelay: '-3s' }} />

      {/* Custom cursor */}
      <div className="cursor-dot" />
      <div className="cursor-ring" />

      <main className="relative z-10 bg-black min-h-screen selection:bg-cyan-500/30 selection:text-cyan-400">
        <Navbar />
        <Hero />
        <MarqueeBar />
        <About />
        <SkillsSection />
        <ProjectsSection />
        <GitHubSection />
        <ContactSection />

        <footer className="py-10 border-t border-gray-900 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-cyan-500 flex items-center justify-center">
                <span className="text-black font-black text-[10px]">SC</span>
              </div>
              <p className="font-mono text-[10px] text-gray-700 uppercase tracking-widest">Suraj Singh Chauhan</p>
            </div>
            <p className="font-mono text-[10px] text-gray-700 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} · Data & Research Analyst Portfolio
            </p>
            <div className="flex items-center gap-4">
              {[
                { label: 'GitHub', href: 'https://github.com/Surajchauhan27' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/codewithsuraj' },
                { label: 'Email', href: 'mailto:surajchauhan22281@gmail.com' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="font-mono text-[10px] text-gray-700 uppercase tracking-widest hover:text-gray-400 transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
