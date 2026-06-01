import React, { useEffect, useRef, useState, memo } from 'react';
import { PERSONAL } from '../data/config';

/* ─── Color palette cycles through during load ─────────────────────────────── */
const PALETTE = [
  { bg: '#1a0a04', accent: '#F4845F' },
  { bg: '#041a08', accent: '#6BBF7A' },
  { bg: '#1a0412', accent: '#E882B4' },
  { bg: '#04101a', accent: '#6EB5FF' },
];

/* ─── Grain SVG data URI ───────────────────────────────────────────────────── */
const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
  "<filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/></filter>" +
  "<rect width='200' height='200' filter='url(%23g)' opacity='0.08'/></svg>";

/* ─── LoadingScreen ────────────────────────────────────────────────────────── */
const LoadingScreen = memo(function LoadingScreen({ onDone }) {
  const [progress, setProgress]     = useState(0);
  const [colorIdx, setColorIdx]     = useState(0);
  const [phase, setPhase]           = useState(0); // 0=loading 1=reveal 2=done
  const [lettersDone, setLettersDone] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  /* ── Progress bar + color cycling ── */
  useEffect(() => {
    let val = 0;
    const iv = setInterval(() => {
      val += Math.random() * 12 + 4;
      if (val >= 100) {
        val = 100;
        clearInterval(iv);
        setProgress(100);
        setTimeout(() => setPhase(1), 300);   // start reveal wipe
        setTimeout(() => onDoneRef.current?.(), 1400);
      } else {
        setProgress(Math.round(val));
        // Cycle colors every ~25%
        setColorIdx(Math.floor(val / 25) % PALETTE.length);
      }
    }, 60);
    return () => clearInterval(iv);
  }, []);

  /* ── Letter stagger done ── */
  useEffect(() => {
    const id = setTimeout(() => setLettersDone(true), 1200);
    return () => clearTimeout(id);
  }, []);

  const { bg, accent } = PALETTE[colorIdx];
  const letters = PERSONAL.name.split('');

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        backgroundColor: bg,
        transition: 'background-color 400ms cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        /* Phase 1 — wipe up to reveal the site */
        transform: phase >= 1 ? 'translateY(-100%)' : 'translateY(0)',
        transitionProperty: phase >= 1 ? 'transform' : 'background-color',
        transitionDuration: phase >= 1 ? '900ms' : '400ms',
        transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)',
      }}
    >
      {/* ── Grain overlay ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("${GRAIN}")`,
        backgroundRepeat: 'repeat', backgroundSize: '200px 200px', opacity: 0.4,
      }} />

      {/* ── Radial accent glow ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 70% 50% at 50% 60%, ${accent}22 0%, transparent 70%)`,
        transition: 'background 400ms',
      }} />

      {/* ── Giant ghost text "LOADING" ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '15%', left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        userSelect: 'none', pointerEvents: 'none', zIndex: 1, overflow: 'hidden',
      }}>
        <span style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(80px, 22vw, 280px)',
          fontWeight: 900, color: 'white', opacity: 0.05,
          lineHeight: 1, textTransform: 'uppercase',
          letterSpacing: '-0.02em', whiteSpace: 'nowrap',
          transition: 'color 400ms',
        }}>
          LOADING
        </span>
      </div>

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Brand label */}
        <div style={{
          fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase',
          letterSpacing: '0.4em', color: `${accent}CC`,
          marginBottom: 32,
          opacity: 1,
          transition: 'color 400ms',
        }}>
          Portfolio
        </div>

        {/* ── Animated name letters ── */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 40, overflow: 'hidden' }}>
          {letters.map((ch, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(32px, 7vw, 72px)',
                fontWeight: 900, color: '#fff',
                lineHeight: 1, letterSpacing: '-0.02em',
                display: 'inline-block',
                /* stagger slide-up */
                transform: 'translateY(0)',
                animation: `letterIn 600ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`,
                ...(ch === ' ' ? { width: '0.35em' } : {}),
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>

        {/* ── Accent bar progress ── */}
        <div style={{ width: 'clamp(200px, 40vw, 360px)', marginBottom: 20 }}>
          {/* Track */}
          <div style={{
            height: 2, background: 'rgba(255,255,255,0.1)',
            borderRadius: 999, overflow: 'hidden', position: 'relative',
          }}>
            {/* Fill */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: `${progress}%`,
              background: accent,
              borderRadius: 999,
              transition: 'width 80ms linear, background 400ms',
              boxShadow: `0 0 12px ${accent}CC`,
            }} />
          </div>

          {/* Labels */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 10,
          }}>
            <span style={{
              fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)',
            }}>
              {progress < 100 ? 'Initializing…' : 'Ready ✦'}
            </span>
            <span style={{
              fontFamily: "'Anton', sans-serif", fontSize: 16,
              color: accent, letterSpacing: '-0.02em',
              transition: 'color 400ms',
            }}>
              {progress}%
            </span>
          </div>
        </div>

        {/* ── Color-dot indicators (one per palette color) ── */}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {PALETTE.map((p, i) => (
            <div key={i} style={{
              width: i === colorIdx ? 24 : 6,
              height: 6, borderRadius: 999,
              background: i === colorIdx ? p.accent : 'rgba(255,255,255,0.2)',
              transition: 'width 350ms cubic-bezier(0.4,0,0.2,1), background 350ms',
            }} />
          ))}
        </div>
      </div>

      {/* ── Top-left brand corner ── */}
      <div style={{
        position: 'absolute', top: 28, left: 28, zIndex: 20,
        fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase',
        letterSpacing: '0.25em', color: `${accent}99`,
        transition: 'color 400ms',
      }}>
        SC
      </div>

      {/* ── Bottom-right counter ── */}
      <div style={{
        position: 'absolute', bottom: 28, right: 28, zIndex: 20,
        fontFamily: "'Anton', sans-serif",
        fontSize: 'clamp(18px, 3vw, 32px)',
        color: 'rgba(255,255,255,0.15)',
        letterSpacing: '-0.02em',
        userSelect: 'none',
      }}>
        {String(progress).padStart(3, '0')}
      </div>

      {/* ── Bottom-left role text ── */}
      <div style={{
        position: 'absolute', bottom: 28, left: 28, zIndex: 20,
        fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase',
        letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)',
      }}>
        Data Analyst &nbsp;·&nbsp; AI Enthusiast
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes letterIn {
          from { opacity: 0; transform: translateY(40px) skewY(4deg); }
          to   { opacity: 1; transform: translateY(0)   skewY(0deg);  }
        }
      `}</style>
    </div>
  );
});

export default LoadingScreen;
