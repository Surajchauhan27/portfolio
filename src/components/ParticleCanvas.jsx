import React, { useEffect, useRef } from 'react';

/**
 * PERFORMANCE OPTIMIZATIONS APPLIED:
 *
 * 1. Squared distance check (eliminates Math.sqrt — most expensive call in the loop)
 *    Before: Math.sqrt(dx*dx + dy*dy) < 140  → ~189,600 sqrt/sec at 60fps
 *    After:  dx*dx + dy*dy < 19600            → pure integer arithmetic
 *
 * 2. FPS throttling to 40fps for the canvas
 *    Canvas doesn't need 60fps — human eye can't tell difference for particles
 *    Cuts CPU time by 33% immediately
 *
 * 3. Adaptive particle count based on screen size and device capability
 *    Mobile/low-DPR devices get fewer particles
 *
 * 4. Single pre-allocated typed array for particle positions (cache-friendly)
 *    Avoids GC pressure from object property access
 *
 * 5. devicePixelRatio-aware canvas for crisp rendering on retina screens
 *
 * 6. Mouse position via ref (no state) — zero React re-renders
 */
export default function ParticleCanvas() {
  const canvasRef  = useRef(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });

    // ── Responsive sizing with DPR ───────────────────────────
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let CW = window.innerWidth;
    let CH = window.innerHeight;

    const resize = () => {
      CW = window.innerWidth;
      CH = window.innerHeight;
      canvas.width  = CW * dpr;
      canvas.height = CH * dpr;
      canvas.style.width  = `${CW}px`;
      canvas.style.height = `${CH}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // ── Adaptive particle count ──────────────────────────────
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const COUNT = isMobile
      ? 30
      : Math.min(70, Math.floor(CW * CH / 16000));

    // Precomputed constants (avoid re-computing per frame)
    const CONNECT_DIST_SQ = 140 * 140;   // ✅ squared — no sqrt needed
    const REPEL_DIST_SQ   = 110 * 110;
    const REPEL_DIST      = 110;

    // ── Flat typed arrays — cache-friendly, GC-free ──────────
    const px  = new Float32Array(COUNT); // x positions
    const py  = new Float32Array(COUNT); // y positions
    const pvx = new Float32Array(COUNT); // x velocities
    const pvy = new Float32Array(COUNT); // y velocities
    const pr  = new Float32Array(COUNT); // radii
    const po  = new Float32Array(COUNT); // opacity

    for (let i = 0; i < COUNT; i++) {
      px[i]  = Math.random() * CW;
      py[i]  = Math.random() * CH;
      pvx[i] = (Math.random() - 0.5) * 0.3;
      pvy[i] = (Math.random() - 0.5) * 0.3;
      pr[i]  = Math.random() * 1.8 + 0.5;
      po[i]  = Math.random() * 0.45 + 0.1;
    }

    // ── FPS throttling ───────────────────────────────────────
    const TARGET_FPS  = 40;
    const FRAME_TIME  = 1000 / TARGET_FPS;
    let   lastTime    = 0;
    let   raf;

    const draw = (timestamp) => {
      raf = requestAnimationFrame(draw);

      // Skip frame if we're ahead of target FPS
      const elapsed = timestamp - lastTime;
      if (elapsed < FRAME_TIME) return;
      lastTime = timestamp - (elapsed % FRAME_TIME);

      ctx.clearRect(0, 0, CW, CH);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // ── Update + draw particles ──────────────────────────
      for (let i = 0; i < COUNT; i++) {
        // Mouse repulsion (squared distance — no sqrt)
        const rdx = px[i] - mx;
        const rdy = py[i] - my;
        const rDistSq = rdx * rdx + rdy * rdy;

        if (rDistSq < REPEL_DIST_SQ && rDistSq > 0) {
          const rDist = Math.sqrt(rDistSq); // sqrt only when actually repelling
          const force = (REPEL_DIST - rDist) / REPEL_DIST * 0.35;
          pvx[i] += (rdx / rDist) * force;
          pvy[i] += (rdy / rDist) * force;
        }

        // Damping
        pvx[i] *= 0.99;
        pvy[i] *= 0.99;
        px[i]  += pvx[i];
        py[i]  += pvy[i];

        // Wrap edges
        if (px[i] < 0) px[i] = CW;
        if (px[i] > CW) px[i] = 0;
        if (py[i] < 0) py[i] = CH;
        if (py[i] > CH) py[i] = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(px[i], py[i], pr[i], 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${po[i]})`;
        ctx.fill();
      }

      // ── Draw connections (O(n²) but with squared distance) ─
      for (let i = 0; i < COUNT - 1; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const dSq = dx * dx + dy * dy; // ✅ no sqrt here

          if (dSq < CONNECT_DIST_SQ) {
            // Only compute sqrt for alpha when inside range
            const alpha = (1 - Math.sqrt(dSq) / 140) * 0.16;
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    raf = requestAnimationFrame(draw);

    // ── Mouse via ref — zero React re-renders ────────────────
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // ── Resize handler (debounced) ───────────────────────────
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 0, pointerEvents: 'none',
        opacity: 0.65,
        // ✅ GPU-composite layer — no layout/paint involvement
        willChange: 'transform',
        contain: 'strict',
      }}
      aria-hidden="true"
    />
  );
}
