import React, { useState, useCallback, useEffect, memo, Component } from 'react';
import Lenis         from 'lenis';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import MarqueeBar    from './components/MarqueeBar';
import About         from './components/About';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import Experience    from './components/Experience';
import Achievements  from './components/Achievements';
import Certifications from './components/Certifications';
import TechStack     from './components/TechStack';
import Services      from './components/Services';
import ContactSection from './components/ContactSection';
import Footer        from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ParticleCanvas from './components/ParticleCanvas';
import { useScrollReveal, useTilt, useCursor, useScrollParallax, useMagneticButtons } from './hooks/useEffects';
import { PERSONAL } from './data/config';

/* Detect touch/mobile devices — used to skip heavy GPU effects */
const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/* ── Data stream background — desktop only ──────────────────── */
const DATA_CHARS = '01アイウエオカキクケコABCDEF9876543210░▒▓';
const STREAM_COLS = [
  { left: '3%',   delay: '0s',   dur: '14s', chars: 18 },
  { left: '8%',   delay: '-5s',  dur: '11s', chars: 14 },
  { left: '91%',  delay: '-2s',  dur: '13s', chars: 16 },
  { left: '96%',  delay: '-8s',  dur: '10s', chars: 12 },
  { left: '15%',  delay: '-3s',  dur: '16s', chars: 20 },
  { left: '85%',  delay: '-6s',  dur: '12s', chars: 15 },
];

const DataStream = memo(function DataStream() {
  if (IS_MOBILE) return null; // skip on mobile for performance
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {STREAM_COLS.map((col, i) => (
        <div key={i} className="data-stream-col"
          style={{ left: col.left, animationDuration: col.dur, animationDelay: col.delay }}>
          {Array.from({ length: col.chars }, (_, j) =>
            DATA_CHARS[Math.floor((i * 7 + j * 13) % DATA_CHARS.length)]
          ).join('\n')}
        </div>
      ))}
    </div>
  );
});


/* ── Error Boundary ─────────────────────────────────────────── */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#000',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '2rem', fontFamily: 'monospace',
        }}>
          <div style={{
            maxWidth: 700, width: '100%',
            background: '#111', border: '1px solid #ef4444',
            borderRadius: 12, padding: '2rem',
          }}>
            <p style={{ color: '#ef4444', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
              🔴 Runtime Error — Check Browser Console
            </p>
            <pre style={{ color: '#f87171', fontSize: 12, whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
              {this.state.error?.message}
              {'\n\n'}
              {this.state.error?.stack?.split('\n').slice(0, 8).join('\n')}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Ambient orbs — desktop only ────────────────────────────── */
const AmbientOrbs = memo(function AmbientOrbs() {
  if (IS_MOBILE) return null; // skip on mobile for performance
  return (
    <>
      <div className="orb w-[800px] h-[800px] -top-60 -left-60"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.055) 0%, transparent 70%)' }} />
      <div className="orb w-[600px] h-[600px] top-[60%] -right-40"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,.045) 0%, transparent 70%)', animationDelay: '-5s' }} />
      <div className="orb w-[500px] h-[500px] top-[30%] left-[45%]"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,.035) 0%, transparent 70%)', animationDelay: '-3s' }} />
      <div className="orb w-[400px] h-[400px] top-[80%] left-[20%]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,.03) 0%, transparent 70%)', animationDelay: '-8s' }} />
    </>
  );
});

/* ── PortfolioApp ───────────────────────────────────────────── */
function PortfolioApp() {
  useScrollReveal();
  // All hooks called unconditionally (React rules) — each one checks IS_MOBILE internally
  useTilt();
  useCursor();
  useScrollParallax();
  useMagneticButtons();

  useEffect(() => {
    // Lenis smooth scroll — disabled on mobile (native scroll is smoother)
    if (IS_MOBILE) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      {/* Particles only on desktop — heavy canvas on mobile kills FPS */}
      {!IS_MOBILE && <ParticleCanvas />}
      <DataStream />
      <AmbientOrbs />

      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      <main
        className="relative z-10 bg-black min-h-screen selection:bg-cyan-500/30 selection:text-cyan-400"
        aria-label={`${PERSONAL.name} Portfolio`}
      >
        <Navbar />
        <Hero />
        <MarqueeBar />
        <div className="s3d"><About /></div>
        <div className="s3d"><SkillsSection /></div>
        <ProjectsSection />
        <div className="s3d"><Experience /></div>
        <div className="s3d"><Achievements /></div>
        <div className="s3d"><Certifications /></div>
        <div className="s3d"><TechStack /></div>
        <div className="s3d"><Services /></div>
        <div className="s3d"><ContactSection /></div>
        <Footer />
      </main>
    </div>
  );
}

/* ── App root ───────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  // Hard fallback — always show app after 3s even if onDone misfires
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(id);
  }, []);

  return (
    <ErrorBoundary>
      {!loaded && <LoadingScreen onDone={handleDone} />}
      {/* Always render PortfolioApp — opacity hides it while loading.
          This is intentional: it was working before the conditional-mount
          refactor and avoids any mount-timing issues. */}
      <div style={{
        opacity:    loaded ? 1 : 0,
        transition: 'opacity .5s ease .2s',
        pointerEvents: loaded ? 'all' : 'none',
      }}>
        <PortfolioApp />
      </div>
    </ErrorBoundary>
  );
}
