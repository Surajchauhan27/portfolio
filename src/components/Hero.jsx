import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { PERSONAL, ROLES, STATS } from '../data/config';

/* ─── Counter ────────────────────────────────────────────────────────────── */
const Counter = memo(function Counter({ target, suffix, duration = 1600, started }) {
  const [count, setCount] = useState(0);
  const animRef = useRef(null);
  useEffect(() => {
    if (!started || animRef.current) return;
    const begin = performance.now();
    const tick  = (now) => {
      const pct  = Math.min((now - begin) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setCount(Math.round(ease * target));
      if (pct < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [started, target, duration]);
  return <span>{count}{suffix}</span>;
});

/* ─── StatsGrid ──────────────────────────────────────────────────────────── */
const StatsGrid = memo(function StatsGrid({ visible }) {
  const [started, setStarted] = useState(false);
  const gridRef = useRef(null);
  useEffect(() => {
    if (started) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    if (gridRef.current) io.observe(gridRef.current);
    return () => io.disconnect();
  }, [started]);
  return (
    <div ref={gridRef} className={`grid grid-cols-2 gap-3 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {STATS.map((stat, i) => (
        <div key={i}
          className="spotlight-card tilt grad-border rounded-2xl p-5 sm:p-6 bg-gray-900/30 border border-gray-800/60 text-center group cursor-default hover:border-cyan-500/30 transition-all duration-300"
          style={{ transitionDelay: `${600 + i * 100}ms` }}>
          <div className="font-mono text-[9px] uppercase tracking-widest text-gray-700 mb-2">0{i + 1}</div>
          <h2 className="tilt-inner text-3xl sm:text-4xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-[-0.04em] mb-1">
            <Counter target={stat.value} suffix={stat.suffix} started={started} />
          </h2>
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-600 group-hover:text-gray-400 transition-colors block mb-1">{stat.label}</span>
          <span className="font-mono text-[8px] text-gray-800 group-hover:text-gray-600 transition-colors">{stat.sub}</span>
        </div>
      ))}
    </div>
  );
});

const GRAIN = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(%23g)' opacity='0.06'/></svg>";

/* ══════════════════════════════════════════════════════════════════════════
   HERO — Normal, non-sticky premium layout with mouse-sway
   ══════════════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const [visible,   setVisible]   = useState(false);
  const [displayed, setDisplayed] = useState('');
  const typeRef = useRef({ role: 0, char: 0, typing: true });

  const wrapperRef     = useRef(null);
  const gridLayerRef   = useRef(null);
  const glowRef        = useRef(null);
  const nameRef        = useRef(null);
  const statsRef       = useRef(null);
  const ghostRef       = useRef(null);

  /* Entrance */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Typewriter */
  useEffect(() => {
    const state = typeRef.current;
    let timeout;
    const tick = () => {
      const role = ROLES[state.role];
      if (state.typing) {
        if (state.char < role.length) { state.char++; setDisplayed(role.slice(0, state.char)); timeout = setTimeout(tick, 75 + Math.random() * 40); }
        else { state.typing = false; timeout = setTimeout(tick, 1800); }
      } else {
        if (state.char > 0) { state.char--; setDisplayed(role.slice(0, state.char)); timeout = setTimeout(tick, 40); }
        else { state.role = (state.role + 1) % ROLES.length; state.typing = true; timeout = setTimeout(tick, 300); }
      }
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, []);

  /* Mouse sway parallax */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (gridLayerRef.current) {
        gridLayerRef.current.style.transform = `scale(1.05) translate3d(${x * 16}px, ${y * 10}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(ellipse 80% 60% at ${50 + x * 15}% ${40 + y * 15}%, rgba(34,211,238,.07) 0%, transparent 65%)`;
      }
      if (nameRef.current) {
        nameRef.current.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0)`;
      }
      if (statsRef.current) {
        statsRef.current.style.transform = `translate3d(${x * -12}px, ${y * -8}px, 0)`;
      }
      if (ghostRef.current) {
        ghostRef.current.style.transform = `scale(1) translate3d(${x * 32}px, ${y * 20}px, 0)`;
      }
    };

    const container = wrapperRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  /* Resume download */
  const handleResumeClick = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Suraj_Chauhan_Resume.pdf';
    link.click();
  }, []);

  return (
    <section ref={wrapperRef} id="home" className="relative min-h-screen overflow-hidden bg-black flex items-center pt-24 pb-16 md:py-0">
      {/* Layer 0 — black base */}
      <div className="absolute inset-0 bg-black" style={{ zIndex: 0 }} />

      {/* Layer 1 — grid (parallax via ref) */}
      <div ref={gridLayerRef} className="absolute inset-0" style={{
        zIndex: 1,
        backgroundImage:
          'linear-gradient(rgba(34,211,238,.05) 1px,transparent 1px),' +
          'linear-gradient(90deg,rgba(34,211,238,.05) 1px,transparent 1px)',
        backgroundSize: '64px 64px',
        willChange: 'transform',
      }} />

      {/* Layer 2 — perspective floor */}
      <div className="perspective-grid" style={{ zIndex: 2, opacity: 0.8 }} />

      {/* Layer 3 — ambient glow */}
      <div ref={glowRef} className="absolute inset-0" style={{
        zIndex: 3, pointerEvents: 'none', willChange: 'background',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(34,211,238,.07) 0%, transparent 65%)'
      }} />

      {/* Layer 4 — grain */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 4, backgroundImage: `url("${GRAIN}")`, backgroundRepeat: 'repeat', backgroundSize: '200px 200px', opacity: 0.3, pointerEvents: 'none' }} />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px z-20" style={{ background: 'linear-gradient(90deg,transparent,rgba(34,211,238,.6),rgba(139,92,246,.4),transparent)' }} />

      {/* Ghost text — subtle ambient zoom */}
      <div ref={ghostRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', userSelect: 'none', overflow: 'hidden',
        willChange: 'transform',
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(80px, 22vw, 280px)', fontWeight: 900, color: 'white', opacity: 0.03, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
          DATA
        </span>
      </div>

      {/* ── Main hero content ─────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 grid md:grid-cols-12 gap-12 items-center w-full">
        {/* Left text */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start text-left">
          {/* Badges */}
          <div className={`flex flex-wrap items-center gap-2.5 mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-green-400">Available for Hire</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-black/40 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">📍 {PERSONAL.location}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">🎓 {PERSONAL.degree}</span>
            </div>
          </div>

          {/* Name */}
          <div ref={nameRef} className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ willChange: 'transform' }}>
            <h1 className="font-black leading-[0.85] tracking-[-0.05em] mb-6 chroma" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="glitch block text-white" data-text="Suraj" style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>Suraj</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-glow neon" style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}>Chauhan</span>
            </h1>
          </div>

          {/* Typewriter */}
          <div className={`flex items-center gap-2 mb-8 transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">Role —</span>
            <span className="font-mono text-base sm:text-lg font-bold text-cyan-400 neon">{displayed}<span className="type-cursor" /></span>
          </div>

          {/* Description */}
          <p className={`text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mb-10 transition-all duration-1000 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Transforming messy datasets into <span className="text-gray-200 font-semibold">crystal-clear insights</span>. Passionate about Python, Power BI, and building data-driven stories that drive real decisions.
          </p>

          {/* Skill chips */}
          <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-1000 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {['Python', 'Power BI', 'Excel', 'Data Viz', 'Research', 'Pandas', 'DAX'].map(s => (
              <span key={s} className="tag-item px-3.5 py-1.5 border border-gray-700/60 rounded-full text-[10px] sm:text-[11px] uppercase tracking-widest font-mono text-gray-400 bg-gray-900/50 backdrop-blur-sm hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default">{s}</span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#projects" className="group magnetic beam-border btn-glow bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black px-8 py-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105">
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
            <button onClick={handleResumeClick} className="group flex items-center gap-2.5 glass border border-gray-700/60 hover:border-cyan-500/40 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all hover:bg-gray-900/60 hover:scale-105">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
              Download Resume
            </button>
              <a href="#contact" className="group flex items-center gap-2.5 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 bg-purple-500/5 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:bg-purple-500/10">
              Let's Talk <span className="text-xs">✉️</span>
            </a>
          </div>
        </div>

        {/* Right: stats + photo */}
        <div ref={statsRef} className="md:col-span-5 lg:col-span-4 w-full flex flex-col gap-3 justify-center" style={{ willChange: 'transform' }}>
          <StatsGrid visible={visible} />
          <div className={`rounded-2xl overflow-hidden border border-gray-800/60 bg-gray-900/30 relative group transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-6 flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-70 transition-all duration-700" />
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-700 bg-gray-900">
                  <img src={PERSONAL.photo} alt={PERSONAL.name} loading="eager" decoding="async"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    onError={e => { e.target.src = PERSONAL.photoFallback; }} />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-black animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">{PERSONAL.name}</p>
                <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">{PERSONAL.role}</p>
                <p className="font-mono text-[9px] text-gray-600 mt-1">Open to opportunities 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-600 to-transparent animate-pulse" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-gray-700">Scroll</span>
      </div>
    </section>
  );
}
