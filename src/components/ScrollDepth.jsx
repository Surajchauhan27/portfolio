/**
 * ScrollDepth.jsx — v2 (fast, zero React re-renders per frame)
 * ─────────────────────────────────────────────────────────────
 * All animation is written directly to DOM style properties inside
 * a single shared RAF loop. No setState → no React re-renders on scroll.
 */
import { useRef, useEffect } from 'react';

export const lerp      = (a, b, t) => a + (b - a) * t;
export const clamp     = (v, mn, mx) => Math.max(mn, Math.min(mx, v));
export const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

/**
 * useScrollDepth(pinHeight, onFrame)
 *
 * pinHeight  — total scroll height of the driver div (e.g. '160vh')
 * onFrame    — callback(sp, rx, ry) called every RAF tick
 *              sp = scroll progress 0..1
 *              rx, ry = smoothed mouse -1..1
 *
 * Returns { wrapperRef } — attach to the outer scroll-driver div.
 */
export function useScrollDepth(pinHeight, onFrame) {
  const wrapperRef   = useRef(null);
  const rafRef       = useRef(null);
  const mouseTarget  = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      // Smooth mouse (lerp step 0.1 = snappier than 0.07)
      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.1);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.1);

      let sp = 0;
      if (wrapperRef.current) {
        const rect        = wrapperRef.current.getBoundingClientRect();
        const totalScroll = wrapperRef.current.offsetHeight - window.innerHeight;
        sp = totalScroll > 0 ? clamp(-rect.top / totalScroll, 0, 1) : 0;
      }

      onFrame?.(sp, mouseCurrent.current.x, mouseCurrent.current.y);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onFrame]);

  return { wrapperRef };
}

export default useScrollDepth;
