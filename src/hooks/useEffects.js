import { useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────
 * useScrollReveal
 * Observes all .sr elements and adds .in class when visible.
 * FIXED: proper cleanup — io.disconnect() + clearTimeout
 * ───────────────────────────────────────────────────────────── */
export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0', 10);
            setTimeout(() => {
              // Guard: element may have been removed from DOM by the time timeout fires
              if (entry.target.isConnected) {
                entry.target.classList.add('in');
              }
            }, delay);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    const observe = () => {
      document.querySelectorAll('.sr:not(.in)').forEach(el => io.observe(el));
    };
    observe();

    // Re-observe after dynamic renders settle
    const t = setTimeout(observe, 400);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []); // ✅ runs once on mount
}

/* ─────────────────────────────────────────────────────────────
 * useTilt
 * 3-D perspective tilt on .tilt cards.
 *
 * ROOT CAUSE FIX: Previously had no deps array → ran on EVERY
 * render → attached new mousemove/mouseleave listeners each time
 * without removing old ones → unbounded memory leak.
 *
 * FIX: Added [] deps array. Now runs once after mount.
 * Cards rendered after mount (e.g. inside lists) are handled by
 * MutationObserver watching for new .tilt elements.
 * ───────────────────────────────────────────────────────────── */
export function useTilt() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handlers = new Map(); // card → { onMove, onLeave }

    const attach = (card) => {
      if (handlers.has(card)) return; // already attached — skip

      const onMove = (e) => {
        const r  = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top  - r.height / 2) / r.height) * -10;
        const ry = ((e.clientX - r.left - r.width  / 2) / r.width ) *  10;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
      };
      const onLeave = () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.set(card, { onMove, onLeave });
    };

    const detach = (card) => {
      const h = handlers.get(card);
      if (!h) return;
      card.removeEventListener('mousemove', h.onMove);
      card.removeEventListener('mouseleave', h.onLeave);
      handlers.delete(card);
    };

    // Attach to all current .tilt cards
    document.querySelectorAll('.tilt').forEach(attach);

    // Watch for new .tilt cards added to the DOM dynamically
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.classList?.contains('tilt')) attach(node);
          node.querySelectorAll?.('.tilt').forEach(attach);
        });
        m.removedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.classList?.contains('tilt')) detach(node);
          node.querySelectorAll?.('.tilt').forEach(detach);
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      handlers.forEach((_, card) => detach(card));
    };
  }, []); // ✅ runs exactly once
}

/* ─────────────────────────────────────────────────────────────
 * useCursor
 * Smooth custom cursor with hover-expansion on interactive elements.
 * FIXED: hover listeners now also cleaned up on unmount.
 * ───────────────────────────────────────────────────────────── */
export function useCursor() {
  useEffect(() => {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      // ✅ FIXED: transform:translate instead of left/top
      // left/top → triggers layout → expensive
      // transform → GPU-composited layer → zero layout cost
      dot.style.transform  = `translate(${mx}px, ${my}px)`;

      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;

      raf = requestAnimationFrame(tick);
    };

    const addHover = () => document.body.classList.add('cursor-hover');
    const remHover = () => document.body.classList.remove('cursor-hover');

    const interactives = document.querySelectorAll('a, button, .tilt');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', remHover);
    });

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', remHover);
      });
    };
  }, []);
}


/* ─────────────────────────────────────────────────────────────
 * useSpotlight
 * Reusable hook for the CSS-variable spotlight effect.
 * Previously copy-pasted into 4 different components.
 * Now extracted once — import and call with a containerRef.
 *
 * Usage:
 *   const containerRef = useRef(null);
 *   useSpotlight(containerRef);
 * ───────────────────────────────────────────────────────────── */
export function useSpotlight(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const cards = container.querySelectorAll('.spotlight-card');
    const handlers = [];

    cards.forEach(card => {
      const fn = (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - r.left}px`);
        card.style.setProperty('--y', `${e.clientY - r.top}px`);
      };
      card.addEventListener('mousemove', fn, { passive: true });
      handlers.push({ card, fn });
    });

    return () => {
      handlers.forEach(({ card, fn }) => card.removeEventListener('mousemove', fn));
    };
  }, [containerRef]); // ✅ re-runs if container changes
}

/* ─────────────────────────────────────────────────────────────
 * useSafeTimeout
 * A setTimeout that automatically clears when the component
 * unmounts — prevents setState on unmounted component.
 *
 * ROOT CAUSE FIX for: ContactSection's setTimeout leaks.
 *
 * Usage:
 *   const safeTimeout = useSafeTimeout();
 *   safeTimeout(() => setSubmitted(false), 6000);
 * ───────────────────────────────────────────────────────────── */
export function useSafeTimeout() {
  const ids = [];

  useEffect(() => {
    return () => ids.forEach(id => clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (fn, delay) => {
    const id = setTimeout(fn, delay);
    ids.push(id);
    return id;
  };
}

/* ─────────────────────────────────────────────────────────────
 * useScrollParallax
 * Applies a subtle 3D rotateX to every .s3d element based on its
 * position relative to the viewport center — creates the effect
 * of sections "tilting toward you" as you scroll.
 *
 * Formula:
 *  offset = (sectionMidY - viewportMidY) / viewportH   [-1 .. 1]
 *  rotateX = offset * maxDeg   (neg = top tilt, pos = bottom tilt)
 *  scale   = 1 - |offset| * depthScale
 * ───────────────────────────────────────────────────────────── */
export function useScrollParallax() {
  useEffect(() => {
    const MAX_DEG    = 4;      // max tilt in degrees
    const DEPTH      = 0.04;   // scale shrink at edges
    const PERSPECTIVE = 1200;  // px perspective depth

    let raf;
    const tick = () => {
      const sections  = document.querySelectorAll('.s3d');
      const viewportH = window.innerHeight;
      const viewMid   = viewportH / 2;

      sections.forEach(el => {
        const rect    = el.getBoundingClientRect();
        const secMid  = rect.top + rect.height / 2;
        const offset  = (secMid - viewMid) / viewportH;   // -1..1
        const clamped = Math.max(-1, Math.min(1, offset));
        const rotX    = clamped * MAX_DEG;
        const scale   = 1 - Math.abs(clamped) * DEPTH;

        el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotX.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
}

/* ─────────────────────────────────────────────────────────────
 * useMagneticButtons
 * Buttons with class .magnetic attract toward the cursor when
 * the mouse is within a radius, creating a futuristic "pull" feel.
 * ───────────────────────────────────────────────────────────── */
export function useMagneticButtons() {
  useEffect(() => {
    const RADIUS   = 80;  // px — attraction zone
    const STRENGTH = 0.35; // how far the button moves (0-1)

    const buttons = document.querySelectorAll('.magnetic');

    const handlers = Array.from(buttons).map(btn => {
      const onMove = (e) => {
        const rect    = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width  / 2;
        const centerY = rect.top  + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const pull = (1 - dist / RADIUS) * STRENGTH;
          btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        } else {
          btn.style.transform = '';
        }
      };

      const onLeave = () => { btn.style.transform = ''; };

      window.addEventListener('mousemove', onMove, { passive: true });
      btn.addEventListener('mouseleave', onLeave);

      return { btn, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ btn, onMove, onLeave }) => {
        window.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}

