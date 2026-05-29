import React, { useEffect, useRef, useState, memo } from 'react';
import { PERSONAL } from '../data/config';

/* ─── Portal Loading Screen ────────────────────────────────────
 * Phases:
 *  0 → loading (progress 0-100, rings spin, particles orbit)
 *  1 → charged (flash + portal pulses bright)
 *  2 → opening (portal ring expands to fill screen)
 *  3 → done    (App mounts beneath)
 * ─────────────────────────────────────────────────────────────*/
const LoadingScreen = memo(function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState(0);
  const timersRef = useRef([]);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  /* ── Progress ticker ── */
  useEffect(() => {
    let val = 0;
    const safe = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    const iv = setInterval(() => {
      val += Math.random() * 15 + 3;
      if (val >= 100) {
        val = 100;
        clearInterval(iv);
        setProgress(100);
        safe(() => setPhase(1), 200);   // charged flash
        safe(() => setPhase(2), 700);   // portal tears open
        safe(() => onDoneRef.current?.(), 1500);
      } else {
        setProgress(Math.round(val));
      }
    }, 70);

    return () => {
      clearInterval(iv);
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  /* ── SVG arc constants ── */
  const R   = 110;
  const CX  = 150;
  const CY  = 150;
  const CIRC = 2 * Math.PI * R;
  const dash = CIRC - (progress / 100) * CIRC;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* ── Ambient grid ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(34,211,238,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.06) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: phase >= 2 ? 0 : 1,
        transition: 'opacity .4s ease',
      }} />

      {/* ── Deep space radial vignette ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, #000 100%)',
        pointerEvents: 'none',
      }} />

      {/* ════════ PORTAL SYSTEM ════════ */}
      <div style={{
        position: 'relative',
        width: 300, height: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        /* Phase 2 — portal tears open to fill screen */
        transform: phase >= 2 ? `scale(${Math.ceil(Math.max(window.innerWidth, window.innerHeight) / 150)})` : 'scale(1)',
        transition: phase >= 2 ? 'transform .8s cubic-bezier(0.22,1,0.36,1)' : 'none',
        opacity: phase >= 2 ? 0 : 1,
        /* keep opacity transition a bit behind scale */
        transitionProperty: phase >= 2 ? 'transform, opacity' : 'none',
        transitionDuration: phase >= 2 ? '.8s, .4s' : '0s',
        transitionDelay: phase >= 2 ? '0s, .5s' : '0s',
      }}>

        {/* ── Outer ambient glow ── */}
        <div className={phase === 1 ? 'portal-charged' : ''} style={{
          position: 'absolute', inset: -40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,.18) 0%, rgba(34,211,238,.05) 40%, transparent 70%)',
          animation: 'portalBreath 2.5s ease-in-out infinite',
          filter: phase === 1 ? 'brightness(3)' : 'brightness(1)',
          transition: 'filter .3s ease',
        }} />

        {/* ── Ring 1 — slow outer ring (counter-clockwise) ── */}
        <div style={{
          position: 'absolute',
          width: 260, height: 260,
          borderRadius: '50%',
          border: '1.5px solid transparent',
          backgroundClip: 'padding-box',
          animation: 'spinCCW 8s linear infinite',
          boxShadow: '0 0 20px rgba(34,211,238,.15)',
        }}>
          <div style={{
            position: 'absolute', inset: -1.5, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #22d3ee, #3b82f6, transparent, #22d3ee)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
            opacity: 0.5,
          }} />
        </div>

        {/* ── Ring 2 — medium ring (clockwise, dashed feel) ── */}
        <div style={{
          position: 'absolute',
          width: 220, height: 220,
          borderRadius: '50%',
          animation: 'spinCW 5s linear infinite',
        }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 120deg, #8b5cf6 0deg, #22d3ee 90deg, transparent 180deg, #8b5cf6 360deg)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
            opacity: 0.7,
          }} />
        </div>

        {/* ── Ring 3 — fast inner ring (counter-clockwise) ── */}
        <div style={{
          position: 'absolute',
          width: 175, height: 175,
          borderRadius: '50%',
          animation: 'spinCCW 3s linear infinite',
        }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 240deg, #22d3ee, transparent 60%, #3b82f6, transparent)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))',
            opacity: 0.9,
          }} />
        </div>

        {/* ── SVG Progress arc ── */}
        <svg width="300" height="300" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx={CX} cy={CY} r={R}
            fill="none" stroke="rgba(34,211,238,.08)" strokeWidth="2" />
          {/* Progress */}
          <circle cx={CX} cy={CY} r={R}
            fill="none"
            stroke="url(#portalGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dash}
            style={{ transition: 'stroke-dashoffset .15s ease', filter: 'drop-shadow(0 0 6px #22d3ee)' }}
          />
          {/* Tick marks around the arc */}
          {Array.from({ length: 36 }, (_, i) => {
            const angle = (i / 36) * 2 * Math.PI - Math.PI / 2;
            const r1 = 116, r2 = i % 3 === 0 ? 123 : 120;
            return (
              <line key={i}
                x1={CX + r1 * Math.cos(angle)} y1={CY + r1 * Math.sin(angle)}
                x2={CX + r2 * Math.cos(angle)} y2={CY + r2 * Math.sin(angle)}
                stroke="rgba(34,211,238,.2)" strokeWidth="1"
              />
            );
          })}
          <defs>
            <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── Orbiting particles ── */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 300, height: 300,
            borderRadius: '50%',
            animation: `spinCW ${3 + i * 0.4}s linear infinite`,
            animationDelay: `${i * -0.5}s`,
          }}>
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: i % 2 === 0 ? 4 : 3,
              height: i % 2 === 0 ? 4 : 3,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
              boxShadow: `0 0 ${i % 2 === 0 ? 8 : 5}px currentColor`,
              transform: `translate(-50%, -50%) translateX(${115 + i * 5}px)`,
              opacity: 0.8,
            }} />
          </div>
        ))}

        {/* ── Portal core ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          width: 110, height: 110,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,.25) 0%, rgba(34,211,238,.08) 50%, transparent 70%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          animation: 'coreBreath 2s ease-in-out infinite',
        }}>
          {/* Singularity center */}
          <div style={{
            width: 50, height: 50, borderRadius: '50%',
            background: 'radial-gradient(circle, #fff 0%, #22d3ee 40%, rgba(34,211,238,0) 70%)',
            boxShadow: '0 0 20px rgba(34,211,238,.8), 0 0 50px rgba(34,211,238,.4), 0 0 90px rgba(59,130,246,.3)',
            animation: 'corePulse 1.5s ease-in-out infinite',
            filter: phase === 1 ? 'brightness(3) saturate(0)' : 'brightness(1)',
            transition: 'filter .2s ease',
            marginBottom: 8,
          }} />
          {/* Initials */}
          <span style={{
            fontFamily: 'monospace', fontWeight: 900, fontSize: 11,
            color: 'rgba(34,211,238,.7)', letterSpacing: '0.15em',
          }}>{PERSONAL.initials}</span>
        </div>
      </div>

      {/* ── Phase 2 full-screen flash ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle, rgba(34,211,238,.9), rgba(59,130,246,.7), transparent)',
        opacity: phase >= 2 ? 1 : 0,
        transition: phase >= 2 ? 'opacity .3s ease' : 'none',
        pointerEvents: 'none',
      }} />

      {/* ── Name + progress counter (below portal) ── */}
      <div style={{
        marginTop: 48,
        opacity: phase >= 2 ? 0 : 1,
        transition: 'opacity .3s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.4em',
          textTransform: 'uppercase', color: 'rgba(34,211,238,.5)',
        }}>
          {PERSONAL.name}
        </div>
        <div style={{
          fontFamily: 'monospace', fontSize: 11,
          color: 'rgba(34,211,238,.4)', letterSpacing: '0.2em',
        }}>
          {progress < 100 ? `OPENING PORTAL — ${progress}%` : 'PORTAL READY ✦'}
        </div>
      </div>

      {/* ── Keyframes injected once via style tag ── */}
      <style>{`
        @keyframes spinCW  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes spinCCW { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
        @keyframes portalBreath {
          0%,100% { transform: scale(1);    opacity: .8; }
          50%      { transform: scale(1.08); opacity: 1;  }
        }
        @keyframes coreBreath {
          0%,100% { transform: scale(1);    }
          50%      { transform: scale(1.06); }
        }
        @keyframes corePulse {
          0%,100% { box-shadow: 0 0 20px rgba(34,211,238,.8), 0 0 50px rgba(34,211,238,.4), 0 0 90px rgba(59,130,246,.3); }
          50%      { box-shadow: 0 0 35px rgba(34,211,238,1),  0 0 80px rgba(34,211,238,.7), 0 0 140px rgba(59,130,246,.5); }
        }
      `}</style>
    </div>
  );
});

export default LoadingScreen;
